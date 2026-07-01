'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const morphVariants = {
  enter: { opacity: 0, scale: 0.6, rotate: -120, filter: 'blur(12px)' },
  center: { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 1.4, rotate: 120, filter: 'blur(12px)' },
};

interface AnimatedCloseButtonProps {
  onClick: () => void;
  className?: string;
}

export default function AnimatedCloseButton({ onClick, className = '' }: AnimatedCloseButtonProps) {
  const [showX, setShowX] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowX((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`text-okra-fire fire-pulse hover:text-okra-bright hover:shadow-[0_0_30px_rgba(0,255,0,0.6)] hover:scale-110 active:text-okra-bright active:shadow-[0_0_30px_rgba(0,255,0,0.6)] active:scale-110 transition-all duration-300 rounded-full ${className}`}
      aria-label="Close"
    >
      <div className="relative w-7 h-7 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {showX ? (
            <motion.div
              key="x"
              variants={morphVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="eye"
              variants={morphVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src="/images/more-logos/Okra%20Eye%20Icon%20Texture%20Red%20nbg.png"
                alt="OKRA Eye"
                width={28}
                height={28}
                className="object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
