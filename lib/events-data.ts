export interface Event {
  id: number
  title: string
  date: string
  venue: string
  city: string
  artists: string[]
  ticketUrl?: string
  description?: string
  type:
    | 'club'
    | 'festival'
    | 'showcase'
    | 'gallery opening'
    | 'exhibition'
    | 'panel talk'
    | 'filming'
    | 'ballroom'
    | 'okra takeover'
}

export type { Event as EventType }

export const EVENTS: Event[] = [
  {
    id: 1,
    title: 'Nordstern Sessions Vol. 14',
    date: '2026-06-12',
    venue: 'Nordstern',
    city: 'Basel',
    artists: ['hausvrau', 'malefi'],
    ticketUrl: 'https://nordstern.ch',
    description: 'A night of underground exploration featuring HAUSVRAU and MALEFI.',
    type: 'club',
  },
  {
    id: 2,
    title: 'Zurich Open Air 2026',
    date: '2026-07-04',
    venue: 'Zurich Open Air',
    city: 'Zürich',
    artists: ['jean-fonce'],
    ticketUrl: 'https://zurichopenair.ch',
    description: 'JEAN FONCÉ takes the main stage at one of Switzerland\'s premier festivals.',
    type: 'festival',
  },
  {
    id: 3,
    title: 'Elysia Presents: Frequencies',
    date: '2026-07-18',
    venue: 'Elysia',
    city: 'Basel',
    artists: ['saharaa'],
    ticketUrl: 'https://elysia.ch',
    description: 'SAHARAA headlines with an ethereal vocal and sound design set.',
    type: 'club',
  },
  {
    id: 4,
    title: 'PHUM — Live at Kraftwerk',
    date: '2026-08-22',
    venue: 'Kraftwerk',
    city: 'Zürich',
    artists: ['phum'],
    ticketUrl: 'https://kraftwerk.ch',
    description: 'An immersive auditory journey from multi-instrumentalist PHUM.',
    type: 'showcase',
  },
  {
    id: 5,
    title: 'Digital Boundaries',
    date: '2026-09-05',
    venue: 'HeK (Haus der Elektronischen Künste)',
    city: 'Basel',
    artists: ['maldita-vaina'],
    ticketUrl: 'https://hek.ch',
    description: 'MALDITA VAINA presents a provocative new performance piece challenging digital and physical boundaries.',
    type: 'exhibition',
  },
  {
    id: 6,
    title: 'Winter Solstice',
    date: '2026-01-18',
    venue: 'Nordstern',
    city: 'Basel',
    artists: ['jean-fonce', 'hausvrau'],
    type: 'club',
  },
  {
    id: 7,
    title: 'Elysia: Spring Edition',
    date: '2026-03-14',
    venue: 'Elysia',
    city: 'Basel',
    artists: ['saharaa', 'malefi'],
    type: 'club',
  },
  {
    id: 8,
    title: 'Bad Bonn Kilbi 2026',
    date: '2026-04-25',
    venue: 'Bad Bonn',
    city: 'Düdingen',
    artists: ['phum'],
    type: 'showcase',
  },
]
