import Image from 'next/image';
import Link from 'next/link';
import ScrollFrameFilm from "@/components/ScrollFrameFilm";
import HomeSection from "@/components/sections/HomeSection";
import AssetPlaceholder from "@/components/AssetPlaceholder";
import ClimaxCTA from "@/components/ClimaxCTA";
import NewsletterSignup from "@/components/NewsletterSignup";
import EthosSection from "@/components/EthosSection";
import VideoEmbed from "@/components/VideoEmbed";
import { MEDIA_MANIFEST } from "@/lib/media-manifest";
import { KARABA_HERO_FRAMES } from "@/lib/karaba-hero-frames";
import { BASE_URL } from "@/lib/constants";

/**
 * Home page — 8 named section blocks, plus the existing scroll-film hero
 * and newsletter closer. The page is intentionally a Server Component:
 * every section is content + light CSS animation, with no client JS
 * required. The two client islands are `ScrollFrameFilm` (existing, drives
 * the hero film) and `ClimaxCTA` (existing, drives the final CTA glow).
 *
 * Visual slot policy:
 *  - Where a manifest image semantically fits, it is rendered.
 *  - Where the user has not yet delivered an asset, an `AssetPlaceholder`
 *    is rendered with a `data-asset` attribute the reviewer can grep.
 *  - No image >800KB is used (per build constraint).
 *
 * 800KB audit (verified 2026-06-05 against public/):
 *   - 15 of 16 manifest images are under 800KB.
 *   - 1 (Okra Wordmark Spark nbg.png, 1680KB) is the existing Footer logo;
 *     it is NOT used by any section on this page. Flagged separately.
 */

// ----- 01 WE ARE OKRA -----------------------------------------------------
function WeAreOkra() {
  return (
    <HomeSection
      id="we-are-okra"
      index="01"
      eyebrow="The Statement"
      heading="We Are Okra"
      dek="A safe haven for radical creative expression. Born in Basel, built for the margin."
      atmosphere="deep"
      visual={
        <AssetPlaceholder
          asset="collective-portrait-wide-basel-studio.webp"
          label="Collective portrait — wide Basel studio"
          aspect="video"
          grayscale
        />
      }
    >
      <p>
        Okra is a collective of artists, organisers, curators, and obsessives. We are a
        record label, a booking agency, a mentorship network, a film house, and a
        movement that refuses to choose between the underground and the future.
      </p>
      <p>
        We exist because the industry as it stands was not built for us. So we built our own.
      </p>
      <p>
        We move slowly. We move with care. We pay our artists properly. We hold space for
        the ones the mainstream is still learning to name. We do not chase virality, and
        we will not sell the room out to an algorithm.
      </p>
    </HomeSection>
  );
}

// ----- 02 MOVING IN THE MARGINS ------------------------------------------
function MovingInMargins() {
  return (
    <HomeSection
      id="moving-in-the-margins"
      index="02"
      eyebrow="The Position"
      heading="Moving in the Margins"
      dek="The mainstream was never going to make room. So we made our own room, and we left the door open."
      atmosphere="subtle"
      visual={
        // Existing manifest image (725.5KB, just under 800KB cap). Borderline;
        // consider compressing if delivery is critical.
        <div className="relative aspect-video w-full overflow-hidden border border-okra-bright/20">
          <Image
            src={MEDIA_MANIFEST.HEROES.BASEL}
            alt="Basel scene"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      }
      ctaSecondary={{ label: 'Hear the work', href: '/artists' }}
    >
      <p>
        The margins are not a metaphor. They are a geography. They are the clubs that close
        at 02:00. The lineups with no women. The riders that get read as a joke. The booking
        fees that arrive three months late. The scenes that only get a paragraph in print.
        The genres that don&rsquo;t have a festival yet.
      </p>
      <p>
        Okra was founded by women, queer artists, immigrants, and working-class musicians
        who got tired of waiting to be invited in. We are not &ldquo;alternative.&rdquo; We are
        the actual scene, in the actual city, in the actual basement — and we have been
        here the whole time.
      </p>
      <p className="text-okra-bright/80">
        This is what the margins sound like when you stop pretending they are quiet.
      </p>
    </HomeSection>
  );
}

// ----- 03 UNDERSTANDING THE INDUSTRY -------------------------------------
function UnderstandingIndustry() {
  return (
    <HomeSection
      id="understanding-the-industry"
      index="03"
      eyebrow="The Diagnosis"
      heading="Understanding the Industry"
      dek="The business of music is not the music. We have studied both."
      atmosphere="fire"
    >
      <p>
        The industry runs on a few simple, outdated ideas: that the next big thing can be
        found by sorting 10,000 demos, that algorithms know what a room wants, that
        hospitality riders are negotiable, that the artist&rsquo;s job ends when the set does.
      </p>
      <p>
        Okra is run by people who have worked every seat in the room — on stage, behind the
        desk, on the door, in the back office, on the road at 4am. We know the money, the
        contracts, the politics, the burnout, the late payments, the riders that get
        ignored, the green rooms that don&rsquo;t exist.
      </p>
      <p>
        We do not romanticise the industry. We rebuild the parts of it that do not serve
        the people who actually make the work.
      </p>
    </HomeSection>
  );
}

