import Image from 'next/image';
import Link from 'next/link';
import Hero from "@/components/Hero";
import EcosystemMap from "@/components/EcosystemMap";
import PageCTA from "@/components/PageCTA";
import EcosystemDeepDive from "@/components/sections/EcosystemDeepDive";
import CareerReimagined from "@/components/CareerReimagined";
import VideoEmbed from "@/components/VideoEmbed";
import { MEDIA_MANIFEST } from "@/lib/media-manifest";
import { BASE_URL } from "@/lib/constants";

export const metadata = {
  title: 'Ecosystem',
  description:
    'A working system for the underground — the people, the rooms, the rooms inside the rooms. Okra is a Basel-based ecosystem of artists, organisers, mentors, and crew.',
};

// ----- 01 WE ARE OKRA (DEEP) ---------------------------------------------
function DeepWeAreOkra() {
  return (
    <EcosystemDeepDive
      id="we-are-okra"
      heading="We Are Okra"
      dek="The collective, in plain language."
      atmosphere="subtle"
      galleryAnchor="collective"
      visual={
        // 127.1KB · well under 800KB cap · from many_frames/frame_045.webp
        <div className="relative aspect-video w-full overflow-hidden border border-okra-bright/20">
          <Image
            src={MEDIA_MANIFEST.ECOSYSTEM.WE_ARE_OKRA}
            alt="The collective — frame from the rolling sequence"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      }
    >
      <p>
        Okra is a Switzerland-registered, Basel-based ecosystem of independent artists,
        curators, organisers, sound engineers, filmmakers, and writers, working together
        under a shared operational and ethical code. We are the smallest unit of the
        system — the people.
      </p>
      <p>
        The collective includes the <Link href="/artists" className="body-link">roster</Link> (the artists
        we represent long-term), the <em>operators</em> (the venues, festivals, and rooms
        we programme in), the <em>crew</em> (the engineers, door staff, photographers, and
        producers who do the work), and the <em>mentorship network</em> (the artists who
        came before, teaching the ones who are coming now).
      </p>
    </EcosystemDeepDive>
  );
}

// ----- 02 MOVING IN THE MARGINS (DEEP) -----------------------------------
function DeepMargins() {
  return (
    <EcosystemDeepDive
      id="moving-in-the-margins"
      heading="Moving in the Margins"
      dek="The mainstream was never going to make room. So we made our own room, and we left the door open."
      atmosphere="deep"
      galleryAnchor="margins"
      visual={
        // 31.1KB · well under 800KB cap · from foncé-hero/frame_080.webp
        <div className="relative aspect-video w-full overflow-hidden border border-okra-bright/20">
          <Image
            src={MEDIA_MANIFEST.ECOSYSTEM.MARGINS}
            alt="Documentary series — Foncé in the underground"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      }
    >
      <p>
        The margins are not a metaphor. They are the geography of a working scene. The
        margins are the Tuesday night in February. The margins are the rider that gets
        read as a joke. The margins are the lineups with no women, the press that only
        covers the headliner, the venues that close because the rent is up. The margins
        are also where the actual work is happening, has always been happening, and will
        continue to happen long after the algorithm has forgotten the trend.
      </p>
      <p>
        Okra operates in the margins on purpose. We are not a stepping stone to the
        mainstream. We are a parallel infrastructure. The artists we work with are not
        on their way somewhere else — they are already home.
      </p>
      <p>
        <strong className="text-okra-bright/80 font-normal">Why this matters operationally:</strong> the
        margins are where the work is unprotected, the contracts are weakest, the
        hospitality is thinnest, and the artists are most at risk of burnout,
        underpayment, or worse. Okra exists to make the margins livable — to bring
        infrastructure, care, and standards to a part of the scene that has been told to
        wait for permission.
      </p>
    </EcosystemDeepDive>
  );
}

