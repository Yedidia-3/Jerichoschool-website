import { useCallback, useEffect, useRef, useState } from "react";
import type { Announcement } from "../data/announcements";

const INTERVAL_MS = 6000;

export function useAnnouncements(items: Announcement[]) {
  const active = items
    .filter((a) => a.active)
    .sort((a, b) => a.priority - b.priority);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const advance = useCallback(() => {
    if (pausedRef.current || active.length <= 1) return;
    setVisible(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % active.length);
      setVisible(true);
    }, 300);
  }, [active.length]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, INTERVAL_MS);
  }, [advance]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; startTimer(); };

  return {
    current: active[index] ?? null,
    total: active.length,
    index,
    visible,
    pause,
    resume,
  };
}
