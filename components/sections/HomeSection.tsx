import Link from 'next/link';
import HeroButton from '@/components/HeroButton';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Atmosphere = 'none' | 'deep' | 'fire' | 'subtle';

interface HomeSectionProps {
  /** Stable anchor id. Used for in-page jumps and analytics. */
  id: string;
  /** Index label rendered in the eyebrow, e.g. "01" */
  index: string;
  /** Eyebrow microcopy, e.g. "The Statement" — the "/ 01 —" prefix is auto-prepended */
  eyebrow: string;
  /** Main heading (ALL-CAPS per brand). Rendered in font-oo-neureal, okra-bright, text-glow-bright. */
  heading: string;
  /** Larger one-line statement, white. */
  dek: string;
  /** Body copy. */
  children: React.ReactNode;
  /** Optional visual slot rendered on the right (or below on mobile). */
  visual?: React.ReactNode;
  /** Atmosphere / background treatment. */
  atmosphere?: Atmosphere;
  /** Layout direction. 'split' is image+text side-by-side on desktop, stacked on mobile. 'stacked' is full-width visual. */
  layout?: 'split' | 'stacked' | 'center';
  /** Optional CTA rendered below the body. */
  cta?: { label: string; href: string };
  /** Optional secondary text-only link rendered next to the CTA. */
  ctaSecondary?: { label: string; href: string };
  /** Decorative bottom rule. */
  bottomRule?: boolean;
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
 * The single, reusable layout primitive for the home page sections.
 *
 * Anatomy:
 *  - `<section>` with optional atmospheric background
 *  - Container with eyebrow, heading, dek, body, optional visual + CTA
 *  - Bottom rule (decorative thin gradient line)
 *
 * Why one component for all 8 sections:
 *  - Spacing, type scale, and atmosphere palette stay in lockstep
 *  - Reviewers can edit copy and rhythm in one pass
 *  - The page file (`app/page.tsx`) becomes a clean manifest of intent
 *
 * The component is a Server Component. It only uses `<Link>` and the
 * existing client `<HeroButton>` (which is already a thin client island).
 */
export default function HomeSection({
  id,
  index,
  eyebrow,
  heading,
  dek,
  children,
  visual,
  atmosphere = 'none',
  layout = 'split',
  cta,
  ctaSecondary,
  bottomRule = true,
}: HomeSectionProps) {
  const hasVisual = visual !== undefined;

  return (
    <section
      id={id}
      data-section-id={id}
      className="relative bg-black overflow-hidden py-32 md:py-48 lg:py-64"
    >
      {ATMOSPHERE_BG[atmosphere]}

      <div className="container-custom relative z-10">
        {/* Eyebrow row */}
        <div className="flex items-center gap-6 mb-8">
          <span className="text-[10px] uppercase tracking-[0.5em] text-okra-bright font-oo-neureal">
            / {index} — {eyebrow}
          </span>
          <div className="h-[1px] flex-1 max-w-[80px] bg-okra-bright/30" />
        </div>

        {layout === 'center' ? (
          // Center / full-width layout — visual renders full-bleed below text
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-oo-neureal leading-[0.85] tracking-tighter uppercase text-okra-bright text-glow-bright mb-10">
              {heading}
            </h2>
            <p className="text-2xl md:text-3xl text-white font-oo-neureal leading-snug font-light max-w-3xl mx-auto mb-12">
              {dek}
            </p>
            <div className="max-w-3xl mx-auto text-left md:text-center space-y-6 text-base md:text-lg text-white/55 font-oo-neureal leading-relaxed">
              {children}
            </div>
            {hasVisual && <div className="mt-16">{visual}</div>}
            {(cta || ctaSecondary) && (
              <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
                {cta && (
                  <HeroButton label={cta.label} href={cta.href} variant="cta" />
                )}
                {ctaSecondary && (
                  <Link
                    href={ctaSecondary.href}
                    className="text-sm uppercase tracking-[0.3em] text-okra-bright/70 hover:text-okra-bright transition-colors font-oo-neureal"
                  >
                    {ctaSecondary.label} →
                  </Link>
                )}
              </div>
            )}
          </div>
        ) : (
          // Split layout — heading + body on one side, visual on the other
          <div
            className={cn(
              'grid gap-16 lg:gap-24 items-start',
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
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-oo-neureal leading-[0.9] tracking-tighter uppercase text-okra-bright text-glow-bright mb-8">
                {heading}
              </h2>
              <p className="text-xl md:text-2xl text-white font-oo-neureal leading-snug font-light mb-10">
                {dek}
              </p>
              <div className="space-y-6 text-base md:text-lg text-white/55 font-oo-neureal leading-relaxed max-w-2xl">
                {children}
              </div>
              {(cta || ctaSecondary) && (
                <div className="mt-12 flex flex-col sm:flex-row items-start gap-6">
                  {cta && (
                    <HeroButton label={cta.label} href={cta.href} variant="cta" />
                  )}
                  {ctaSecondary && (
                    <Link
                      href={ctaSecondary.href}
                      className="self-center text-sm uppercase tracking-[0.3em] text-okra-bright/70 hover:text-okra-bright transition-colors font-oo-neureal"
                    >
                      {ctaSecondary.label} →
                    </Link>
                  )}
                </div>
              )}
            </div>

            {hasVisual && (
              <div
                className={cn(
                  'lg:col-span-5 lg:sticky lg:top-32',
                  layout === 'stacked' ? 'order-first' : '',
                )}
              >
                {visual}
              </div>
            )}
          </div>
        )}
      </div>

      {bottomRule && (
        <div
          aria-hidden
          className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-okra-bright/15 to-transparent"
        />
      )}
    </section>
  );
}
