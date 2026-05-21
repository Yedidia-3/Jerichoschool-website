import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import heroImg from "@/assets/images/hero.jpg";
import primaryImg from "@/assets/images/primary.jpg";
import cultureImg from "@/assets/images/culture.jpg";
import entertainmentImg from "@/assets/images/entertainment.jpg";
import disciplineImg from "@/assets/images/discipline.jpg";
import competenceImg from "@/assets/images/competence.jpg";

const images = [
  heroImg,
  primaryImg,
  cultureImg,
  entertainmentImg,
  disciplineImg,
  competenceImg,
];

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Jericho School Highlight"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
