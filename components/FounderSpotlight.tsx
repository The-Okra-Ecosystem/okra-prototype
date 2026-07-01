'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MEDIA_MANIFEST } from '@/lib/media-manifest';

export default function FounderSpotlight() {
  return (
    <section className="relative py-96 bg-black overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-48 items-center">

          {/* Portrait Side */}
          <div className="relative">
            <motion.div
              className="relative aspect-[4/5] group overflow-hidden border border-white/5"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <Image
                src={MEDIA_MANIFEST.ARTISTS.KA_RABA}
                alt="Katerine Omole (KA-RABA)"
                fill
                className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />

              {/* Subtle Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-okra-bright/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              {/* Corner Decorative Element */}
              <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-okra-bright/30" />
            </motion.div>

            {/* Premium Caption */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-[1px] bg-okra-bright mb-4" />
              <span className="block text-[10px] uppercase tracking-[0.5em] text-okra-bright font-oo-neureal">Founder & Creative Lead</span>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl mb-12 tracking-tighter leading-none">
                <span className="text-okra-bright">OKRA:</span><br />
                <span className="text-white">FORGING<br />NEW PATHS</span>
              </h2>

              <p className="text-xl md:text-2xl text-white/80 font-oo-neureal leading-relaxed mb-16">
                Founded by <span className="text-okra-bright text-glow-bright whitespace-nowrap">Katerine Omole (KA‑RABA)</span>, the mother of the Okra Ecosystem.
              </p>
              <div className="space-y-6 text-white/50 text-lg leading-relaxed font-oo-neureal max-w-xl">
                <p>As KA-RABA expresses her vision for the arts space and the arts, the trail she blazes paves a highway for others.</p>
                <p>Bridging the gaps in the margins, where the people in the margins are marginalized. <span className="text-okra-bright">There is space...</span></p>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
