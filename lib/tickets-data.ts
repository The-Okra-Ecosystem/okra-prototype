/**
 * OKRA Tickets Page Data — Venues & Organizers
 *
 * This file powers `/tickets` — a single source of truth for organizer and
 * venue ticket links, displayed on the public tickets page. The page also
 * consumes `lib/events-data.ts` to show each venue's upcoming shows.
 *
 * ────────────────────────────────────────────────────────────────────
 *  HOW TO UPDATE (live data workflow)
 * ────────────────────────────────────────────────────────────────────
 *  This data is "live" in the sense that any change to this file is
 *  reflected on the live site on the next deploy (Vercel rebuilds in
 *  ~30s on push). No build step, no CMS, no DB.
 *
 *  To add a venue:
 *    1. Add an entry to VENUES below.
 *    2. Drop a logo (square, ≥512×512) at public/images/venues/{slug}.webp
 *       (or update the `logo` field if you use a different path).
 *    3. Add the venue to `lib/events-data.ts` events for them to appear
 *       in the "Upcoming Shows" list on the tickets card.
 *    4. Commit + push. The site rebuilds automatically.
 *
 *  To mark a venue as inactive: set `active: false`. It will be hidden
 *  from the page but kept in the file for the record.
 *
 *  Future: if/when a CMS is adopted, swap the import in
 *  `app/tickets/page.tsx` to a build-time fetch — the shape stays the same.
 *
 * ────────────────────────────────────────────────────────────────────
 */

export interface VenueSocial {
  instagram?: string;
  soundcloud?: string;
  website?: string;
}

export interface Venue {
  /** URL-safe identifier used in logo paths and event cross-references. */
  slug: string;
  /** Display name. */
  name: string;
  /** City (e.g. "Basel", "Zürich"). */
  city: string;
  /** Canton (e.g. "Basel-Stadt", "Zürich"). */
  canton?: string;
  /** Country (defaults to "Switzerland"). */
  country?: string;
  /** Short description shown on the tickets card. */
  description: string;
  /** Path to logo asset (square ≥512×512 recommended). */
  logo: string;
  /** External ticket page (the main CTA target). */
  ticketUrl: string;
  /** Optional social links. */
  social?: VenueSocial;
  /** Address (street, postal code, city). */
  address?: string;
  /** Whether to show this venue on the page. */
  active: boolean;
  /**
   * Sort order (ascending). Lower numbers appear first. Use this to feature
   * partner venues ahead of one-offs.
   */
  featured?: number;
}

export const VENUES: Venue[] = [
  {
    slug: 'nordstern',
    name: 'Nordstern',
    city: 'Basel',
    canton: 'Basel-Stadt',
    country: 'Switzerland',
    description:
      'Riverside club and cultural hub in the heart of Basel. Home of the Nordstern Sessions and a rotating cast of underground residencies.',
    logo: '/images/venues/nordstern.webp',
    ticketUrl: 'https://nordstern.ch',
    address: 'Westquaistrasse 19, 4057 Basel',
    social: {
      instagram: 'nordsternbasel',
      website: 'nordstern.ch',
    },
    active: true,
    featured: 1,
  },
  {
    slug: 'elysia',
    name: 'Elysia',
    city: 'Basel',
    canton: 'Basel-Stadt',
    country: 'Switzerland',
    description:
      'Atmospheric venue hosting curated electronic lineups, label nights, and the Elysia Presents series.',
    logo: '/images/venues/elysia.webp',
    ticketUrl: 'https://elysia.ch',
    address: 'Klybeckstrasse 241, 4057 Basel',
    social: {
      instagram: 'elysia.basel',
      website: 'elysia.ch',
    },
    active: true,
    featured: 2,
  },
  {
    slug: 'kraftwerk',
    name: 'Kraftwerk',
    city: 'Zürich',
    canton: 'Zürich',
    country: 'Switzerland',
    description:
      'Industrial-grade venue for live electronics, immersive shows, and full-spectrum sound design.',
    logo: '/images/venues/kraftwerk.webp',
    ticketUrl: 'https://kraftwerk.ch',
    address: 'Hardstrasse 219, 8005 Zürich',
    social: {
      instagram: 'kraftwerkzurich',
      website: 'kraftwerk.ch',
    },
    active: true,
    featured: 3,
  },
  {
    slug: 'hek',
    name: 'HeK (Haus der Elektronischen Künste)',
    city: 'Basel',
    canton: 'Basel-Stadt',
    country: 'Switzerland',
    description:
      'House of Electronic Arts — a national institution for media art, exhibition, and performance. Hosts the Digital Boundaries series.',
    logo: '/images/venues/hek.webp',
    ticketUrl: 'https://hek.ch',
    address: 'Freilager-Platz 9, 4142 Münchenstein',
    social: {
      instagram: 'hek_basel',
      website: 'hek.ch',
    },
    active: true,
    featured: 4,
  },
  {
    slug: 'zurich-open-air',
    name: 'Zurich Open Air',
    city: 'Zürich',
    canton: 'Zürich',
    country: 'Switzerland',
    description:
      'One of Switzerland\u2019s premier festivals — multi-stage, multi-genre, and a perennial stop on the summer circuit.',
    logo: '/images/venues/zurich-open-air.webp',
    ticketUrl: 'https://zurichopenair.ch',
    social: {
      instagram: 'zurichopenair',
      website: 'zurichopenair.ch',
    },
    active: true,
  },
  {
    slug: 'bad-bonn',
    name: 'Bad Bonn Kilbi',
    city: 'Düdingen',
    canton: 'Fribourg',
    country: 'Switzerland',
    description:
      'Three-day DIY festival in a small Fribourg town. Cult lineups, cult crowd, and an annual pilgrimage for the underground faithful.',
    logo: '/images/venues/bad-bonn.webp',
    ticketUrl: 'https://badbonn.ch',
    address: 'Bonnstrasse 17, 3186 Düdingen',
    social: {
      instagram: 'badbonn.ch',
      website: 'badbonn.ch',
    },
    active: true,
  },
  {
    slug: 'okra-tickets',
    name: 'OKRA Direct',
    city: 'Basel',
    canton: 'Basel-Stadt',
    country: 'Switzerland',
    description:
      'OKRA-curated takeover shows, panel talks, and member-only events. Tickets released first to the newsletter list.',
    logo: '/images/logos/okra-collective.svg',
    ticketUrl: 'mailto:katie@weareokra.ch?subject=Ticket%20Inquiry',
    social: {
      instagram: 'weareokra',
      website: 'okra.ecosystem',
    },
    active: true,
  },
];

/** Active venues, sorted with `featured` first, then alphabetical. */
export const ACTIVE_VENUES: Venue[] = VENUES
  .filter((v) => v.active)
  .sort((a, b) => {
    if (a.featured != null && b.featured != null) return a.featured - b.featured;
    if (a.featured != null) return -1;
    if (b.featured != null) return 1;
    return a.name.localeCompare(b.name);
  });
