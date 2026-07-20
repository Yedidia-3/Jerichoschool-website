import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import * as THREE from "three";
import confetti from "canvas-confetti";
import {
  Trophy,
  Sparkles,
  ArrowRight,
  Compass,
  Zap,
  RotateCcw,
  Volume2,
  VolumeX,
  Gamepad2,
} from "lucide-react";
import logoImg from "@/assets/images/logo.png";
import { Button } from "../components/ui/button";
import { SubscriptionModal } from "../components/subscription-modal";

// Web Audio API Synthesized retro sound effects
function playAudioJump(isMuted: boolean, isDouble: boolean) {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isDouble ? "triangle" : "sine";
    const startFreq = isDouble ? 380 : 180;
    const endFreq = isDouble ? 900 : 520;
    const duration = isDouble ? 0.14 : 0.08;

    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn(e);
  }
}

function playAudioCrash(isMuted: boolean) {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // Low rumble frequency sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);

    // Synth noise crunch simulation
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 400;
    noiseFilter.Q.value = 1.0;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseNode.start();
    noiseNode.stop(ctx.currentTime + 0.4);
  } catch (e) {
    console.warn(e);
  }
}

function playAudioMilestone(isMuted: boolean) {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.setValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch (e) {
    console.warn(e);
  }
}

// Mesh Disposer Helper to avoid memory leaks in React
const disposeGroup = (group: THREE.Group | THREE.Mesh) => {
  group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      if (Array.isArray(object.material)) {
        object.material.forEach((m) => m.dispose());
      } else {
        object.material.dispose();
      }
    }
  });
};

interface SphereBubble {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  baseX: number;
  sinOffset: number;
  sinSpeed: number;
  amplitude: number;
  radius: number;
  color: THREE.Color;
}

interface Cactus {
  group: THREE.Group;
  width: number;
  height: number;
  color: THREE.Color;
}

interface Particle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  decay: number;
}