// ----- 03 UNDERSTANDING THE INDUSTRY (DEEP) ------------------------------
function DeepIndustry() {
  return (
    <EcosystemDeepDive
      id="understanding-the-industry"
      heading="Understanding the Industry"
      dek="We do not romanticise it. We rebuild the parts that do not serve the work."
      atmosphere="fire"
      galleryAnchor="industry"
      visual={
        // 447.8KB · under 800KB cap · longlake/landscape/IMG_3122.JPG
        <div className="relative aspect-video w-full overflow-hidden border border-okra-bright/20">
          <Image
            src={MEDIA_MANIFEST.ECOSYSTEM.INDUSTRY}
            alt="The room — Long Lake landscape"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      }
    >
      <p>
        The music industry, as it exists in 2026, runs on a small set of assumptions
        that no longer serve anyone except the people who wrote them. We have spent five
        years learning which parts of the industry are still functional, which parts are
        actively harmful, and which parts can be replaced by a smaller, more careful
        system run by the artists themselves.
      </p>

      <div className="grid sm:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-xs uppercase tracking-[0.4em] text-okra-fire/80 font-oo-neureal mb-3">
            / Stopped accepting
          </h3>
          <ul className="space-y-2 text-base text-white/55 font-oo-neureal">
            <li>— A hospitality rider is a negotiation</li>
            <li>— A fee is paid net-90 because that is how it has always been</li>
            <li>— An algorithm knows what a room wants</li>
            <li>— The artist&rsquo;s job ends when the set does</li>
            <li>— &ldquo;Exposure&rdquo; is a currency</li>
            <li>— A festival booking one woman is doing diversity work</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal mb-3">
            / Built instead
          </h3>
          <ul className="space-y-2 text-base text-white/55 font-oo-neureal">
            <li>— Roster model: fees clear within 7 days of invoice</li>
            <li>— Mentorship network that pays both mentor and mentee</li>
            <li>— Booking system that publishes its terms, not just its roster</li>
            <li>— Film unit that documents the rooms the industry ignores</li>
            <li>— Code of conduct for every room Okra programmes in</li>
          </ul>
        </div>
      </div>
    </EcosystemDeepDive>
  );
}

// ----- 04 WHAT MATTERS (DEEP) --------------------------------------------
function DeepWhatMatters() {
  const values = [
    {
      word: 'Care',
      body: 'Every person who works with Okra — artist, engineer, bartender, security, photographer — is paid, fed, rested, and treated as a peer. We have turned down bookings where the host could not guarantee this.',
    },
    {
      word: 'Craft',
      body: 'We work with artists who are still obsessed. We are not interested in the artist who has optimised themselves out of the work.',
    },
    {
      word: 'Risk',
      body: 'Okra books the artist we have not heard of yet. We commission the film we do not know how to make yet. The risk is the point.',
    },
    {
      word: 'Dignity',
      body: 'Fair fees, honored riders, paid rehearsals, transparent accounting. Every time, for every project, for every artist, for every crew member.',
    },
    {
      word: 'Transparency',
      body: 'We publish our booking terms. We publish our rider baseline. We publish our code of conduct. We admit when we are wrong, publicly, in writing.',
    },
    {
      word: 'Rest',
      body: 'Burnout is not a credential. We pace the work, we schedule the gaps, we pay for the rehearsals, we do not run a 90-show year.',
    },
    {
      word: 'Rage, used well',
      body: 'The industry is broken in ways that matter. We are not neutral about it. We are angry, specifically, and the anger is what funds the rebuild.',
    },
  ];

  return (
    <EcosystemDeepDive
      id="what-matters"
      heading="What Matters"
      dek="The non-negotiables, in long form."
      atmosphere="deep"
      galleryAnchor="code"
    >
      <ul className="space-y-5">
        {values.map((v) => (
          <li key={v.word} className="flex flex-col sm:flex-row gap-2 sm:gap-8 sm:items-baseline">
            <span className="text-okra-bright font-oo-neureal text-base md:text-lg tracking-tight whitespace-nowrap min-w-[10rem]">
              — {v.word}
            </span>
            <span className="text-white/55 font-oo-neureal leading-relaxed">
              {v.body}
            </span>
          </li>
        ))}
      </ul>
    </EcosystemDeepDive>
  );
}

