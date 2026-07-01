'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EthosSection() {
  return (
    <section className="relative py-[434px] bg-black overflow-hidden">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base Forest Green Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-okra-deep/40 rounded-full blur-[160px] opacity-60" />

        {/* Okra Green Highlights (Bioluminescence) */}
        <div className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] bg-okra-bright/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] bg-okra-bright/5 rounded-full blur-[140px]" />

        {/* Radial Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,60,0,0.2)_0%,transparent_80%)]" />
      </div>

      <div className="container-custom relative z-10 pt-64 pb-64">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="h-[50px]" />
            <h2 className="text-6xl md:text-8xl mb-20 tracking-tighter leading-none">
              NURTURING THE<br />VANGUARD
            </h2>

            <div className="flex flex-col md:flex-row gap-16 items-start">
              <div className="w-12 h-[1px] bg-okra-bright mt-4 shrink-0" />
              <p className="text-2xl md:text-3xl text-white/80 font-oo-neureal leading-relaxed font-light">
                We believe that the most profound artistic breakthroughs require a foundation of
                <span className="text-okra-bright text-glow-bright"> absolute emotional safety</span>.
              </p>
            </div>

            <div className="mt-32 pl-0 md:pl-32">
              <p className="text-lg md:text-xl text-white/40 font-oo-neureal leading-[2] max-w-2xl">
                The Okra Ecosystem is a meticulously curated incubator designed to protect, uplift, and amplify the{' '}
                <Link href="/artists" className="body-link">
                  voices shaping our future
                </Link>
                . Here, you are held, heard, and free to push the boundaries of what is possible.
              </p>
              <div className="h-[50px]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-okra-bright/20 to-transparent" />
    </section>
  );
}
