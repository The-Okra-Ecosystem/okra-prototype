'use client';

import React from 'react';
import { motion } from 'framer-motion';

import ComingSoonHeader from '@/components/ComingSoonHeader';

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      
      <ComingSoonHeader />
      
      {/* Dynamic Background Gradient - Synced with EthosSection */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base Forest Green Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-okra-deep/40 rounded-full blur-[160px] opacity-60" />
        
        {/* Okra Green Highlights (Bioluminescence) */}
        <div className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] bg-okra-bright/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] bg-okra-bright/5 rounded-full blur-[140px]" />
        
        {/* Radial Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,60,0,0.2)_0%,transparent_80%)]" />
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-[10vw] font-oo-neureal leading-[0.8] tracking-tighter mb-8">
            COMING<br />SOON
          </h1>
          
          <div className="h-[1px] w-24 bg-okra-bright mx-auto mb-12" />
          
          <p className="text-sm md:text-base text-white/50 font-oo-neureal uppercase tracking-[0.5em] max-w-xl mx-auto leading-relaxed">
            The Okra Ecosystem is currently <span className="text-okra-bright">under construction</span>. <br />
            Pioneers of underground sound & culture.
          </p>
        </motion.div>

        {/* Footer info */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-white">
            © 2026 Okra Ecosystem — Switzerland
          </p>
        </motion.div>

      </div>
    </main>
  );
}
