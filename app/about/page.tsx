import Image from 'next/image';
import Link from 'next/link';
import ScrollFrameFilm from "@/components/ScrollFrameFilm";
import PageCTA from "@/components/PageCTA";
import AboutTopicBlock from "@/components/about/AboutTopicBlock";
import FounderSpotlight from "@/components/FounderSpotlight";
import VideoEmbed from "@/components/VideoEmbed";
import { MANY_FRAMES } from "@/lib/many-frames";
import { BASE_URL } from "@/lib/constants";

/**
 * About page — 5-topic editorial answering the most psychologically
 * loaded questions asked of people in the arts. Each topic is answered
 * in two voices (artist + venue/organiser) and closes with a pull quote.
 *
 * Selection rationale (the 20 candidate questions, the 5 chosen, and why):
 * The full list of 20 common interview questions is preserved in the
 * content deliverable at `docs/homepage-about-ecosystem-v1.md`. The 5
 * chosen are the ones that force a person to drop the rehearsed answer
 * and speak from experience.
 */

export const metadata = {
  title: 'About / Five Questions',
  description:
    'Five questions we get asked. The honest answers. Okra is a Basel-based ecosystem for underground sound, arts, and culture — built by artists, organisers, mentors, and crew.',
};

// ----- TOPIC 01 — SURVIVAL ------------------------------------------------
function TopicSurvival() {
  return (
    <AboutTopicBlock
      index={1}
      topic="Survival"
      question="Do you make a living from this? Is this sustainable?"
      flip={false}
      portrait={
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-okra-bright/20">
          <Image
            src="/images/artist-spotlight/Branded/Malefi%201.webp"
            alt="Malefi — Survival portrait"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal">
            Malefi — 01 / Survival
          </div>
        </div>
      }
      artistAnswer={
        <>
          <p>
            No. Not from this alone. Not yet. The honest answer is I subsidise the art
            with work that is not the art, and I do not pretend otherwise. I have a day
            job. So does most of the roster.
          </p>
          <p>
            We are not the underdog story the press likes to write — we are the actual
            adult version of the scene, paying rent, paying for the studio, paying for the
            visa, paying for the rider I wrote for someone else.
          </p>
          <p className="text-okra-bright/80">
            What I refuse to do is the math that says the art is not worth a living wage.
          </p>
        </>
      }
      venueAnswer={
        <>
          <p>
            I have closed two years without profit. I have paid the artist before I paid
            myself, more than once. The math on a mid-size independent venue in
            Switzerland in 2026 is honest: the rent is up, the insurance is up, the
            late-night labour is impossible to staff, and the door is down.
          </p>
          <p>
            I do this because the alternative is a city without a basement. I do not know
            how long I can.
          </p>
          <p className="text-okra-fire/80">
            What I refuse to do is pretend the maths is fine so the brand stays clean.
          </p>
        </>
      }
      pullQuote="Survival is the work. Pretending it is easy is the lie."
    />
  );
}

// ----- TOPIC 02 — THE HARD NIGHTS -----------------------------------------
function TopicHardNights() {
  return (
    <AboutTopicBlock
      index={2}
      topic="The Hard Nights"
      question="How do you handle rejection, empty rooms, the set that did not land?"
      flip
      portrait={
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-okra-bright/20">
          <Image
            src="/images/artist-spotlight/Branded/Maldita%20Vaina%203.webp"
            alt="Maldita Vaina — The Hard Nights portrait"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal">
            Maldita Vaina — 02 / The Hard Nights
          </div>
        </div>
      }
      artistAnswer={
        <>
          <p>
            I have played to four people. I have played to four thousand. Neither is the
            truth about my work.
          </p>
          <p>
            The four-person night was a Tuesday in February, the promoter had booked
            three headliners that week, I went on at 1am, and the room did not move. I
            played the set I wanted to play. I came off stage. I went home. I did not
            learn anything that week, but I also did not break.
          </p>
          <p className="text-okra-bright/80">
            The set that does not land is a fact of the work. It is not a verdict on the
            work.
          </p>
        </>
      }
      venueAnswer={
        <>
          <p>
            We open the door. Sometimes nobody walks through. You spend the night at the
            bar with the bartender and the headliner and you refund three tabs.
          </p>
          <p>
            You do not pretend the night did not happen. You pay the artist. You go home.
            You do not post about it. The next night is a different night, or it is not,
            and you keep going either way.
          </p>
        </>
      }
      pullQuote="The night that did not land is not the night that ended the work."
    />
  );
}

