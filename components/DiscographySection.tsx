'use client';

import { type Track } from '@/lib/artist-data';

interface DiscographySectionProps {
  tracks: Track[];
}

export default function DiscographySection({ tracks }: DiscographySectionProps) {
  return (
    <div className="mb-12">
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-okra-bright/50 mb-5 font-oo-neureal">
        Discography
      </h3>
      <div className="flex flex-col gap-4">
        {tracks.map((track, i) => (
          <div
            key={i}
            className="w-full border border-white/5 rounded-lg overflow-hidden bg-white/[0.02]"
          >
            <iframe
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&show_artwork=true&color=00ff00&show_playcount=true&show_user=true`}
              width="100%"
              height="166"
              className="border-0"
              title={track.title}
              loading="lazy"
              allow="autoplay; encrypted-media"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
