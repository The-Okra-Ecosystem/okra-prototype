'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

interface HeroButtonProps {
  /** Visible label of the button. */
  label: string;
  /** Target URL. Internal route (e.g. "/contact") or external (e.g. "https://..."). */
  href: string;
  /**
   * Visual style. `premium` matches the `ClimaxCTA` button (border-glow,
   * scale on hover, fire→bright color transition). `cta` is the more
   * compact rounded-pill used by the Bookings section.
   * @default 'premium'
   */
  variant?: 'premium' | 'cta';
  /**
   * When true, the button shows its full "is-scrolled-active" glow only
   * while it is in the user's viewport center. Matches the ClimaxCTA
   * scroll-active behaviour. Set to false to keep the button always bright.
   * @default true
   */
  activeOnView?: boolean;
  /** Open the link in a new tab. Auto-detected for absolute URLs. */
  external?: boolean;
  /** Optional icon or trailing element rendered after the label. */
  trailing?: React.ReactNode;
  /** Additional classes appended to the underlying button. */
  className?: string;
}

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * The OKRA hero CTA. The same `btn-premium` styling as the home-page
 * `ClimaxCTA` "Initialize Connection" button, lifted into a reusable
 * component so every hero (frame-film + legacy) ends with a consistent
 * call-to-action.
 *
 * Why a separate component:
 *  - The button is shared by 7 heroes. Keeping the markup, motion, and
 *    scroll-active logic in one place prevents drift between copies.
 *  - The `premium` / `cta` variant switch matches the two CTAs the
 *    design system has settled on: rectangular with border-glow for big
 *    moments, pill for tight horizontal sections.
 *  - `activeOnView` mirrors `ClimaxCTA`'s `is-scrolled-active` toggle so
 *    the same "lights up when you actually look at it" feel works in
 *    sticky hero contexts.
 *
 * Used by:
 *  - /              (home)              → "Initialize Connection" → /contact
 *  - /artists       (frame-film hero)   → "Explore the Roster"    → /artists#roster
 *  - /events        (frame-film hero)   → "Tickets"               → /tickets
 *  - /about         (legacy hero)       → "Our Story"             → /about#story
 *  - /ecosystem     (legacy hero)       → "Join the Network"      → /contact
 *  - /blog          (legacy hero)       → "Read the Field Notes"  → /blog
 *  - /contact       (legacy hero)       → "Bookings / Press"      → mailto:
 */
export default function HeroButton({
  label,
  href,
  variant = 'premium',
  activeOnView = true,
  external,
  trailing,
  className = '',
}: HeroButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-30% 0px -30% 0px' });

  const isExternal =
    external ?? (/^https?:\/\//i.test(href) || href.startsWith('mailto:'));
  const isActive = activeOnView ? inView : true;

  const baseClass =
    variant === 'premium' ? 'btn-premium' : 'badge-cta text-sm px-6 py-3';
  const finalClass = [
    baseClass,
    isActive ? 'is-scrolled-active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const linkProps = isExternal
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: easeOutExpo }}
    >
      <Link href={href} className={finalClass} {...linkProps}>
        <span className="relative z-10 flex items-center gap-2">
          {label}
          {trailing}
        </span>
      </Link>
    </motion.div>
  );
}