// ----- 04 WHAT MATTERS ----------------------------------------------------
function WhatMatters() {
  const values = [
    { word: 'Care', body: 'over clout. We protect the people we work with, on stage and off it.' },
    { word: 'Craft', body: 'over content. We work with artists who are still obsessed, not optimised.' },
    { word: 'Risk', body: 'over safety of the known. We book the artist we have not heard of yet.' },
    { word: 'Dignity', body: 'over deals. Fair fees, honored riders, paid rehearsals. Every time.' },
    { word: 'Transparency', body: 'over mystique. We publish what we can, we admit when we are wrong.' },
    { word: 'Rest', body: 'over grind. Burnout is not a credential. We pace the work.' },
    { word: 'Rage, used well', body: 'against the parts of the system that are broken in ways that matter.' },
  ];

  return (
    <HomeSection
      id="what-matters"
      index="04"
      eyebrow="The Code"
      heading="What Matters"
      dek="Care. Craft. Risk. Dignity. Transparency. Rest. Rage, used well."
      layout="center"
      atmosphere="deep"
    >
      <ul className="space-y-4 max-w-2xl mx-auto">
        {values.map((v) => (
          <li
            key={v.word}
            className="flex flex-col sm:flex-row gap-2 sm:gap-6 sm:items-baseline text-left md:text-left"
          >
            <span className="text-okra-bright font-oo-neureal text-lg md:text-xl tracking-tight whitespace-nowrap min-w-[14rem]">
              — {v.word}
            </span>
            <span className="text-white/55 font-oo-neureal leading-relaxed">
              {v.body}
            </span>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

// ----- 05 MENTORING -------------------------------------------------------
function Mentoring() {
  return (
    <HomeSection
      id="mentoring"
      index="05"
      eyebrow="The Transfer"
      heading="Mentoring"
      dek="You should not have to learn the hard way the things we already had to learn the hard way."
      atmosphere="subtle"
      visual={
        // 72.8KB — well under 800KB cap.
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-okra-bright/20">
          <Image
            src={MEDIA_MANIFEST.HEROES.LAAX_SNOWLEAGUE}
            alt="Mentorship — a founder on the mountain"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      }
      cta={{ label: 'Apply for the cohort', href: '/contact?intent=mentor' }}
    >
      <p>
        Every artist on the Okra roster has done time on the wrong side of the door — bad
        contracts, broken promises, the room that never came. The Okra mentorship network
        is the part of the ecosystem where that pain stops being a tax and starts being a
        curriculum.
      </p>
      <p>
        We pair emerging artists with established ones across sound, film, and the industry
        itself. We run closed-door sessions on contracts, money, mental health, the
        politics of festivals, and the long psychology of a career. We pay mentors. We pay
        mentees. The conversation is not extractive.
      </p>
      <p>
        This is how we keep the next generation from inheriting our worst year.
      </p>
    </HomeSection>
  );
}

// ----- 06 CURATING --------------------------------------------------------
function Curating() {
  return (
    <HomeSection
      id="curating"
      index="06"
      eyebrow="The Cut"
      heading="Curating"
      dek="Saying no is an act of love. So is saying yes to the right unknown."
      atmosphere="subtle"
      visual={
        // 755.5KB — borderline. Rendered as background-fill to mask softness.
        <div className="relative aspect-video w-full overflow-hidden border border-okra-bright/20">
          <Image
            src={MEDIA_MANIFEST.HEROES.BASEL_MOBILE}
            alt="A curated moment"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>
      }
      ctaSecondary={{ label: 'Meet the roster', href: '/artists' }}
    >
      <p>
        Curating is not gatekeeping. It is the opposite — it is opening the gate for the
        work that deserves to be in the room, and the artist who deserves to be heard,
        even if you have not heard of them yet.
      </p>
      <p>
        Okra curates three things: the <Link href="/artists" className="body-link">roster</Link> (the
        artists we represent long-term), the <Link href="/events" className="body-link">lineups</Link> (the
        nights we book from underground basements to mountain-top takeovers), and the
        catalogue (the records, films, and editorial we choose to put our name on).
      </p>
      <p>
        We turn down work that is offered with a wink and a lowball. We turn down
        festivals that book one woman as a token. We say yes to the unknown artist who
        sends us a single track at 3am and it changes our week.
      </p>
    </HomeSection>
  );
}

// ----- 07 MUSIC -----------------------------------------------------------
function Music() {
  return (
    <HomeSection
      id="music"
      index="07"
      eyebrow="The Sound"
      heading="Music"
      dek="House, techno, experimental club, bass, ambient, breaks, footwork, dub, drone — and whatever the next 5 artists in the basement are inventing."
      atmosphere="deep"
      visual={
        // 71.3KB — well under 800KB cap. Live performance image.
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
      cta={{ label: 'Hear the catalogue', href: '/artists#discography' }}
    >
      <p>
        Music is the spine of the ecosystem. It is the night, the label, the radio, the
        discography, the live program. It is also the loudest argument we have for why
        this kind of careful, slow, artist-first infrastructure still matters in a world
        that wants feed-ready content.
      </p>
      <p>
        Okra releases records. We book tours. We run residencies. We put artists in rooms
        they would not have been booked into a year ago, and we make sure the rider is
        honored and the fee clears the same week.
      </p>
      <p>
        We do not chase trends. We follow the work.
      </p>
    </HomeSection>
  );
}

// ----- 08 FILM ------------------------------------------------------------
function Film() {
  return (
    <HomeSection
      id="film"
      index="08"
      eyebrow="The Frame"
      heading="Film"
      dek="Music is the sound. Film is the memory. The basement at 4am needs to be on the record."
      atmosphere="fire"
      visual={
        // ONE video slot per page (per scheme rule). Pending: URL TBD.
        <div className="space-y-4">
          <VideoEmbed
            platform="vimeo"
            title="Everyday Blackness — short film"
            asset="everyday-blackness-short-film"
            label="Everyday Blackness — short film · pending URL"
          />
          <p className="text-[10px] uppercase tracking-[0.3em] text-okra-bright/50 font-oo-neureal text-center">
            / Featured Film · 01 of 01
          </p>
        </div>
      }
      cta={{ label: 'Enter the gallery', href: '/gallery' }}
    >
      <p>
        Okra Film is the visual and editorial wing of the ecosystem. We shoot the nights.
        We edit the documentaries. We make the music videos, the EPKs, the aftermovies,
        the portraits, and the long-form interviews that an artist cannot always make
        alone.
      </p>
      <p>
        We believe the underground is chronically under-documented. The best nights, the
        best sets, the best dancers, the best lights, the best mistakes — they all happen
        once, in a room, and almost no one films them well. We film them well. We do it
        for the archive, for the press, for the artist, and for the next kid in another
        city who needs to see that this is real.
      </p>
    </HomeSection>
  );
}

// ----- PAGE ---------------------------------------------------------------
export default function Home() {
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'OKRA Ecosystem — Manifesto',
    description:
      'Eight declarative sections on what Okra is, who it serves, and how it operates.',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: 8,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'We Are Okra', url: `${BASE_URL}/#we-are-okra` },
      { '@type': 'ListItem', position: 2, name: 'Moving in the Margins', url: `${BASE_URL}/#moving-in-the-margins` },
      { '@type': 'ListItem', position: 3, name: 'Understanding the Industry', url: `${BASE_URL}/#understanding-the-industry` },
      { '@type': 'ListItem', position: 4, name: 'What Matters', url: `${BASE_URL}/#what-matters` },
      { '@type': 'ListItem', position: 5, name: 'Mentoring', url: `${BASE_URL}/#mentoring` },
      { '@type': 'ListItem', position: 6, name: 'Curating', url: `${BASE_URL}/#curating` },
      { '@type': 'ListItem', position: 7, name: 'Music', url: `${BASE_URL}/#music` },
      { '@type': 'ListItem', position: 8, name: 'Film', url: `${BASE_URL}/#film` },
    ],
  };

  return (
    <div className="relative">
      {/* ItemList JSON-LD — makes the 8 manifesto sections crawlable as a single ordered list. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <ScrollFrameFilm
        frames={KARABA_HERO_FRAMES}
        ariaLabel="Enter the Ecosystem scroll reveal"
        altText="OKRA Ecosystem scroll reveal"
        title={
          <>
            ENTER THE<br />ECOSYSTEM
          </>
        }
        subtitle="A safe haven for sonic exploration"
        button={{ label: 'Initialize Connection', href: '/contact' }}
      />

      <WeAreOkra />
      <MovingInMargins />
      <UnderstandingIndustry />
      <WhatMatters />
      <Mentoring />
      <Curating />
      <Music />
      <Film />

      {/* Adopted orphan — atmospheric manifesto, sits between the 8 sections and the closer. */}
      <EthosSection />

      <ClimaxCTA />
      <NewsletterSignup />
    </div>
  );
}
