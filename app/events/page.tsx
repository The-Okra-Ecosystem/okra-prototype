import { Suspense } from 'react'
import { EVENTS } from '@/lib/events-data'
import ScrollFrameFilm from '@/components/ScrollFrameFilm'
import EventsBrowser from '@/components/EventsBrowser'
import PageCTA from '@/components/PageCTA'
import { TOULOUSE_CROWD_HERO_FRAMES } from '@/lib/toulouse-crowd-hero-frames'

export const metadata = {
  title: 'Events',
  description: 'Upcoming and past events from the OKRA Ecosystem roster.',
  openGraph: {
    title: 'Events | OKRA Ecosystem',
    description: 'Upcoming and past events from the OKRA Ecosystem roster.',
  },
}

function EventsBrowserFallback() {
  return (
    <div className="container-custom">
      <div className="max-w-5xl mx-auto py-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-okra-bright/40 font-oo-neureal">
          Loading events…
        </p>
      </div>
    </div>
  )
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black pb-24">
      <ScrollFrameFilm
        frames={TOULOUSE_CROWD_HERO_FRAMES}
        ariaLabel="Events scroll reveal"
        altText="OKRA Events scroll reveal"
        title={
          <>
            OKRA<br />Events
          </>
        }
        subtitle="Live schedule & past performances"
        button={{ label: 'Tickets', href: '/tickets' }}
      />

      <div className="h-20 md:h-32" />

      <Suspense fallback={<EventsBrowserFallback />}>
        <EventsBrowser events={EVENTS} />
      </Suspense>

      <PageCTA
        eyebrow="/ Tickets"
        title="GET TICKETS"
        description="Direct links to organizer and venue ticket pages, kept in sync with each show."
        buttonLabel="View Tickets"
        buttonHref="/tickets"
      />
    </div>
  )
}
