'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ClimaxCTA() {
  const [isActive, setIsActive] = useState(false);

  return (
    <section className="relative py-0 bg-black overflow-hidden border-t border-white/5">
      {/* Dynamic Background Gradient - Uniform with EthosSection */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base Forest Green Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-okra-deep/40 rounded-full blur-[160px] opacity-60" />

        {/* Okra Green Highlights (Bioluminescence) */}
        <div className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] bg-okra-bright/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] bg-okra-bright/5 rounded-full blur-[140px]" />

        {/* Radial Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,60,0,0.2)_0%,transparent_80%)]" />
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center text-center pt-16 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {/* Uniform 50px Top Spacer */}
          <div className="h-[50px]" aria-hidden="true" />

          <h2 className="text-7xl md:text-[12vw] font-oo-neureal leading-[0.85] tracking-tighter mb-12">
            OUR DOORS<br />ARE <span className="text-okra-bright text-glow-bright">OPEN</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/50 font-oo-neureal leading-relaxed uppercase tracking-[0.25em] text-center mb-16">
            Whether you are looking to{' '}
            <Link href="/contact" className="body-link">
              collaborate
            </Link>
            , book a takeover, or simply{' '}
            <Link href="/events" className="body-link">
              immerse yourself in the sound
            </Link>
            , there is a place for you here.
          </p>

          <motion.div
            onViewportEnter={() => setIsActive(true)}
            onViewportLeave={() => setIsActive(false)}
            viewport={{ margin: "-45% 0px -45% 0px" }}
          >
            <Link 
              href="/contact" 
              className={`btn-premium ${isActive ? 'is-scrolled-active' : ''}`}
            >
              <span className="relative z-10">Initialize Connection</span>
            </Link>
          </motion.div>

          {/* Uniform 50px Bottom Spacer */}
          <div className="h-[50px]" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
