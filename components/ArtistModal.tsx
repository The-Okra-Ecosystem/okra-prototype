'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { type Artist } from '@/lib/artist-data';
import AnimatedCloseButton from './AnimatedCloseButton';
import DiscographySection from './DiscographySection';

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
}

export default function ArtistModal({ artist, onClose }: ArtistModalProps) {
  useEffect(() => {
    if (artist) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [artist]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {artist && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', mass: 0.8, stiffness: 100, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto bg-black border-t border-white/5 z-50 rounded-t-2xl"
          >
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Close button */}
              <AnimatedCloseButton
                onClick={onClose}
                className="absolute top-4 right-4 z-30"
              />

              {/* Photo */}
              <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
                {artist.photo ? (
                  <Image
                    src={artist.photo}
                    alt={artist.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 672px) 100vw, 672px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-okra-deep/20">
                    <span className="text-okra-bright/40 font-oo-neureal text-sm">IMAGE PENDING</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="badge badge-bright px-3 py-1.5">
                    {artist.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pb-8">
                <h2 className="text-4xl md:text-5xl font-oo-neureal uppercase tracking-tighter text-okra-bright text-glow-bright">
                  {artist.name}
                </h2>

                <div className="w-full h-[1px] bg-okra-bright/20 my-4" />

                <p className="text-sm md:text-base text-white/60 font-oo-neureal leading-relaxed uppercase tracking-[0.1em] mb-6">
                  {artist.bio}
                </p>

                {/* Discography */}
                {artist.discography && artist.discography.length > 0 && (
                  <DiscographySection tracks={artist.discography} />
                )}

                {/* Social Links */}
                {artist.social && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {artist.social.instagram && (
                      <a
                        href={`https://instagram.com/${artist.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge-fire text-[10px] px-4 py-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Instagram
                      </a>
                    )}
                    {artist.social.soundcloud && (
                      <a
                        href={`https://soundcloud.com/${artist.social.soundcloud}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge-fire text-[10px] px-4 py-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        SoundCloud
                      </a>
                    )}
                    {artist.social.website && (
                      <a
                        href={`https://${artist.social.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge-fire text-[10px] px-4 py-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Website
                      </a>
                    )}
                  </div>
                )}

                {/* Profile Link */}
                {artist.slug && (
                  <div className="mb-8">
                    <Link
                      href={`/artists/${artist.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="badge badge-fire text-[10px] px-4 py-2 inline-block"
                    >
                      Profile →
                    </Link>
                  </div>
                )}

                {/* Book CTA */}
                <a
                  href={`mailto:katie@weareokra.ch?subject=${encodeURIComponent(`I want to book ${artist.name}`)}`}
                  className="badge-cta text-sm px-6 py-3"
                >
                  Book →
                </a>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
