import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AssetPlaceholder from '@/components/AssetPlaceholder';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type VideoPlatform = 'youtube' | 'vimeo';

export interface VideoEmbedProps {
  /** Platform — controls the embed URL pattern. */
  platform?: VideoPlatform;
  /** Platform video ID (e.g. YouTube `dQw4w9WgXcQ` or Vimeo `824004225`). */
  videoId?: string;
  /** Title for the iframe (a11y / SEO). */
  title: string;
  /**
   * Greppable asset ID used when no real video is wired yet.
   * E.g. `everyday-blackness-short-film` — this becomes the
   * `data-asset` attribute on the placeholder, and the
   * `data-asset-pending="true"` flag surfaces it in build audits.
   */
  asset: string;
  /** Human label rendered inside the placeholder, e.g. "Everyday Blackness — 6 min". */
  label?: string;
  /** Whether the embed should be muted autoplay background-style, or click-to-play. Default click-to-play. */
  background?: boolean;
  /** Container className (overrides default aspect wrapper). */
  className?: string;
}

/**
 * A single reusable video embed primitive.
 *
 * Two states:
 *  - Wired: `videoId` provided → renders a responsive iframe (16:9)
 *  - Pending: `videoId` undefined → renders an `AssetPlaceholder` with
 *    `kind="video"`, `data-asset-pending="true"`, and the asset id set
 *    on `data-asset` so a reviewer can grep for unwired videos.
 *
 * The single-slot-per-page rule is enforced at the page level — each
 * home/ecosystem/about page should call this component exactly once.
 */
export default function VideoEmbed({
  platform = 'youtube',
  videoId,
  title,
  asset,
  label,
  background = false,
  className,
}: VideoEmbedProps) {
  if (!videoId) {
    return (
      <div
        data-asset={asset}
        data-asset-pending="true"
        data-asset-kind="video"
        data-asset-platform={platform}
        className={cn('w-full', className)}
      >
        <AssetPlaceholder
          asset={asset}
          label={label ?? `Video pending — ${title}`}
          aspect="video"
          kind="video"
        />
      </div>
    );
  }

  const src =
    platform === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${videoId}${background ? '?autoplay=1&mute=1&controls=0&loop=1&playlist=' + videoId : ''}`
      : `https://player.vimeo.com/video/${videoId}${background ? '?autoplay=1&muted=1&loop=1&background=1' : ''}?dnt=1`;

  return (
    <div
      data-asset={asset}
      data-asset-platform={platform}
      data-asset-resolved="true"
      className={cn(
        'relative aspect-video w-full overflow-hidden border border-okra-bright/20 bg-black',
        className,
      )}
    >
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
      />
    </div>
  );
}
