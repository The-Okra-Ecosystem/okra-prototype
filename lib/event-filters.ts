/**
 * Event filter logic, derivation utilities, and URL state serialization.
 *
 * Filter categories (4 rows):
 *  - artist    (dynamic, slug→name)
 *  - venue     (dynamic, derived from events)
 *  - canton    (dynamic, derived from city via CITY_TO_CANTON)
 *  - admission (2 static: free/paid, derived from ticketUrl)
 *
 * Per the user's spec, city, season, and type filters were removed to
 * keep the filter UI focused. The corresponding helpers (getCityOptions,
 * getSeason, TYPE_OPTIONS) were removed with them — re-introduce by
 * restoring the helpers and adding entries to FILTER_CATEGORIES.
 *
 * URL state shape (multi-select within category, AND between):
 *   ?artist=hausvrau,malefi&venue=Nordstern&canton=Basel-Stadt&admission=paid
 */

import type { Event } from './events-data';
import { ARTISTS } from './artist-data';

export type Admission = 'free' | 'paid';

export interface FilterState {
  artists: string[];
  venues: string[];
  cantons: string[];
  admissions: Admission[];
}

export const EMPTY_FILTERS: FilterState = {
  artists: [],
  venues: [],
  cantons: [],
  admissions: [],
};

export interface FilterOption {
  value: string;
  label: string;
}

// ----- Static pill options -----

export const ADMISSION_OPTIONS: readonly FilterOption[] = [
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
];

// ----- Dynamic pill options (derived from data) -----

export function getArtistOptions(): FilterOption[] {
  return ARTISTS.map((a) => ({ value: a.slug, label: a.name }));
}

export function getVenueOptions(events: Event[]): FilterOption[] {
  return Array.from(new Set(events.map((e) => e.venue))).sort().map((v) => ({
    value: v,
    label: v,
  }));
}

// ----- Canton derivation (city -> Swiss canton) -----

const CITY_TO_CANTON: Record<string, string> = {
  basel: 'Basel-Stadt',
  'basel-stadt': 'Basel-Stadt',
  binningen: 'Basel-Landschaft',
  allschwil: 'Basel-Landschaft',
  zürich: 'Zürich',
  zurich: 'Zürich',
  winterthur: 'Zürich',
  düdingen: 'Fribourg',
  dudingen: 'Fribourg',
  fribourg: 'Fribourg',
  freiburg: 'Fribourg',
  genève: 'Genève',
  geneva: 'Genève',
  lausanne: 'Vaud',
  montreux: 'Vaud',
  nyon: 'Vaud',
  bern: 'Bern',
  thun: 'Bern',
  biel: 'Bern',
  'biel/bienne': 'Bern',
  luzern: 'Luzern',
  lucerne: 'Luzern',
  lugano: 'Ticino',
  bellinzona: 'Ticino',
  locarno: 'Ticino',
  'st. gallen': 'St. Gallen',
  stgallen: 'St. Gallen',
  aarau: 'Aargau',
  baden: 'Aargau',
  olten: 'Solothurn',
  solothurn: 'Solothurn',
  schaffhausen: 'Schaffhausen',
  chur: 'Graubünden',
  davos: 'Graubünden',
  sion: 'Valais',
};

export function getCanton(city: string): string | null {
  return CITY_TO_CANTON[city.toLowerCase()] ?? null;
}

export function getCantonOptions(events: Event[]): FilterOption[] {
  const cantons = new Set<string>();
  events.forEach((e) => {
    const canton = getCanton(e.city);
    if (canton) cantons.add(canton);
  });
  return Array.from(cantons).sort().map((c) => ({ value: c, label: c }));
}

// ----- Per-event derivations -----

export function getAdmission(event: Event): Admission {
  return event.ticketUrl ? 'paid' : 'free';
}

export function isEventUpcoming(iso: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(iso + 'T00:00:00') >= today;
}

// ----- Filter application (AND between categories, OR within) -----

export function applyFilters(events: Event[], filters: FilterState): Event[] {
  return events.filter((event) => {
    if (filters.artists.length > 0) {
      const hasMatch = event.artists.some((a) => filters.artists.includes(a));
      if (!hasMatch) return false;
    }
    if (filters.venues.length > 0 && !filters.venues.includes(event.venue)) {
      return false;
    }
    if (filters.cantons.length > 0) {
      const eventCanton = getCanton(event.city);
      if (!eventCanton || !filters.cantons.includes(eventCanton)) return false;
    }
    if (filters.admissions.length > 0) {
      const eventAdmission = getAdmission(event);
      if (!filters.admissions.includes(eventAdmission)) return false;
    }
    return true;
  });
}

// ----- URL <-> FilterState helpers -----

type SearchParamsLike = { get(key: string): string | null };

export function filtersFromSearchParams(params: SearchParamsLike): FilterState {
  const get = (key: string): string[] => {
    const value = params.get(key);
    return value ? value.split(',').filter(Boolean) : [];
  };
  return {
    artists: get('artist'),
    venues: get('venue'),
    cantons: get('canton'),
    admissions: get('admission') as Admission[],
  };
}

export function searchParamsFromFilters(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  const set = (key: string, values: readonly string[]) => {
    if (values.length > 0) params.set(key, values.join(','));
  };
  set('artist', filters.artists);
  set('venue', filters.venues);
  set('canton', filters.cantons);
  set('admission', filters.admissions);
  return params;
}

export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.artists.length > 0 ||
    filters.venues.length > 0 ||
    filters.cantons.length > 0 ||
    filters.admissions.length > 0
  );
}

// ----- Filter row definition (for UI rendering) -----

export interface FilterCategory {
  key: keyof FilterState;
  label: string;
  options: (events: Event[]) => FilterOption[];
}

export const FILTER_CATEGORIES: readonly FilterCategory[] = [
  { key: 'artists', label: 'ARTIST', options: () => getArtistOptions() },
  { key: 'venues', label: 'VENUE', options: (events) => getVenueOptions(events) },
  { key: 'cantons', label: 'CANTON', options: (events) => getCantonOptions(events) },
  { key: 'admissions', label: 'ADMISSION', options: () => [...ADMISSION_OPTIONS] },
];

// ----- Display helpers -----

export function formatEventDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
  ];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
