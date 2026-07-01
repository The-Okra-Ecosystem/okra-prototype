'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FadeSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeSection({ children, className = "" }: FadeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Full lifecycle: fade in, stay solid, fade out
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity, scale }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
