import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ARTISTS } from '@/lib/artist-data';
import { EVENTS } from '@/lib/events-data';
import { BASE_URL } from '@/lib/constants';
import DiscographySection from '@/components/DiscographySection';

export async function generateStaticParams() {
  return ARTISTS.map((artist) => ({ slug: artist.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);
  if (!artist) return { title: 'Not Found' };
  return {
    title: `${artist.name} | OKRA Roster`,
    description: artist.bio,
    openGraph: {
      title: `${artist.name} | OKRA Roster`,
      description: artist.bio,
      images: artist.photo ? [{ url: artist.photo }] : [],
    },
  };
}

export default async function ArtistProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);
  if (!artist) notFound();

  const sameAs = []
  if (artist.social?.instagram) sameAs.push(`https://instagram.com/${artist.social.instagram}`)
  if (artist.social?.soundcloud) sameAs.push(`https://soundcloud.com/${artist.social.soundcloud}`)
  if (artist.social?.website) sameAs.push(`https://${artist.social.website}`)

  const musicGroupJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: artist.name,
    description: artist.bio,
    image: artist.photo,
    url: `${BASE_URL}/artists/${artist.slug}`,
    sameAs,
    foundingLocation: { '@type': 'Place', name: 'Basel, Switzerland' },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'OKRA', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Artists', item: `${BASE_URL}/artists` },
      { '@type': 'ListItem', position: 3, name: artist.name, item: `${BASE_URL}/artists/${artist.slug}` },
    ],
  }

  return (
    <div className="min-h-screen bg-black">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(musicGroupJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        {artist.photo ? (
          <Image
            src={artist.photo}
            alt={artist.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-okra-deep/20">
            <span className="text-okra-bright/40 font-oo-neureal text-lg">IMAGE PENDING</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Back link */}
        <Link
          href="/artists"
          className="badge badge-fire text-[10px] px-4 py-2 absolute top-28 left-6 md:left-[6%] lg:left-[8%] z-20"
        >
          ← Roster
        </Link>

        {/* Label badge on photo */}
        <div className="absolute bottom-8 left-6 md:left-[6%] lg:left-[8%] z-20">
          <span className="badge badge-bright px-3 py-1.5">
            {artist.label}
          </span>
        </div>
      </section>

      {/* Content Section */}
      <section className="container-custom py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-oo-neureal uppercase tracking-tighter text-okra-bright text-glow-bright leading-[0.9] mb-4">
            {artist.name}
            <span className="block text-okra-bright/60 text-glow-none text-lg md:text-xl lg:text-2xl tracking-[0.3em] mt-2">
              Profile
            </span>
          </h1>

          <div className="w-full h-[1px] bg-okra-bright/20 my-8" />

          <p className="text-sm md:text-base text-white/60 font-oo-neureal leading-relaxed uppercase tracking-[0.1em] mb-10 max-w-2xl">
            {artist.bio}
          </p>

          {/* Discography */}
          {artist.discography && artist.discography.length > 0 && (
            <DiscographySection tracks={artist.discography} />
          )}

          {/* Artist Events */}
          {(() => {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const artistEvents = EVENTS
              .filter((e) => e.artists.includes(artist.slug) && new Date(e.date + 'T00:00:00') >= today)
              .sort((a, b) => a.date.localeCompare(b.date))

            if (artistEvents.length === 0) return null

            const fmt = (iso: string) => {
              const d = new Date(iso + 'T00:00:00')
              const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
              return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
            }

            return (
              <div className="mb-10">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-okra-bright/50 mb-4 font-oo-neureal">
                  Upcoming Shows
                </h3>
                <div className="space-y-3">
                  {artistEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 text-xs font-oo-neureal">
                      <span className="text-okra-bright/70 tracking-[0.15em] shrink-0 w-28">
                        {fmt(event.date)}
                      </span>
                      <span className="text-white/60 tracking-[0.1em] truncate">
                        {event.venue}, {event.city}
                      </span>
                      {event.ticketUrl && (
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[9px] uppercase tracking-[0.3em] text-okra-fire hover:text-okra-bright transition-colors duration-300 shrink-0 ml-auto"
                        >
                          Tickets →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}

          {/* Social Links */}
          {artist.social && (
            <div className="flex flex-wrap gap-3 mb-10">
              {artist.social.instagram && (
                <a
                  href={`https://instagram.com/${artist.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-fire text-[10px] px-4 py-2"
                >
                  Instagram
                </a>
              )}
              {artist.social.soundcloud && (
                <a
                  href={`https://soundcloud.com/${artist.social.soundcloud}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-fire text-[10px] px-4 py-2"
                >
                  SoundCloud
                </a>
              )}
              {artist.social.website && (
                <a
                  href={`https://${artist.social.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-fire text-[10px] px-4 py-2"
                >
                  Website
                </a>
              )}
            </div>
          )}

          {/* Book CTA */}
          <a
            href={`mailto:katie@weareokra.ch?subject=${encodeURIComponent(`I want to book ${artist.name}`)}`}
            className="badge-cta text-sm px-6 py-3"
          >
            Book →
          </a>

          <Link
            href="/artists"
            className="text-[10px] uppercase tracking-[0.3em] text-okra-fire/60 hover:text-okra-bright active:text-okra-bright transition-all duration-300 mt-16 inline-block"
          >
            ← Back to Roster
          </Link>
        </div>
      </section>
    </div>
  );
}
