'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MEDIA_MANIFEST } from '@/lib/media-manifest';

export default function CareerReimagined() {
  return (
    <section className="relative py-96 bg-black overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-12 h-[1px] bg-okra-bright" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-okra-bright font-oo-neureal">Elevating The Standard</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-oo-neureal leading-[0.9] tracking-tighter uppercase">
                Your Career <br />
                <span className="text-okra-bright text-glow-bright">Reimagined</span>
              </h2>
            </div>

            <div className="space-y-10">
              <p className="text-2xl md:text-3xl text-white font-oo-neureal leading-snug font-light max-w-xl">
                No more frustrating fee negotiations. Have your <span className="text-okra-bright text-glow-bright">tech & hospitality rider honored</span> and care on the ground.
              </p>
              
              <div className="h-[1px] w-24 bg-white/10" />

              <div className="space-y-6">
                <p className="text-lg md:text-xl text-white/50 font-oo-neureal leading-relaxed max-w-lg">
                  No artist should be without these basics. Tired of organizers being belligerent and treating you and your art as commodities?
                </p>
                <p className="text-lg md:text-xl text-okra-bright/80 font-oo-neureal font-medium tracking-tight">
                  Just ask{' '}
                  <Link href="/artists" className="body-link">
                    our artists
                  </Link>{' '}
                  what it&rsquo;s like to be part of the Okra Ecosystem...
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image Side */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] group overflow-hidden border border-white/5"
            >
              <Image 
                src={MEDIA_MANIFEST.HEROES.ARTIST_SANCTUARY} 
                alt="Phum@Laax Night Club"
                fill
                className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              />
              
              {/* Subtle Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-okra-bright/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              {/* Corner Decorative Element */}
              <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-okra-bright/30" />
            </motion.div>

            {/* Premium Caption - Similar to Karaba's */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-[1px] bg-okra-bright mb-4" />
              <span className="block text-[10px] uppercase tracking-[0.5em] text-okra-bright font-oo-neureal">Phum@Laax Night Club</span>
            </motion.div>
          </div>

        </div>
      </div>
      
      {/* Background Atmosphere */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-okra-bright/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
