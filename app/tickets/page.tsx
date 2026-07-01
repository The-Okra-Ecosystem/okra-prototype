import Image from 'next/image';
import ScrollFrameFilm from '@/components/ScrollFrameFilm';
import { ACTIVE_VENUES, type Venue } from '@/lib/tickets-data';
import { EVENTS, type Event } from '@/lib/events-data';
import { ARSENIC_FONCE_FRAMES } from '@/lib/arsenic-fonce-frames';

export const metadata = {
  title: 'Tickets | OKRA Ecosystem',
  description:
    'Direct links to organizer and venue ticket pages, kept in sync with each OKRA Ecosystem show.',
  openGraph: {
    title: 'Tickets | OKRA Ecosystem',
    description:
      'Direct links to organizer and venue ticket pages, kept in sync with each OKRA Ecosystem show.',
  },
}

function VenueLogo({ venue }: { venue: Venue }) {
  // Until real venue logos are added, render a stylised monogram placeholder
  // that matches the OKRA design system. The moment a real logo lands at
  // /public/images/venues/{slug}.webp, this component picks it up automatically.
  const initial = venue.name.replace(/[^A-Za-z0-9]/g, '').charAt(0).toUpperCase();

  return (
    <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden border border-okra-bright/30 bg-okra-deep/40 flex items-center justify-center">
      <Image
        src={venue.logo}
        alt={`${venue.name} logo`}
        fill
        className="object-cover"
        sizes="64px"
      />
      <span
        className="absolute inset-0 flex items-center justify-center text-okra-bright font-oo-neureal text-2xl"
        aria-hidden
      >
        {initial}
      </span>
    </div>
  );
}

function VenueCard({ venue }: { venue: Venue }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = EVENTS
    .filter(
      (e: Event) => e.venue === venue.name && new Date(e.date + 'T00:00:00') >= today
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  const fmt = (iso: string) => {
    const d = new Date(iso + 'T00:00:00');
    const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <article className="group relative border border-white/5 bg-black/40 hover:border-okra-bright/30 transition-colors duration-500 p-6 md:p-8 flex flex-col gap-6">
      {/* Top row: logo + name + city */}
      <header className="flex items-start gap-4">
        <VenueLogo venue={venue} />
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl md:text-3xl font-oo-neureal uppercase tracking-tighter text-okra-bright text-glow-bright leading-tight truncate">
            {venue.name}
          </h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-okra-bright/60 font-oo-neureal mt-1">
            {venue.city}
            {venue.canton ? `, ${venue.canton}` : ''}
            {venue.country ? ` \u2014 ${venue.country}` : ''}
          </p>
        </div>
      </header>

      {/* Description */}
      <p className="text-sm text-white/60 font-oo-neureal leading-relaxed uppercase tracking-[0.1em]">
        {venue.description}
      </p>

      {/* Upcoming shows (if any) */}
      {upcoming.length > 0 && (
        <div className="border-t border-white/5 pt-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-okra-bright/50 font-oo-neureal mb-3">
            Upcoming Shows
          </h4>
          <ul className="space-y-2">
            {upcoming.slice(0, 3).map((ev) => (
              <li
                key={ev.id}
                className="flex items-center gap-3 text-[11px] font-oo-neureal uppercase tracking-[0.15em]"
              >
                <span className="text-okra-bright/70 shrink-0 w-20">
                  {fmt(ev.date)}
                </span>
                <span className="text-white/60 truncate flex-1">{ev.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Social pills + address */}
      <div className="mt-auto space-y-3">
        {venue.address && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-oo-neureal leading-relaxed">
            {venue.address}
          </p>
        )}
        {venue.social && (
          <div className="flex flex-wrap gap-2">
            {venue.social.instagram && (
              <a
                href={`https://instagram.com/${venue.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="badge badge-fire text-[10px] px-3 py-1.5"
              >
                Instagram
              </a>
            )}
            {venue.social.soundcloud && (
              <a
                href={`https://soundcloud.com/${venue.social.soundcloud}`}
                target="_blank"
                rel="noopener noreferrer"
                className="badge badge-fire text-[10px] px-3 py-1.5"
              >
                SoundCloud
              </a>
            )}
            {venue.social.website && (
              <a
                href={`https://${venue.social.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="badge badge-fire text-[10px] px-3 py-1.5"
              >
                Website
              </a>
            )}
          </div>
        )}

        {/* Primary CTA */}
        <a
          href={venue.ticketUrl}
          target={venue.ticketUrl.startsWith('http') || venue.ticketUrl.startsWith('mailto:') ? '_blank' : undefined}
          rel={venue.ticketUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="badge-cta text-sm px-6 py-3 inline-flex w-full md:w-auto justify-center"
        >
          {venue.ticketUrl.startsWith('mailto:') ? 'Email for Tickets' : 'Get Tickets'}
          <span className="text-lg leading-none">→</span>
        </a>
      </div>
    </article>
  );
}

export default function TicketsPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Subtle background gradient — uniform with other pages */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-okra-deep/30 rounded-full blur-[160px] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,60,0,0.15)_0%,transparent_80%)]" />
      </div>

      {/* Hero — scroll-driven film, same protocol as /, /about, /artists, /events. */}
      <ScrollFrameFilm
        frames={ARSENIC_FONCE_FRAMES}
        ariaLabel="Tickets scroll reveal"
        altText="OKRA Tickets scroll reveal"
        position="top-cta-bottom"
        title="TICKETS"
        subtitle="Direct links to organizer and venue ticket pages, kept in sync with each show."
        button={{ label: 'Browse Venues', href: '#venues' }}
      />

      {/* Venue grid */}
      <section id="venues" className="container-custom py-20 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {ACTIVE_VENUES.map((venue) => (
            <VenueCard key={venue.slug} venue={venue} />
          ))}
        </div>

        {/* Footnote — update instructions */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-oo-neureal">
            Listings updated in <code className="text-okra-bright/70">lib/tickets-data.ts</code> &middot; deploys to live on push
          </p>
        </div>
      </section>
    </div>
  );
}