// ----- TOPIC 03 — STANDARDS ------------------------------------------------
function TopicStandards() {
  return (
    <AboutTopicBlock
      index={3}
      topic="Standards"
      question="What do you need from the other side of the room to do your best work?"
      flip={false}
      portrait={
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-okra-bright/20">
          <Image
            src="/images/artist-spotlight/Branded/Hausvrau%204.webp"
            alt="Hausvrau — Standards portrait"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal">
            Hausvrau — 03 / Standards
          </div>
        </div>
      }
      artistAnswer={
        <>
          <p>
            A green room that exists. A rider that is read before I arrive. A fee that
            clears the same week. A promoter who has actually listened to the record I am
            touring, and not the playlist I am on. A door person who does not treat my
            friends like a security problem. A monitor engineer who hears what I am asking
            for. A festival that books more than one of us in the lineup, not just as the
            token.
          </p>
        </>
      }
      venueAnswer={
        <>
          <p>
            A rider that is realistic. A set time I can actually programme around. A
            promoter contact who responds within 24 hours. A technical spec that is not
            aspirational. A direct line when something has gone wrong on the day, not a
            manager on email. A social post the week of, not a story the day after.
          </p>
        </>
      }
      pullQuote="What we owe each other is not the same as what we owe the brand."
    />
  );
}

// ----- TOPIC 04 — WHY WE DO THIS ------------------------------------------
function TopicWhy() {
  return (
    <AboutTopicBlock
      index={4}
      topic="Why We Do This"
      question="Why do you do this? What keeps you going when it gets hard?"
      flip
      portrait={
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-okra-bright/20">
          <Image
            src="/images/artist-spotlight/Branded/Saharaa%203.webp"
            alt="Saharaa — Why We Do This portrait"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal">
            Saharaa — 04 / Why We Do This
          </div>
        </div>
      }
      artistAnswer={
        <>
          <p>
            I do this because the alternative is a smaller life. I make the work I want
            to walk into the room and hear. I make it for the version of me at 17 who
            did not have a scene, and for the version of me at 40 who is still going to
            walk into rooms I have not been in yet.
          </p>
          <p>
            I do not do this to be famous. I do not do this to be paid properly, although
            I would like to be. I do this because the work is the work, and I would not
            know what to do with my hands without it.
          </p>
        </>
      }
      venueAnswer={
        <>
          <p>
            I do this because a city without a room is a city that does not know itself.
            I run the room I wanted to be in when I was 19. I run it so the artist after
            me has somewhere to land. I run it so the kid who is 19 now can walk in, hear
            something they have never heard, and walk out a different person.
          </p>
          <p className="text-okra-fire/80">
            That is the entire job.
          </p>
        </>
      }
      pullQuote="We do this for the room, and for the next person in it."
    />
  );
}

