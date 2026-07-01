import Link from 'next/link';
import HeroButton from '@/components/HeroButton';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Atmosphere = 'none' | 'deep' | 'fire' | 'subtle';

interface EcosystemDeepDiveProps {
  /** Stable anchor id, also used to compose the gallery jump link. */
  id: string;
  /** Section title (ALL-CAPS per brand). */
  heading: string;
  /** Larger one-line statement, white. */
  dek: string;
  /** Body copy. */
  children: React.ReactNode;
  /** Optional visual element. */
  visual?: React.ReactNode;
  /** Atmospheric background. */
  atmosphere?: Atmosphere;
  /** When provided, renders a "View in the gallery" link under the body. */
  galleryAnchor?: string;
  /** Label override for the gallery link. */
  galleryLabel?: string;
  /** Optional CTA rendered above the gallery link. */
  cta?: { label: string; href: string };
  /** Decorative top rule. */
  topRule?: boolean;
}

const ATMOSPHERE_BG: Record<Atmosphere, React.ReactNode> = {
  none: null,
  deep: (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-okra-deep/30 rounded-full blur-[160px] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,60,0,0.18)_0%,transparent_75%)]" />
    </div>
  ),
  fire: (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vh] bg-okra-fire/[0.06] rounded-full blur-[160px] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(221,62,0,0.08)_0%,transparent_70%)]" />
    </div>
  ),
  subtle: (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,60,0,0.12)_0%,transparent_60%)]" />
    </div>
  ),
};

/**
 * The single, reusable layout primitive for the ecosystem page's deep-dive
 * sections. Mirrors the structure of `HomeSection` but with:
 *  - a number label instead of an eyebrow
 *  - an optional inline gallery link
 *  - slightly more relaxed vertical spacing
 */
export default function EcosystemDeepDive({
  id,
  heading,
  dek,
  children,
  visual,
  atmosphere = 'none',
  galleryAnchor,
  galleryLabel = 'See this in the gallery',
  cta,
  topRule = true,
}: EcosystemDeepDiveProps) {
  const hasVisual = visual !== undefined;
  const galleryHref = galleryAnchor ? `/gallery#${galleryAnchor}` : null;

  return (
    <section
      id={id}
      data-section-id={id}
      className="relative bg-black overflow-hidden py-24 md:py-36 lg:py-48"
    >
      {ATMOSPHERE_BG[atmosphere]}

      {topRule && (
        <div
          aria-hidden
          className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-okra-bright/15 to-transparent"
        />
      )}

      <div className="container-custom relative z-10">
        <div
          className={cn(
            'grid gap-12 lg:gap-20 items-start',
            hasVisual
              ? 'grid-cols-1 lg:grid-cols-12'
              : 'grid-cols-1 max-w-4xl mx-auto',
          )}
        >
          <div
            className={cn(
              hasVisual ? 'lg:col-span-7' : '',
              'text-left',
            )}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.5em] text-okra-bright/70 font-oo-neureal">
                {id.toUpperCase()}
              </span>
              <div className="h-[1px] w-12 bg-okra-bright/30" />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-oo-neureal leading-[0.9] tracking-tighter uppercase text-okra-bright text-glow-bright mb-6">
              {heading}
            </h2>
            <p className="text-lg md:text-xl text-white font-oo-neureal leading-snug font-light mb-8">
              {dek}
            </p>
            <div className="space-y-5 text-base md:text-lg text-white/55 font-oo-neureal leading-relaxed max-w-2xl">
              {children}
            </div>

            {(cta || galleryHref) && (
              <div className="mt-10 flex flex-col sm:flex-row items-start gap-6">
                {cta && (
                  <HeroButton label={cta.label} href={cta.href} variant="cta" />
                )}
                {galleryHref && (
                  <Link
                    href={galleryHref}
                    className="self-center text-sm uppercase tracking-[0.3em] text-okra-bright/70 hover:text-okra-bright transition-colors font-oo-neureal"
                  >
                    {galleryLabel} →
                  </Link>
                )}
              </div>
            )}
          </div>

          {hasVisual && (
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              {visual}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