export function Gateway() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isGameMode, setIsGameMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Score states
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");

  // Physics and Game settings in refs (to prevent React lag / re-render loops)
  const isGameModeRef = useRef(false);
  const gameStateRef = useRef<"idle" | "playing" | "gameover">("idle");
  const scoreRef = useRef(0);
  const milestoneRef = useRef(500);

  // Runners variables
  const dinoYRef = useRef(0);
  const dinoVYRef = useRef(0);
  const doubleJumpRef = useRef(true);
  const isBackflippingRef = useRef(false);
  const flipRotationRef = useRef(0);
  const scrollSpeedRef = useRef(0.14);

  // Spawning settings
  const lastCactusSpawnRef = useRef(0);
  const nextSpawnDelayRef = useRef(1800);

  // Three collections
  const sceneRef = useRef<THREE.Scene | null>(null);
  const bubblesRef = useRef<SphereBubble[]>([]);
  const cactiRef = useRef<Cactus[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const dustParticlesRef = useRef<Particle[]>([]);
  const stripesRef = useRef<{ mesh: THREE.Mesh; baseX: number }[]>([]);

  // Key groups
  const dinoGroupRef = useRef<THREE.Group | null>(null);
  const leftLegRef = useRef<THREE.Group | null>(null);
  const rightLegRef = useRef<THREE.Group | null>(null);
  const tailRef = useRef<THREE.Mesh | null>(null);

  // Timers and Animation Request
  const requestRef = useRef<number | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scoreTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Keep refs in sync with state for access inside Three loop
  useEffect(() => {
    isGameModeRef.current = isGameMode;
  }, [isGameMode]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Load High Score on mount
  useEffect(() => {
    const saved = localStorage.getItem("jericho_runner_highscore");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // 10s Inactivity Timer to Enter Game Mode
  const resetInactivityTimer = () => {
    if (isGameMode || gameState === "playing") return;
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

    inactivityTimerRef.current = setTimeout(() => {
      triggerGameMode();
    }, 300000); // 5 minutes of inactivity
  };

  useEffect(() => {
    const handleActivity = () => resetInactivityTimer();
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("keydown", handleActivity);

    resetInactivityTimer();

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [isGameMode, gameState]);

  // Trigger Dino Runner Game Mode
  const triggerGameMode = () => {
    setIsGameMode(true);
    setGameState("playing");

    // Clear all existing cacti from the scene
    const scene = sceneRef.current;
    if (scene) {
      cactiRef.current.forEach((c) => {
        scene.remove(c.group);
        disposeGroup(c.group);
      });
      particlesRef.current.forEach((p) => {
        scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        if (p.mesh.material instanceof THREE.Material) p.mesh.material.dispose();
      });
      dustParticlesRef.current.forEach((d) => {
        scene.remove(d.mesh);
        d.mesh.geometry.dispose();
        if (d.mesh.material instanceof THREE.Material) d.mesh.material.dispose();
      });
    }
    cactiRef.current = [];
    particlesRef.current = [];
    dustParticlesRef.current = [];

    // Reset dino position and rotation
    if (dinoGroupRef.current) {
      dinoGroupRef.current.position.set(-4, -4, 0);
      dinoGroupRef.current.rotation.z = 0;
    }

    // Reset game physics variables
    scoreRef.current = 0;
    milestoneRef.current = 500;
    setScore(0);
    scrollSpeedRef.current = 0.14;
    dinoYRef.current = 0;
    dinoVYRef.current = 0;
    doubleJumpRef.current = true;
    isBackflippingRef.current = false;
    flipRotationRef.current = 0;

    // Reset obstacle spawn timers
    lastCactusSpawnRef.current = Date.now();
    nextSpawnDelayRef.current = 1500;

    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

    // Score ticking loop (+10 score every 100ms)
    if (scoreTimerRef.current) clearInterval(scoreTimerRef.current);
    scoreTimerRef.current = setInterval(() => {
      if (gameStateRef.current === "playing") {
        scoreRef.current += 10;
        setScore(scoreRef.current);

        // Milestone reward chime (+confetti) every 500 points
        if (scoreRef.current >= milestoneRef.current) {
          playAudioMilestone(isMuted);
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.4 },
            colors: ["#10b981", "#f59e0b", "#a78bfa"],
          });
          milestoneRef.current += 500;
          // Ramp up speed slightly
          scrollSpeedRef.current += 0.015;
        }
      }
    }, 100);
  };

  // High score tracking when game over
  useEffect(() => {
    if (gameState === "gameover" && score > highScore) {
      setHighScore(score);
      localStorage.setItem("jericho_runner_highscore", score.toString());
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  }, [gameState, score, highScore]);

  // Exit Game
  const handleExitGame = () => {
    setIsGameMode(false);
    setGameState("idle");
    if (scoreTimerRef.current) clearInterval(scoreTimerRef.current);
    resetInactivityTimer();
  };

  // Stable jump ref — always current, safe to call from any closure
  const isMutedRef = useRef(isMuted);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  const triggerJump = () => {
    if (gameStateRef.current !== "playing" || !isGameModeRef.current) return;
    if (dinoYRef.current === 0) {
      dinoVYRef.current = 0.28;
      dinoYRef.current = 0.01;
      playAudioJump(isMutedRef.current, false);
    } else if (doubleJumpRef.current) {
      dinoVYRef.current = 0.26;
      doubleJumpRef.current = false;
      isBackflippingRef.current = true;
      flipRotationRef.current = 0;
      playAudioJump(isMutedRef.current, true);
    }
  };
  const triggerJumpRef = useRef(triggerJump);
  useEffect(() => { triggerJumpRef.current = triggerJump; });

  // Single keyboard listener — Space / ArrowUp / W
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        triggerJumpRef.current();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Setup Three.js Core
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    const zPosition = aspect < 1.3 ? Math.min(32, 14 * (1.3 / aspect)) : 14;
    camera.position.set(0, 1, zPosition);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffaed, 1.2);
    mainLight.position.set(5, 12, 8);
    scene.add(mainLight);

    const neonLight = new THREE.DirectionalLight(0x818cf8, 0.8);
    neonLight.position.set(-6, -2, 6);
    scene.add(neonLight);

    // Ground plane setup (cyberpunk dark track)
    const groundGeo = new THREE.PlaneGeometry(120, 25);
    const groundMat = new THREE.MeshPhongMaterial({
      color: 0x0f172a, // Slate-900 background floor
      shininess: 12,
      specular: 0x1e293b,
    });
    const groundPlane = new THREE.Mesh(groundGeo, groundMat);
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = -4.05; // Placed slightly below ground limit
    scene.add(groundPlane);

    // Grid scrolling Stripes
    const stripeGeo = new THREE.BoxGeometry(0.2, 0.05, 14);
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0x4f46e5 }); // Indigo neon color
    const stripes: { mesh: THREE.Mesh; baseX: number }[] = [];

    // Instantiate 12 parallel horizontal lines
    for (let i = 0; i < 12; i++) {
      const mesh = new THREE.Mesh(stripeGeo, stripeMat);
      const bx = -22 + i * 4;
      mesh.position.set(bx, -4.02, 0);
      scene.add(mesh);
      stripes.push({ mesh, baseX: bx });
    }
    stripesRef.current = stripes;

    // Passive Mode Bubble Setup
    const colors = [
      new THREE.Color("#ec4899"), // Pink
      new THREE.Color("#3b82f6"), // Blue
      new THREE.Color("#10b981"), // Emerald
      new THREE.Color("#f59e0b"), // Gold
      new THREE.Color("#8b5cf6"), // Purple
    ];
    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

    const spawnBubble = () => {
      const radius = 0.5 + Math.random() * 1.0;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 100,
        specular: new THREE.Color(0xffffff),
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(sphereGeo, material);
      const aspect = window.innerWidth / window.innerHeight;
      const xRange = 11 * aspect;
      mesh.position.set((Math.random() - 0.5) * xRange, -12, (Math.random() - 0.5) * 4);
      mesh.scale.setScalar(radius);
      scene.add(mesh);

      bubblesRef.current.push({
        mesh,
        velocity: new THREE.Vector3(0, 0.02 + Math.random() * 0.03, 0),
        baseX: mesh.position.x,
        sinOffset: Math.random() * Math.PI * 2,
        sinSpeed: 0.01 + Math.random() * 0.02,
        amplitude: 0.5 + Math.random() * 1.2,
        radius,
        color,
      });
    };

    // Instantiate passive bubbles
    for (let i = 0; i < 15; i++) {
      spawnBubble();
      bubblesRef.current[i].mesh.position.y = -10 + Math.random() * 22;
    }

    // Runner Mode — Construct Voxel Dinosaur Group
    const createDinosaur = () => {
      const group = new THREE.Group();

      const skinMat = new THREE.MeshPhongMaterial({
        color: 0xec4899, // Hot magenta
        shininess: 85,
        specular: 0xffffff,
      });

      const bellyMat = new THREE.MeshPhongMaterial({
        color: 0xf3a8e2, // Soft pink belly
        shininess: 80,
      });

      const spineMat = new THREE.MeshPhongMaterial({
        color: 0xf59e0b, // Gold spines
        shininess: 90,
      });

      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

      // Body Cube
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 0.75), skinMat);
      body.position.y = 0.5;
      group.add(body);

      // Belly Plate
      const belly = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 0.8), bellyMat);
      belly.position.set(0.22, 0.45, 0);
      group.add(belly);

      // Neck
      const neck = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.5, 0.45), skinMat);
      neck.position.set(0.38, 0.95, 0);
      group.add(neck);

      // Head Cube
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.55, 0.55), skinMat);
      head.position.set(0.48, 1.35, 0);
      group.add(head);

      // Snout
      const snout = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.45), skinMat);
      snout.position.set(0.85, 1.25, 0);
      group.add(snout);

      // Black eyes (L & R)
      const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), eyeMat);
      eyeL.position.set(0.65, 1.45, 0.28);
      group.add(eyeL);

      const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), eyeMat);
      eyeR.position.set(0.65, 1.45, -0.28);
      group.add(eyeR);

      // Tail
      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.35), skinMat);
      tail.position.set(-0.65, 0.4, 0);
      tail.rotation.z = -0.25;
      group.add(tail);
      tailRef.current = tail;

      // Spine Spikes
      const spikeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
      for (let i = 0; i < 4; i++) {
        const spike = new THREE.Mesh(spikeGeo, spineMat);
        spike.position.set(-0.15 - i * 0.22, 0.9 - i * 0.08, 0);
        spike.rotation.z = 0.45;
        group.add(spike);
      }

      // Hands
      const leftHand = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.12), skinMat);
      leftHand.position.set(0.7, 0.65, 0.22);
      group.add(leftHand);

      const rightHand = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.12), skinMat);
      rightHand.position.set(0.7, 0.65, -0.22);
      group.add(rightHand);

      // Waddling Left Leg Group
      const leftLegGrp = new THREE.Group();
      leftLegGrp.position.set(-0.15, 0.1, 0.22);
      const leftThigh = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.35, 0.22), skinMat);
      leftThigh.position.y = -0.18;
      leftLegGrp.add(leftThigh);
      group.add(leftLegGrp);
      leftLegRef.current = leftLegGrp;

      // Waddling Right Leg Group
      const rightLegGrp = new THREE.Group();
      rightLegGrp.position.set(-0.15, 0.1, -0.22);
      const rightThigh = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.35, 0.22), skinMat);
      rightThigh.position.y = -0.18;
      rightLegGrp.add(rightThigh);
      group.add(rightLegGrp);
      rightLegRef.current = rightLegGrp;

      // Set starting coordinate
      group.position.set(-4, -4, 0);
      scene.add(group);
      dinoGroupRef.current = group;
    };

    // Procedural Cactus Generator
    const createCactusMesh = (colorHex: number, height: number) => {
      const cactusGrp = new THREE.Group();
      const cMat = new THREE.MeshPhongMaterial({
        color: colorHex,
        shininess: 90,
        specular: 0xffffff,
      });

      // Trunk
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, height, 8), cMat);
      trunk.position.y = height / 2;
      cactusGrp.add(trunk);

      // Left Arm
      const leftArmH = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.55, 8), cMat);
      leftArmH.rotation.z = Math.PI / 2;
      leftArmH.position.set(-0.35, height * 0.58, 0);
      cactusGrp.add(leftArmH);

      const leftArmV = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.7, 8), cMat);
      leftArmV.position.set(-0.62, height * 0.58 + 0.28, 0);
      cactusGrp.add(leftArmV);

      // Right Arm
      const rightArmH = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.45, 8), cMat);
      rightArmH.rotation.z = Math.PI / 2;
      rightArmH.position.set(0.3, height * 0.42, 0);
      cactusGrp.add(rightArmH);

      const rightArmV = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.7, 8), cMat);
      rightArmV.position.set(0.52, height * 0.42 + 0.28, 0);
      cactusGrp.add(rightArmV);

      return cactusGrp;
    };

    createDinosaur();

    // Trigger Voxel Explosion on Crash
    const triggerCrashExplosion = (pos: THREE.Vector3, color: THREE.Color) => {
      playAudioCrash(isMuted);

      const voxGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
      const voxCount = 28;

      for (let i = 0; i < voxCount; i++) {
        const vMat = new THREE.MeshPhongMaterial({
          color: color,
          transparent: true,
          opacity: 0.95,
          shininess: 60,
        });
        const vMesh = new THREE.Mesh(voxGeo, vMat);
        vMesh.position.copy(pos);
        scene.add(vMesh);

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const speed = 0.12 + Math.random() * 0.16;

        const velocity = new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed + 0.05, // Explode slightly upwards
          Math.cos(phi) * speed * 0.8
        );

        particlesRef.current.push({
          mesh: vMesh,
          velocity,
          life: 1.0,
          decay: 0.02 + Math.random() * 0.02,
        });
      }

      setGameState("gameover");
    };

    // Running tick logic inside RequestAnimationFrame
    let clock = new THREE.Clock();

    const animateLoop = () => {
      requestRef.current = requestAnimationFrame(animateLoop);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      const running = isGameModeRef.current;
      const playing = gameStateRef.current === "playing";

      // Hide or show Dinosaur/Floor objects depending on game mode
      if (dinoGroupRef.current) {
        dinoGroupRef.current.visible = running;
      }
      groundPlane.visible = running;
      stripes.forEach((s) => (s.mesh.visible = running));

      // 1. UPDATE PASSIVE FLOATING BUBBLES (Only visible outside game mode)
      const bubbles = bubblesRef.current;
      bubbles.forEach((b) => {
        b.mesh.visible = !running;
      });

      if (!running) {
        // Floating bubbles update
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const b = bubbles[i];
          b.mesh.position.y += b.velocity.y;
          b.sinOffset += b.sinSpeed;
          b.mesh.position.x = b.baseX + Math.sin(b.sinOffset) * b.amplitude;
          // Scale wobble
          const pulse = 1 + Math.sin(b.sinOffset * 2) * 0.03;
          b.mesh.scale.setScalar(b.radius * pulse);

          if (b.mesh.position.y > 13) {
            scene.remove(b.mesh);
            b.mesh.geometry.dispose();
            if (Array.isArray(b.mesh.material)) {
              b.mesh.material.forEach((m) => m.dispose());
            } else {
              b.mesh.material.dispose();
            }
            bubbles.splice(i, 1);
            spawnBubble();
          }
        }
      }

      // 2. UPDATE ENDLESS RUNNER (Only active in Game Mode)
      if (running) {
        // Scroll Floor Indigo Stripes
        stripes.forEach((stripe) => {
          if (playing) {
            stripe.mesh.position.x -= scrollSpeedRef.current;
            if (stripe.mesh.position.x < -20) {
              stripe.mesh.position.x += 44; // Warp stripes back to right
            }
          }
        });

        // Spawning Cacti
        const now = Date.now();
        if (playing && now - lastCactusSpawnRef.current > nextSpawnDelayRef.current) {
          lastCactusSpawnRef.current = now;
          // Spawn interval becomes shorter as speed increases
          nextSpawnDelayRef.current = Math.max(900, 1600 - (scrollSpeedRef.current * 1800) + Math.random() * 1100);

          const cactusColors = [0x10b981, 0xf59e0b, 0x06b6d4, 0xef4444, 0xa78bfa];
          const colorHex = cactusColors[Math.floor(Math.random() * cactusColors.length)];
          const height = 1.3 + Math.random() * 0.8;
          const scale = 0.75 + Math.random() * 0.45;

          const cactusGrp = createCactusMesh(colorHex, height);
          cactusGrp.position.set(16, -4, 0); // Spawn off-screen right
          cactusGrp.scale.setScalar(scale);
          scene.add(cactusGrp);

          cactiRef.current.push({
            group: cactusGrp,
            width: 0.8 * scale,
            height: height * scale,
            color: new THREE.Color(colorHex),
          });
        }

        // Update Cacti Position & Check Collisions
        const cacti = cactiRef.current;
        for (let i = cacti.length - 1; i >= 0; i--) {
          const cactus = cacti[i];
          if (playing) {
            cactus.group.position.x -= scrollSpeedRef.current;
          }

          // AABB Bounding Box Collision Check
          const dinoGlobalY = -4 + dinoYRef.current + 0.8;
          const cactusGlobalY = -4 + cactus.height / 2;
          const dinoGlobalX = -4;

          const dx = Math.abs(dinoGlobalX - cactus.group.position.x);
          const dy = Math.abs(dinoGlobalY - cactusGlobalY);

          // Dino Box is width=1.1, height=1.6
          if (playing && dx < (1.1 + cactus.width) * 0.5 && dy < (1.6 + cactus.height) * 0.5) {
            triggerCrashExplosion(cactus.group.position.clone().setY(dinoGlobalY), cactus.color);
            break;
          }

          // Clear offscreen cacti
          if (cactus.group.position.x < -18) {
            scene.remove(cactus.group);
            disposeGroup(cactus.group);
            cacti.splice(i, 1);
          }
        }

        // Dinosaur Gravity Physics & Jump update
        if (playing) {
          if (dinoYRef.current > 0 || dinoVYRef.current !== 0) {
            const gravity = 0.012; // Standard gravity constant
            dinoVYRef.current -= gravity;
            dinoYRef.current += dinoVYRef.current;

            if (dinoYRef.current <= 0) {
              dinoYRef.current = 0;
              dinoVYRef.current = 0;
              isBackflippingRef.current = false;
              doubleJumpRef.current = true;
              if (dinoGroupRef.current) {
                dinoGroupRef.current.rotation.z = 0; // Reset flip
              }
            }
          }

          // Waddling Running Leg Animation on floor
          if (dinoGroupRef.current) {
            dinoGroupRef.current.position.y = -4 + dinoYRef.current;

            if (isBackflippingRef.current) {
              flipRotationRef.current -= 0.16; // flip speed
              dinoGroupRef.current.rotation.z = flipRotationRef.current;
            } else if (dinoYRef.current === 0) {
              // Waddling leg pivot back/forth
              const cycleSpeed = time * scrollSpeedRef.current * 42;
              if (leftLegRef.current && rightLegRef.current && tailRef.current) {
                leftLegRef.current.rotation.x = Math.sin(cycleSpeed) * 0.75;
                rightLegRef.current.rotation.x = -Math.sin(cycleSpeed) * 0.75;
                
                // Bob body up/down waddle waddle
                dinoGroupRef.current.position.y = -4 + Math.abs(Math.sin(cycleSpeed)) * 0.14;
                tailRef.current.rotation.z = -0.25 + Math.sin(cycleSpeed) * 0.18;
              }
            }
          }

          // Dust Foot Particles Trails Spawning
          if (dinoYRef.current === 0 && Math.random() < 0.24) {
            const pMat = new THREE.MeshBasicMaterial({
              color: 0x64748b, // Grey dust particles
              transparent: true,
              opacity: 0.65,
            });
            const dustMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), pMat);
            dustMesh.position.set(-4.6, -4, (Math.random() - 0.5) * 0.4);
            scene.add(dustMesh);

            dustParticlesRef.current.push({
              mesh: dustMesh,
              velocity: new THREE.Vector3(-0.06 - Math.random() * 0.08, 0.01 + Math.random() * 0.03, 0),
              life: 1.0,
              decay: 0.045,
            });
          }
        }
      }

      // Update active dust trails
      const dust = dustParticlesRef.current;
      for (let i = dust.length - 1; i >= 0; i--) {
        const p = dust[i];
        p.mesh.position.add(p.velocity);
        p.life -= p.decay;
        if (p.mesh.material instanceof THREE.Material) {
          p.mesh.material.opacity = p.life;
        }
        if (p.life <= 0) {
          scene.remove(p.mesh);
          p.mesh.geometry.dispose();
          if (p.mesh.material instanceof THREE.Material) p.mesh.material.dispose();
          dust.splice(i, 1);
        }
      }

      // Update active crash voxel explosion particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.mesh.position.add(p.velocity);
        // Apply falling gravity to crash voxel fragments
        p.velocity.y -= 0.006;
        p.life -= p.decay;

        if (p.mesh.material instanceof THREE.Material) {
          p.mesh.material.opacity = p.life;
        }

        if (p.life <= 0) {
          scene.remove(p.mesh);
          p.mesh.geometry.dispose();
          if (p.mesh.material instanceof THREE.Material) p.mesh.material.dispose();
          particles.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animateLoop();

    // Canvas click — only for touch/pointer devices, not desktop mouse
    // (desktop users use Space/ArrowUp/W; canvas clicks cause accidental double-jumps)
    const handleCanvasClick = (event: MouseEvent) => {
      if (event.pointerType === "touch") return; // handled by touchstart already
      // allow mouse click on desktop as a fallback only
      if (isGameModeRef.current && gameStateRef.current === "playing") {
        triggerJumpRef.current();
      }
    };

    // Touch: tap = jump, swipe-up = second jump
    let touchStartY = 0;
    const handleCanvasTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      touchStartY = event.touches[0].clientY;
      if (isGameModeRef.current && gameStateRef.current === "playing") {
        triggerJumpRef.current();
      }
    };
    const handleCanvasTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      const swipeDist = touchStartY - event.changedTouches[0].clientY;
      if (isGameModeRef.current && gameStateRef.current === "playing" && swipeDist > 30) {
        triggerJumpRef.current();
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("touchstart", handleCanvasTouchStart, { passive: false });
    canvas.style.touchAction = "none";
    canvas.addEventListener("touchmove", (e) => { e.preventDefault(); }, { passive: false });
    canvas.addEventListener("touchend", handleCanvasTouchEnd, { passive: false });

    // Responsive screen resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      
      const aspect = w / h;
      camera.aspect = aspect;
      camera.position.z = aspect < 1.3 ? Math.min(32, 14 * (1.3 / aspect)) : 14;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // Cleanup all Three objects
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (canvas) {
        canvas.removeEventListener("click", handleCanvasClick);
        canvas.removeEventListener("touchstart", handleCanvasTouchStart);
        canvas.removeEventListener("touchmove", (e) => { e.preventDefault(); });
        canvas.removeEventListener("touchend", handleCanvasTouchEnd);
      }
      window.removeEventListener("resize", handleResize);

      // Clean scene collections
      bubblesRef.current.forEach((b) => {
        scene.remove(b.mesh);
        b.mesh.geometry.dispose();
        if (b.mesh.material instanceof THREE.Material) b.mesh.material.dispose();
      });
      bubblesRef.current = [];

      cactiRef.current.forEach((c) => {
        scene.remove(c.group);
        disposeGroup(c.group);
      });
      cactiRef.current = [];

      particlesRef.current.forEach((p) => {
        scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        if (p.mesh.material instanceof THREE.Material) p.mesh.material.dispose();
      });
      particlesRef.current = [];

      dustParticlesRef.current.forEach((d) => {
        scene.remove(d.mesh);
        d.mesh.geometry.dispose();
        if (d.mesh.material instanceof THREE.Material) d.mesh.material.dispose();
      });
      dustParticlesRef.current = [];

      if (dinoGroupRef.current) {
        scene.remove(dinoGroupRef.current);
        disposeGroup(dinoGroupRef.current);
      }

      stripes.forEach((s) => {
        scene.remove(s.mesh);
        s.mesh.geometry.dispose();
        s.mesh.material.dispose();
      });

      renderer.dispose();
    };
  }, [isMuted]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 font-sans selection:bg-pink-500/30">
      
      {/* Three.js Canvas Backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full outline-none block cursor-pointer touch-none"
      />

      {/* Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_75%,transparent_100%)] pointer-events-none" />

      {/* Aesthetic glowing nebula lights */}
      <div className="absolute top-0 right-1/4 h-[35rem] w-[35rem] rounded-full bg-pink-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 h-[25rem] w-[25rem] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      {/* Mute Synth Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 z-40 p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 hover:text-white hover:bg-white/15 transition-all shadow-md cursor-pointer"
        aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      {/* STATE A: INTRO GREETING VIEW */}
      {!isGameMode && (
        <div className="relative z-10 flex min-h-screen flex-col justify-between px-4 py-8 sm:px-6 lg:px-8">
          
          {/* Header */}
          <header className="flex justify-between items-center max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Jericho School" className="h-12 w-auto animate-pulse" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white tracking-wide">Jericho School</h1>
                <p className="text-xs text-slate-400">Competence & Dignity</p>
              </div>
            </div>
            
            <Button
              onClick={triggerGameMode}
              className="group py-3 sm:py-5 px-4 sm:px-5 rounded-full border border-pink-500/30 bg-pink-600/10 hover:bg-pink-600/20 text-pink-300 font-semibold flex items-center gap-1.5 sm:gap-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all cursor-pointer text-xs sm:text-sm"
            >
              <Gamepad2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-400 group-hover:scale-125 transition-transform animate-bounce" />
              <span>Enter 3D Dino Game</span>
            </Button>
          </header>

          {/* Core Panel */}
          <main className="flex-1 flex items-center justify-center py-12">
            <div className="max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-inner text-amber-300 text-sm font-semibold tracking-wide">
                <Sparkles className="h-4 w-4 animate-spin-slow text-amber-400" />
                <span>Experience Interactive 3D Dino Runner</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-tight">
                  Welcome to <br />
                  <span className="bg-gradient-to-r from-pink-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent drop-shadow">
                    Jericho School
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
                  Cultivating excellence, character, and lifelong leadership. Discover our gorgeous, state-of-the-art campus.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <Button
                  onClick={() => navigate("/school")}
                  className="w-full sm:w-auto px-8 py-7 rounded-2xl text-base font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_30px_-5px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 duration-300 cursor-pointer"
                >
                  <Compass className="h-5 w-5 text-indigo-600" />
                  <span>Pay a Visit</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  onClick={() => setIsEnrollOpen(true)}
                  className="w-full sm:w-auto px-8 py-7 rounded-2xl text-base font-bold border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/15 hover:border-white/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 duration-300 cursor-pointer"
                >
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <span>Enroll Now</span>
                </Button>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="text-center text-slate-500 text-xs tracking-wider">
            <p>© 2026 JERICHO SCHOOL. ALL RIGHTS RESERVED.</p>
            <p className="mt-1 text-slate-600">Tip: After 5 minutes of inactivity, the 3D Dino Runner game will launch automatically!</p>
          </footer>
        </div>
      )}

      {/* STATE B: ACTIVE RUNNER GAME HUD & GAME OVER MENUS */}
      {isGameMode && (
        <div className="relative z-10 flex min-h-screen flex-col justify-between p-4 sm:p-6 lg:p-8 select-none">
          
          {/* Top fixed HUD */}
          <header className="w-full max-w-2xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/45 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-6 duration-500">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={logoImg} alt="Jericho Logo" className="h-8 sm:h-10 w-auto" />
              <div className="hidden sm:block">
                <h2 className="text-sm font-extrabold text-white tracking-wider">Jericho 3D Dino</h2>
                <p className="text-[10px] text-pink-400 uppercase tracking-widest font-semibold">Survival Runner</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
              <div className="text-center">
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Distance</p>
                <p className="text-lg sm:text-2xl font-black text-pink-400 drop-shadow">{score}m</p>
              </div>

              {highScore > 0 && (
                <>
                  <div className="h-6 sm:h-8 w-[1px] bg-white/10" />
                  <div className="text-center">
                    <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Record</p>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-amber-400">
                      <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
                      <p className="text-lg sm:text-2xl font-black">{highScore}m</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Button
              onClick={handleExitGame}
              className="py-1 sm:py-2 px-2.5 sm:px-3 rounded-lg sm:rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 text-[10px] sm:text-xs font-semibold cursor-pointer"
            >
              Exit
            </Button>
          </header>

          {/* Interactive instruction HUD */}
          <main className="flex-1 flex items-center justify-center">

            {/* Game Over Screen */}
            {gameState === "gameover" && (
              <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-3xl border border-white/20 bg-slate-950/85 backdrop-blur-2xl shadow-2xl animate-in zoom-in-95 duration-300 text-center space-y-4 sm:space-y-6">
                <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 animate-bounce">
                  <Gamepad2 className="h-10 w-10 sm:h-12 sm:w-12" />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Ouch! Crash!</h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    You collided with a neon cactus. Great survival run!
                  </p>
                </div>

                {/* Score Panel */}
                <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Distance</p>
                    <p className="text-2xl sm:text-3xl font-black text-pink-400">{score}m</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">High Score</p>
                    <p className="text-2xl sm:text-3xl font-black text-white">{highScore}m</p>
                  </div>
                </div>

                {score >= highScore && score > 0 && (
                  <p className="text-emerald-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase animate-pulse">
                    🏆 New High Score! 🏆
                  </p>
                )}

                <div className="flex flex-col gap-2.5 sm:gap-3">
                  <Button
                    onClick={triggerGameMode}
                    className="w-full py-5 sm:py-6 rounded-xl font-bold bg-gradient-to-r from-pink-500 via-indigo-600 to-amber-500 hover:opacity-90 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                  >
                    <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Run Again</span>
                  </Button>

                  <Button
                    onClick={() => navigate("/school")}
                    className="w-full py-5 sm:py-6 rounded-xl font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                  >
                    <Compass className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400" />
                    <span>Explore School Website</span>
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            )}
          </main>

          {/* On-screen controls: touch buttons (hidden on desktop via hover media query) + desktop hint */}
          {gameState === "playing" && (
            <div className="w-full flex items-end justify-between gap-3 px-4 pb-4 sm:pb-6">
              {/* Desktop hint — only shown on non-touch devices */}
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold hidden [@media(hover:hover)]:block">
                SPACE / ↑ / W — Jump &nbsp;•&nbsp; Tap twice mid-air to backflip
              </p>
              {/* Touch buttons — only shown on touch/no-hover devices */}
              <div className="flex gap-3 ml-auto [@media(hover:hover)]:hidden">
                <button
                  onPointerDown={(e) => { e.preventDefault(); triggerJumpRef.current(); }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-pink-500/60 bg-pink-500/20 backdrop-blur-md text-white font-black text-sm sm:text-base active:scale-95 active:bg-pink-500/40 transition-all shadow-lg shadow-pink-500/20 select-none touch-none"
                  aria-label="Jump"
                >
                  Jump
                </button>
                <button
                  onPointerDown={(e) => { e.preventDefault(); triggerJumpRef.current(); }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-indigo-500/60 bg-indigo-500/20 backdrop-blur-md text-white font-black text-[11px] sm:text-sm active:scale-95 active:bg-indigo-500/40 transition-all shadow-lg shadow-indigo-500/20 select-none touch-none"
                  aria-label="Double Jump"
                >
                  2× Jump
                </button>
              </div>
            </div>
          )}
          {gameState !== "playing" && (
            <footer className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold pb-4">
              Double jump triggers a full 360 backflip • Speed increases every 500 meters
            </footer>
          )}
        </div>
      )}

      {/* Subscription Dialog Modal overlay */}
      <SubscriptionModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
      />
    </div>
  );
}