// ----- 05 MENTORING (DEEP) ------------------------------------------------
function DeepMentoring() {
  const curriculum = [
    { num: '01', name: 'The Money', body: 'Fees, contracts, splits, advance structures, late-payment law in CH/EU, gross vs net, guarantee vs door deal.' },
    { num: '02', name: 'The Room', body: 'How to read a promoter, a crowd, a sound engineer; what to do when the room is empty, what to do when the room is full and the system is failing.' },
    { num: '03', name: 'The Politics', body: 'How festivals actually book, how to be on a lineup that is not a token, how to say no to a room that does not deserve you.' },
    { num: '04', name: 'The Mind', body: 'The long psychology of a career, the artist-specific burnout pattern, the version of success that is sustainable.' },
    { num: '05', name: 'The Art', body: 'Process, blocks, finishing, the discipline of a 10-year practice, the role of the mentor&rsquo;s own work in the conversation.' },
  ];

  return (
    <EcosystemDeepDive
      id="mentoring"
      heading="Mentoring"
      dek="A formal network, not a favour economy."
      atmosphere="subtle"
      galleryAnchor="mentorship"
      cta={{ label: 'Apply for the cohort', href: '/contact?intent=mentor' }}
    >
      <p>
        The Okra mentorship network is the part of the ecosystem where the lessons we
        have already paid for stop being a private tax and start being a shared
        curriculum. The network runs in cohorts of 6–10 emerging artists, paired with
        1–2 established mentors from the roster or wider network, for a 6-month
        structured programme.
      </p>

      <div className="mt-8 border-t border-okra-bright/20 pt-8">
        <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal mb-6">
          / Curriculum — typical cohort cycle
        </h3>
        <ul className="space-y-4">
          {curriculum.map((c) => (
            <li key={c.num} className="flex gap-4 sm:gap-6">
              <span className="text-okra-bright/60 font-oo-neureal text-sm tracking-widest min-w-[2.5rem] pt-1">
                {c.num}
              </span>
              <div>
                <h4 className="text-okra-bright font-oo-neureal uppercase tracking-tight text-base">
                  {c.name}
                </h4>
                <p
                  className="text-white/55 font-oo-neureal leading-relaxed mt-1"
                  dangerouslySetInnerHTML={{ __html: c.body }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-6 text-sm text-white/50 font-oo-neureal">
        <p>
          <span className="text-okra-bright/80">Who pays:</span> Everyone. Mentors are paid
          their day rate. Mentees receive a small stipend and their cohort fees are waived.
        </p>
        <p>
          <span className="text-okra-bright/80">Who it is for:</span> Any artist in the Okra
          ecosystem, by application. We prioritise artists from the margins the rest of
          the industry is still learning to name.
        </p>
      </div>
    </EcosystemDeepDive>
  );
}

// ----- 06 CURATING (DEEP) -------------------------------------------------
function DeepCurating() {
  return (
    <EcosystemDeepDive
      id="curating"
      heading="Curating"
      dek="The cut is the love letter."
      atmosphere="subtle"
      galleryAnchor="curation"
      visual={
        // 378.1KB — well under 800KB cap. Good for a roster thumbnail.
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-okra-bright/20">
          <Image
            src={MEDIA_MANIFEST.ARTISTS.SAHARAA}
            alt="Curated roster"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      }
      cta={{ label: 'Meet the roster', href: '/artists' }}
    >
      <p>
        Okra curates three things, and the curation is the most visible signature of the
        ecosystem. Where the roster is the long-form relationship, the curation is the
        public argument we make about what the work is.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal mb-2">
            1. The Roster
          </h3>
          <p className="text-white/55 font-oo-neureal leading-relaxed">
            The artists we represent long-term. The roster is small on purpose. The roster
            is the answer to the question: <em>who do we believe in, for ten years,
            regardless of what the algorithm is doing this quarter?</em> The roster is
            reviewed annually. Departures are graceful. Arrivals are slow.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal mb-2">
            2. The Lineups
          </h3>
          <p className="text-white/55 font-oo-neureal leading-relaxed">
            The nights we programme, from the underground basement in Basel to the
            mountaintop takeover at Laax, to the international festival slot. Every
            lineup is built with intention — genre, identity, geography, and risk are all
            variables. We have turned down slots where the festival would only book one
            of us, or where the slot was the 14:00 Sunday graveyard. We have asked
            festivals to redesign their lineups. Sometimes they listen.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal mb-2">
            3. The Catalogue
          </h3>
          <p className="text-white/55 font-oo-neureal leading-relaxed">
            The records, films, and editorial we put our name on. The catalogue is the
            archive of the system. The catalogue is slow on purpose. We release records
            because the record is finished, not because the quarter is open. We
            commission films because the story needs telling, not because the brief is
            hot.
          </p>
        </div>
      </div>

      <p className="mt-8 text-okra-bright/80 font-oo-neureal">
        The cut, in one line: <em>Saying no is an act of love. So is saying yes to the right unknown.</em>
      </p>
    </EcosystemDeepDive>
  );
}

// ----- 07 MUSIC (DEEP) ----------------------------------------------------
function DeepMusic() {
  return (
    <EcosystemDeepDive
      id="music"
      heading="Music"
      dek="The spine of the system."
      atmosphere="deep"
      galleryAnchor="music"
      cta={{ label: 'Hear the catalogue', href: '/artists#discography' }}
      visual={
        // 71.3KB — well under 800KB cap. Live performance still.
        <div className="relative aspect-video w-full overflow-hidden border border-okra-bright/20">
          <Image
            src={MEDIA_MANIFEST.HEROES.ARTIST_SANCTUARY}
            alt="Live performance"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      }
    >
      <p>
        Music is the oldest and the loudest argument the ecosystem has. It is the part
        of Okra that produces records, books tours, runs residencies, programmes radio,
        and curates the live programme. It is also the part that, more than any other,
        is asked to justify itself in a world that has decided the music is free, the
        artist is content, and the room is a feed.
      </p>
      <p>
        Okra makes the case, quietly and at length, that none of that is true.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal mb-2">/ The Label</h3>
          <p className="text-white/55 font-oo-neureal leading-relaxed text-base">
            Releases on a slow, intentional schedule. We do not run a quarterly drop
            calendar. Records are released when they are ready. The catalogue is small
            by design and is built to be heard in 10 years, not this week.
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal mb-2">/ The Bookings</h3>
          <p className="text-white/55 font-oo-neureal leading-relaxed text-base">
            Tours are routed by hand, with at least 7 days between cities. The fee is
            agreed before the route is booked. The rider is non-negotiable. The advance
            clears on signature, not on the day.
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal mb-2">/ The Residencies</h3>
          <p className="text-white/55 font-oo-neureal leading-relaxed text-base">
            A small number of long-term studio residencies, by application, for artists
            developing a body of work over 6–12 months. The residency pays a stipend.
            The output is the artist&rsquo;s. The expectation is the work, not the content.
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal mb-2">/ The Radio</h3>
          <p className="text-white/55 font-oo-neureal leading-relaxed text-base">
            A weekly 2-hour show, broadcast and archived, hosted by rotating members of
            the roster. The radio is the most accessible public surface of the
            ecosystem. Subscribe.
          </p>
        </div>
      </div>
    </EcosystemDeepDive>
  );
}

// ----- 08 FILM (DEEP) -----------------------------------------------------
function DeepFilm() {
  return (
    <EcosystemDeepDive
      id="film"
      heading="Film"
      dek="The underground is chronically under-documented. We document it on purpose."
      atmosphere="fire"
      galleryAnchor="film"
      cta={{ label: 'Enter the gallery', href: '/gallery' }}
      visual={
        // 49.8KB · well under 800KB cap · FONCÉ_(C) Karin Salathé.webp
        <div className="relative aspect-video w-full overflow-hidden border border-okra-bright/20">
          <Image
            src={MEDIA_MANIFEST.ECOSYSTEM.FILM}
            alt="Foncé portrait — photograph by Karin Salathé"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal">
            Foncé · photograph (C) Karin Salathé
          </div>
        </div>
      }
    >
      <p>
        Okra Film is the visual and editorial wing of the ecosystem. It exists because
        the work is not just sound — it is also the room, the light, the body, the
        moment, the after, and the archive. None of that survives on its own.
      </p>

      <div className="mt-8">
        <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal mb-4">
          / What we shoot
        </h3>
        <ul className="space-y-3 text-white/55 font-oo-neureal leading-relaxed">
          <li>
            <strong className="text-white/80 font-normal">Set films</strong> — full multi-cam
            captures of the headline sets, released as long-form videos on the
            artist&rsquo;s channel, edited and color-graded by Okra.
          </li>
          <li>
            <strong className="text-white/80 font-normal">Music videos</strong> — commissioned,
            on the artist&rsquo;s terms, paid as production work not as a favour.
          </li>
          <li>
            <strong className="text-white/80 font-normal">Documentaries</strong> — long-form
            (30–90 min) profiles of the artists, the rooms, the margins, the moments
            that the industry press does not cover.
          </li>
          <li>
            <strong className="text-white/80 font-normal">Aftermovies</strong> — for the
            festivals, the residencies, the residencies that became festivals, and the
            nights that did not become anything except the memory.
          </li>
          <li>
            <strong className="text-white/80 font-normal">Editorial</strong> — long-form
            written pieces, interviews, and photo essays published in tandem with the
            videos.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xs uppercase tracking-[0.4em] text-okra-fire/80 font-oo-neureal mb-4">
          / What we will not do
        </h3>
        <ul className="space-y-3 text-white/55 font-oo-neureal leading-relaxed">
          <li>— Sponsored content in disguise. Okra Film is paid by Okra, full stop.</li>
          <li>— Whisper-net gossip dressed as a profile.</li>
          <li>— Filmed content that an artist has not approved in writing.</li>
        </ul>
      </div>
    </EcosystemDeepDive>
  );
}

// ----- 3 SYSTEM PILLARS ---------------------------------------------------
function SystemPillars() {
  const pillars = [
    {
      title: 'Infrastructure',
      body: 'The operational layer: contracts, fees, riders, code of conduct, the things that make the work possible.',
    },
    {
      title: 'Network',
      body: 'The human layer: roster, crew, venues, festivals, mentors, mentees, the people who hold the system together.',
    },
    {
      title: 'Liquid Assets',
      body: 'The economic layer: how money moves through the ecosystem, who gets paid when, and why transparency is the most radical financial model we have.',
    },
  ];

  return (
    <section id="system" className="container-custom py-24 md:py-32">
      <div className="flex items-center gap-4 mb-12">
        <span className="text-[10px] uppercase tracking-[0.5em] text-okra-bright font-oo-neureal">
          / The System
        </span>
        <div className="h-[1px] w-16 bg-okra-bright/30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {pillars.map((p) => (
          <div key={p.title} className="border-l border-okra-bright/20 pl-6 md:pl-8 py-4">
            <h3 className="text-2xl md:text-3xl mb-4 text-okra-bright font-oo-neureal tracking-tight">
              {p.title}
            </h3>
            <p className="text-white/55 text-sm md:text-base font-oo-neureal leading-relaxed">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----- PAGE ---------------------------------------------------------------
export default function EcosystemPage() {
  // ItemList JSON-LD — the 8 deep-dives as a single ordered list of system components.
  const ecosystemJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'OKRA Ecosystem — System Deep-Dives',
    description: 'Eight long-form explanations of how the ecosystem operates, from collective to catalogue.',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 8,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'We Are Okra', url: `${BASE_URL}/ecosystem#we-are-okra` },
      { '@type': 'ListItem', position: 2, name: 'Moving in the Margins', url: `${BASE_URL}/ecosystem#moving-in-the-margins` },
      { '@type': 'ListItem', position: 3, name: 'Understanding the Industry', url: `${BASE_URL}/ecosystem#understanding-the-industry` },
      { '@type': 'ListItem', position: 4, name: 'What Matters', url: `${BASE_URL}/ecosystem#what-matters` },
      { '@type': 'ListItem', position: 5, name: 'Mentoring', url: `${BASE_URL}/ecosystem#mentoring` },
      { '@type': 'ListItem', position: 6, name: 'Curating', url: `${BASE_URL}/ecosystem#curating` },
      { '@type': 'ListItem', position: 7, name: 'Music', url: `${BASE_URL}/ecosystem#music` },
      { '@type': 'ListItem', position: 8, name: 'Film', url: `${BASE_URL}/ecosystem#film` },
    ],
  };

  // BreadcrumbList for the ecosystem page.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'OKRA', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Ecosystem', item: `${BASE_URL}/ecosystem` },
    ],
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Page-level JSON-LD — ItemList + BreadcrumbList. Root Organization/WebSite are emitted in app/layout.tsx. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ecosystemJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <Hero
        title="OKRA ECOSYSTEM"
        subtitle="A working system for the underground. The people, the rooms, the rooms inside the rooms."
        imageKey="ECOSYSTEM"
        button={{ label: 'Open the System', href: '/ecosystem#system' }}
      />

      {/* Back link — matches the artist page's `← Roster` badge style. */}
      <div className="container-custom pt-8">
        <Link
          href="/"
          className="badge badge-fire text-[10px] px-4 py-2 inline-block"
        >
          ← Home
        </Link>
      </div>

      <div className="container-custom py-20">
        <EcosystemMap />
      </div>

      <DeepWeAreOkra />
      <DeepMargins />
      <DeepIndustry />
      <DeepWhatMatters />
      <DeepMentoring />
      <DeepCurating />
      <DeepMusic />
      <DeepFilm />

      {/* Adopted orphan — "Your Career Reimagined" sits between the 8 deep-dives and the system pillars. */}
      <CareerReimagined />

      {/* ONE video slot per page (per scheme rule). Pending: URL TBD. */}
      <section className="container-custom py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-10">
            <span className="text-[10px] uppercase tracking-[0.5em] text-okra-bright font-oo-neureal">
              / Featured Film · 01 of 01
            </span>
            <div className="h-[1px] flex-1 max-w-[80px] bg-okra-bright/30" />
          </div>
          <VideoEmbed
            platform="vimeo"
            title="Everyday Blackness — short film"
            asset="everyday-blackness-short-film"
            label="Everyday Blackness — short film · pending URL"
          />
          <p className="mt-6 text-sm md:text-base text-white/55 font-oo-neureal leading-relaxed text-center max-w-2xl mx-auto">
            One film, three pages. The same video, the same conversation. The work is the work.
          </p>
        </div>
      </section>

      <SystemPillars />

      <PageCTA
        eyebrow="/ The System"
        title="BE PART OF IT"
        description="For infrastructure partnerships, network access, and ecosystem collaboration. Bring your room, your roster, your film, your project, or just your attention."
        buttonLabel="Open the Door"
        buttonHref="/contact"
      />
    </div>
  );
}
