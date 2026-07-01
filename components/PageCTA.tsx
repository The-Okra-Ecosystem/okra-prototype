import Link from 'next/link';
import HeroButton from './HeroButton';

interface PageCTAProps {
  /** Eyebrow text above the headline (e.g. "/ Stay Connected"). */
  eyebrow?: string;
  /** Headline. Rendered in font-oo-neureal okra-bright with text-glow-bright. */
  title: string;
  /** Supporting copy below the headline. */
  description?: string;
  /** Button label. */
  buttonLabel: string;
  /** Button href. */
  buttonHref: string;
  /** Open button href in a new tab. Auto-detected for absolute URLs. */
  external?: boolean;
  /** Optional trailing element on the button (e.g. an arrow). */
  trailing?: React.ReactNode;
}

/**
 * Page-level CTA block, placed at the bottom of pages that don't have a
 * dedicated booking form. Matches the artists `Bookings` section visually
 * (max-w-xl, centered on tablet+, text-glow-bright headline, text-glow-breathe
 * description, `badge-cta` button) so every bottom-of-page CTA reads as the
 * same component.
 *
 * Centering behaviour (per design rule):
 *  - Mobile (default): left-aligned editorial style
 *  - Tablet+ (`md:`): centered via `md:text-center md:mx-auto md:items-center`
 *
 * Used by:
 *  - /events    (Tickets → /tickets)
 *  - /about     (Connect → /contact)
 *  - /ecosystem (Join → /contact)
 *  - /blog      (Subscribe → /contact)
 */
export default function PageCTA({
  eyebrow,
  title,
  description,
  buttonLabel,
  buttonHref,
  external,
  trailing,
}: PageCTAProps) {
  return (
    <section className="container-custom pb-32 pt-16">
      <div className="max-w-xl md:mx-auto md:text-center space-y-4">
        {eyebrow && (
          <span className="block text-[10px] uppercase tracking-[0.3em] text-white/30 font-oo-neureal">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl md:text-5xl font-oo-neureal uppercase tracking-tighter text-okra-bright text-glow-bright">
          {title}
        </h2>
        {description && (
          <p className="text-okra-bright text-glow-breathe font-oo-neureal uppercase tracking-[0.15em] text-xs leading-relaxed">
            {description}
          </p>
        )}
        <div className="pt-4 md:flex md:justify-center">
          {external ? (
            <Link
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="badge-cta text-sm px-6 py-3"
            >
              <span className="flex items-center gap-2">
                {buttonLabel}
                {trailing}
              </span>
            </Link>
          ) : (
            <HeroButton
              label={buttonLabel}
              href={buttonHref}
              variant="cta"
              activeOnView={false}
              trailing={trailing}
            />
          )}
        </div>
      </div>
    </section>
  );
}
