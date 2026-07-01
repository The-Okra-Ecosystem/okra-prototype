'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import ArtistModal from './ArtistModal';
import { ARTISTS, type Artist } from '@/lib/artist-data';

function ArtistCard({ artist, onClick }: { artist: Artist; onClick: () => void }) {
  return (
    <div
      className="relative flex flex-col justify-end border-[3px] rounded-[5px] min-h-[360px] cursor-pointer overflow-hidden border-okra-bright shadow-[0_0_25px_rgba(0,255,0,0.3)] hover:border-okra-bright hover:shadow-[0_0_40px_rgba(0,255,0,0.5)] active:border-okra-bright active:shadow-[0_0_40px_rgba(0,255,0,0.5)]"
      onClick={onClick}
    >
      {/* Full-row image overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-[5px] overflow-hidden">
        {artist.photo && (
          <Image
            src={artist.photo}
            alt={artist.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
        {/* Left fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/90" />
        {/* Bottom fade for tall cards — keeps text legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Badges — top-right stack */}
      <div className="absolute top-2 right-2 z-20 flex flex-col gap-2">
        <span className="badge badge-bright px-[18px] py-[10px] text-xs self-end border-glow-breathe">
          {artist.label}
        </span>
        <a
          href={`mailto:katie@weareokra.ch?subject=${encodeURIComponent(`I want to book ${artist.name}`)}`}
          onClick={(e) => e.stopPropagation()}
          className="badge badge-fire text-glow-breathe bg-black/60 px-[18px] py-[10px] text-xs self-end border-glow-breathe-fire"
        >
          Book →
        </a>
      </div>

      <div className="flex flex-col gap-2 pl-2 pb-2 relative z-10">
        <h3 className="text-[19px] md:text-2xl font-oo-neureal tracking-tighter text-white">
          {artist.name}
        </h3>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-white max-w-sm leading-relaxed">
          {artist.bio}
        </p>
        {/* Genre tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {artist.genres.map((genre) => (
            <span
              key={genre}
              className="badge-fire-ghost text-[10px] tracking-[0.2em] px-[10px] py-[3px] rounded-full border-glow-breathe-fire"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RosterGrid() {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    ARTISTS.forEach((a) => a.genres.forEach((g) => set.add(g)));
    return Array.from(set).sort();
  }, []);

  const filteredArtists = useMemo(() => {
    if (!activeGenre) return ARTISTS;
    return ARTISTS.filter((a) => a.genres.includes(activeGenre));
  }, [activeGenre]);

  return (
    <div className="relative pt-24 md:pt-32 pb-0">
      <div className="container-custom">
        <div className="flex flex-col gap-y-6 md:gap-y-8">
          {/* Section Header */}
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-white/30 font-oo-neureal block mb-4">/ The Okra Ecosystem</span>
            <h2 className="text-5xl md:text-7xl font-oo-neureal uppercase tracking-tighter text-okra-bright text-glow-bright">
              The Roster
            </h2>
          </div>

          {/* Vangard Philosophy */}
          <div className="max-w-3xl">
            <p className="text-lg md:text-xl text-okra-bright text-glow-breathe font-oo-neureal leading-relaxed uppercase tracking-[0.05em]">
              A carefully curated collective of rulebreakers — sound architects and visual poets re-coding the global dancefloor from Basel to the beyond.
            </p>
          </div>

          {/* Genre Filter Bar */}
            <div className="flex flex-wrap gap-2 pt-2 pb-6 md:pt-4 md:pb-10">
            <button
              onClick={() => setActiveGenre(null)}
              className={`text-[10px] px-4 py-2 ${!activeGenre ? 'badge-filter-active' : 'badge-filter'}`}
            >
              All
            </button>
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre === activeGenre ? null : genre)}
                className={`text-[10px] px-4 py-2 ${activeGenre === genre ? 'badge-filter-active' : 'badge-filter'}`}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-y-10 md:gap-y-16 lg:gap-y-20 xl:gap-y-24">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} onClick={() => setSelectedArtist(artist)} />
            ))}
          </div>

          {filteredArtists.length === 0 && (
            <p className="text-white/30 font-oo-neureal uppercase tracking-[0.15em] text-sm text-center py-16">
              No artists match this genre.
            </p>
          )}
        </div>
      </div>

      <ArtistModal artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
    </div>
  );
}