// ----- TOPIC 05 — THE WEIGHT ----------------------------------------------
function TopicWeight() {
  return (
    <AboutTopicBlock
      index={5}
      topic="The Weight"
      question="What is the most challenging part? What does it actually take out of you?"
      flip={false}
      portrait={
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-okra-bright/20">
          <Image
            src="/images/artist-spotlight/Branded/Fonc%C3%A9%201.webp"
            alt="Foncé — The Weight portrait"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-[0.4em] text-okra-bright/80 font-oo-neureal">
            Foncé — 05 / The Weight
          </div>
        </div>
      }
      artistAnswer={
        <>
          <p>
            The most challenging part is not the work. It is the loneliness of being
            seen, the way every set becomes a referendum on whether you are still
            relevant, still enough, still worth the fee.
          </p>
          <p className="text-okra-bright/80">
            The work is the easy part. The work is the place I go to escape the question
            of whether I am allowed to keep doing the work.
          </p>
        </>
      }
      venueAnswer={
        <>
          <p>
            The most challenging part is the 3am conversation with the bartender about
            whether we can make rent. The most challenging part is the email I send to
            the artist to tell them the show is cancelled. The most challenging part is
            the part no one writes a press release about — the slow grinding part of
            running a space that is treated as public infrastructure but funded as a
            private business.
          </p>
        </>
      }
      pullQuote="The work is the easy part. Everything around the work is the work."
    />
  );
}

// ----- PAGE ---------------------------------------------------------------
export default function AboutPage() {
  // FAQPage JSON-LD — the 5 topics are explicitly Q&A pairs, this lets
  // search engines surface the answers directly.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you make a living from this? Is this sustainable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Not from this alone. Not yet. The honest answer is the work is subsidised by work that is not the work, and we do not pretend otherwise. We refuse the math that says the art is not worth a living wage.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you handle rejection, empty rooms, the set that did not land?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The night that did not land is not the night that ended the work. We play the set we wanted to play, we pay the artist, we do not post about it, and the next night is a different night, or it is not.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do you need from the other side of the room to do your best work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A green room that exists. A rider that is read before arrival. A fee that clears the same week. A door person who does not treat friends like a security problem. A festival that books more than one of us in the lineup, not just as the token.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why do you do this? What keeps you going when it gets hard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We do this for the room, and for the next person in it. A city without a room is a city that does not know itself. We run the room we wanted to be in when we were 19.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most challenging part? What does it actually take out of you?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The work is the easy part. Everything around the work is the work. The 3am conversation with the bartender about rent. The email telling the artist the show is cancelled. The slow grinding part of running a space treated as public infrastructure but funded as a private business.',
        },
      },
    ],
  };

  // BreadcrumbList for the about page.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'OKRA', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${BASE_URL}/about` },
    ],
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Page-level JSON-LD — FAQPage + BreadcrumbList. Root Organization/WebSite are emitted in app/layout.tsx. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <ScrollFrameFilm
        frames={MANY_FRAMES}
        position="center-left-bottom"
        ariaLabel="History scroll reveal"
        altText="OKRA About scroll reveal"
        title="HISTORY"
        subtitle="Five questions we get asked. The honest answers."
        button={{ label: 'Read on', href: '#topic-01' }}
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

      {/* Intro — single editorial paragraph between the hero and topic 01 */}
      <div className="container-custom pt-24 md:pt-36">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.5em] text-okra-bright font-oo-neureal">
            / The Five
          </span>
          <p className="text-xl md:text-2xl text-white/80 font-oo-neureal leading-relaxed">
            We pulled the questions we get asked most by press, by new artists, by
            promoters, by friends, by the kid at the bar. We kept the five that force an
            honest answer. The other fifteen are useful — these five are the ones you
            either answer truthfully, or visibly cannot.
          </p>
          <p className="text-sm md:text-base text-white/40 font-oo-neureal uppercase tracking-[0.25em] pt-2">
            Each answer is written twice — once from the artist&rsquo;s seat, once from
            the venue / organiser&rsquo;s seat. Same question. Different room.
          </p>
        </div>
      </div>

      {/* Adopted orphan — founder's note, sits between the intro and the 5 topics. */}
      <FounderSpotlight />

      <TopicSurvival />
      <TopicHardNights />
      <TopicStandards />
      <TopicWhy />
      <TopicWeight />

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

      <PageCTA
        eyebrow="/ The End of the Beginning"
        title="STILL READING?"
        description="You are already one of us. The next step is whichever one feels right — booking, applying to the roster, joining a cohort, or just showing up to the next night."
        buttonLabel="Open the Door"
        buttonHref="/contact"
      />
    </div>
  );
}
