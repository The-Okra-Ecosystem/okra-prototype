import ScrollFrameFilm from "@/components/ScrollFrameFilm";
import RosterGrid from "@/components/RosterGrid";
import { FONCE_HERO_FRAMES } from "@/lib/fonce-hero-frames";

export default function ArtistsPage() {
  return (
    <div className="min-h-screen">
      <ScrollFrameFilm
        frames={FONCE_HERO_FRAMES}
        ariaLabel="Roster Division scroll reveal"
        altText="OKRA Roster Division scroll reveal"
        title={
          <>
            Okra<br />
            Roster Division
          </>
        }
        subtitle="Meet the Vangard: Elite rulebreakers actively re-coding the global dancfloor!"
        button={{ label: 'Explore the Roster', href: '/artists#roster' }}
      />

      <div className="h-20 md:h-32" />

      <div id="roster">
        <RosterGrid />
      </div>

      <div className="h-24" />

      {/* Bookings Section */}
      <section className="container-custom pb-32 pt-0">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-oo-neureal uppercase tracking-tighter text-okra-bright text-glow-bright">
            Bookings
          </h2>
          <p className="text-okra-bright text-glow-breathe font-oo-neureal uppercase tracking-[0.15em] text-xs leading-relaxed">
            For booking inquiries, collaborations, and all artist-related requests.
          </p>
          <a
            href="mailto:katie@weareokra.ch?subject=Booking%20Inquiry"
            className="badge-cta text-sm px-6 py-3"
          >
            katie@weareokra.ch
            <span className="text-lg leading-none">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
