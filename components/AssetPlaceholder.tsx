import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AssetPlaceholderProps {
  /** Stable identifier (e.g. "collective-portrait-wide-basel-studio.webp") */
  asset: string;
  /** Optional user-facing label; falls back to the asset id */
  label?: string;
  /** Aspect ratio token */
  aspect?: 'square' | 'video' | 'portrait' | 'ultrawide' | 'auto';
  /** Whether to use grayscale treatment (matches the FounderSpotlight hover pattern) */
  grayscale?: boolean;
  /** Visual slot type, affects frame treatment and label */
  kind?: 'image' | 'video' | 'audio' | 'portrait';
  className?: string;
}

const ASPECT_CLASS: Record<NonNullable<AssetPlaceholderProps['aspect']>, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[4/5]',
  ultrawide: 'aspect-[21/9]',
  auto: '',
};

/**
 * Renders an on-brand placeholder for a media asset that has not yet been
 * delivered. Two reasons to use this rather than the existing image:
 *
 *  1. The asset has not been dropped into /public yet, but the layout
 *     should still ship.
 *  2. The reviewer can grep the DOM for `data-asset` to find every pending
 *     slot in one pass.
 *
 * The placeholder itself is a quiet black panel with a thin okra-bright
 * border, a corner mark, and the asset id in tiny uppercase type — so it
 * reads as an architectural drawing of a frame, not as a missing image.
 */
export default function AssetPlaceholder({
  asset,
  label,
  aspect = 'video',
  grayscale = false,
  kind = 'image',
  className,
}: AssetPlaceholderProps) {
  const isAudio = kind === 'audio';
  return (
    <div
      data-asset={asset}
      data-asset-pending="true"
      data-asset-kind={kind}
      className={cn(
        'relative w-full overflow-hidden border border-okra-bright/20 bg-black/40',
        ASPECT_CLASS[aspect],
        grayscale && 'grayscale',
        className,
      )}
    >
      {/* Faint radial atmosphere so the panel does not feel dead */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,60,0,0.18)_0%,transparent_70%)]"
      />

      {/* Subtle scanline texture, matches the global brand treatment */}
      <div aria-hidden className="absolute inset-0 scanlines opacity-30" />

      {/* Corner crop marks */}
      <div
        aria-hidden
        className="absolute top-3 left-3 w-5 h-5 border-l border-t border-okra-bright/40"
      />
      <div
        aria-hidden
        className="absolute top-3 right-3 w-5 h-5 border-r border-t border-okra-bright/40"
      />
      <div
        aria-hidden
        className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-okra-bright/40"
      />
      <div
        aria-hidden
        className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-okra-bright/40"
      />

      {/* Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="text-[9px] uppercase tracking-[0.5em] text-okra-bright/70 font-oo-neureal">
          {isAudio ? 'AUDIO EMBED' : kind === 'video' ? 'VIDEO' : kind === 'portrait' ? 'PORTRAIT' : 'IMAGE'} — ASSET PENDING
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-oo-neureal break-all max-w-full">
          {label ?? asset}
        </span>
      </div>
    </div>
  );
}
