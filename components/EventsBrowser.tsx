'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ARTISTS } from '@/lib/artist-data';
import type { Event } from '@/lib/events-data';
import {
  applyFilters,
  FILTER_CATEGORIES,
  filtersFromSearchParams,
  formatEventDate,
  hasActiveFilters,
  isEventUpcoming,
  searchParamsFromFilters,
  type FilterState,
} from '@/lib/event-filters';
import FilterDropdown from './FilterDropdown';

interface EventsBrowserProps {
  events: Event[];
}

export default function EventsBrowser({ events }: EventsBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: FilterState = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams]
  );

  const toggleFilter = useCallback(
    (category: keyof FilterState, value: string) => {
      const current = (filters[category] as string[]).slice();
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const newFilters: FilterState = { ...filters, [category]: next };
      const params = searchParamsFromFilters(newFilters);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [filters, pathname, router]
  );

  const clearAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const filteredEvents = useMemo(
    () => applyFilters(events, filters),
    [events, filters]
  );

  const upcoming = useMemo(
    () =>
      filteredEvents
        .filter((e) => isEventUpcoming(e.date))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [filteredEvents]
  );

  const past = useMemo(
    () =>
      filteredEvents
        .filter((e) => !isEventUpcoming(e.date))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [filteredEvents]
  );

  // One chip per active filter value (across all categories), with the
  // value's display label looked up from its category's options.
  const activeChips = useMemo(() => {
    const chips: Array<{
      category: keyof FilterState;
      value: string;
      label: string;
    }> = [];
    FILTER_CATEGORIES.forEach((category) => {
      const selectedValues = filters[category.key] as string[];
      if (selectedValues.length === 0) return;
      const options = category.options(events);
      selectedValues.forEach((value) => {
        const option = options.find((o) => o.value === value);
        chips.push({
          category: category.key,
          value,
          label: option?.label ?? value,
        });
      });
    });
    return chips;
  }, [filters, events]);

  const totalCount = events.length;
  const matchingCount = filteredEvents.length;
  const active = hasActiveFilters(filters);

  return (
    <div>
      {/* Filter bar: dropdowns + active chips + result count */}
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Dropdown row + result count */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              {FILTER_CATEGORIES.map((category) => (
                <FilterDropdown
                  key={category.key}
                  label={category.label}
                  options={category.options(events)}
                  selected={filters[category.key] as string[]}
                  onToggle={(value) => toggleFilter(category.key, value)}
                />
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-okra-bright/60 font-oo-neureal shrink-0">
              {active
                ? `Showing ${matchingCount} of ${totalCount} events`
                : `${totalCount} events`}
            </p>
          </div>

          {/* Active filter chips + clear all */}
          {activeChips.length > 0 && (
            <div
              aria-label="Active filters"
              className="flex flex-wrap items-center gap-2 py-3 border-t border-white/5"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-okra-bright/60 font-oo-neureal">
                Active
              </span>
              <AnimatePresence>
                {activeChips.map((chip) => (
                  <motion.button
                    key={`${chip.category}-${chip.value}`}
                    type="button"
                    onClick={() => toggleFilter(chip.category, chip.value)}
                    aria-label={`Remove ${chip.label} filter`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="text-[10px] uppercase tracking-[0.2em] font-oo-neureal px-3 py-1.5 rounded-full border border-okra-bright/30 bg-okra-bright/5 text-okra-bright hover:border-okra-fire/50 hover:bg-okra-fire/5 hover:text-okra-fire transition-all duration-200 inline-flex items-center gap-2"
                  >
                    {chip.label}
                    <span className="text-base leading-none">×</span>
                  </motion.button>
                ))}
              </AnimatePresence>
              <button
                type="button"
                onClick={clearAll}
                className="ml-auto text-[10px] uppercase tracking-[0.3em] text-okra-fire/60 hover:text-okra-bright active:text-okra-bright transition-all duration-300 font-oo-neureal"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Events list */}
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {matchingCount === 0 ? (
            <div className="py-24 text-center">
              <p className="text-sm text-white/40 font-oo-neureal uppercase tracking-[0.2em] mb-4">
                No events match these filters
              </p>
              {active && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-[10px] uppercase tracking-[0.3em] text-okra-fire/60 hover:text-okra-bright active:text-okra-bright transition-all duration-300 font-oo-neureal"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <div className="mb-20">
                  <h2 className="text-3xl md:text-5xl font-oo-neureal uppercase tracking-tighter text-okra-bright text-glow-bright mb-8">
                    Upcoming
                  </h2>
                  <div className="w-12 h-[1px] bg-okra-bright/30 mb-8" />
                  {upcoming.map((event) => (
                    <EventRow key={event.id} event={event} />
                  ))}
                </div>
              )}

              {past.length > 0 && (
                <div>
                  <h2 className="text-3xl md:text-5xl font-oo-neureal uppercase tracking-tighter text-okra-bright text-glow-bright mb-8">
                    Past
                  </h2>
                  <div className="w-12 h-[1px] bg-white/10 mb-8" />
                  {past.map((event) => (
                    <EventRow key={event.id} event={event} dimmed />
                  ))}
                </div>
              )}

              <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-2">
                <a
                  href="/artists"
                  className="text-[10px] uppercase tracking-[0.3em] text-okra-fire/60 hover:text-okra-bright active:text-okra-bright transition-all duration-300 font-oo-neureal"
                >
                  ← Roster
                </a>
                <a
                  href="/tickets"
                  className="text-[10px] uppercase tracking-[0.3em] text-okra-fire/60 hover:text-okra-bright active:text-okra-bright transition-all duration-300 font-oo-neureal"
                >
                  All Ticket Links →
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EventRow({ event, dimmed }: { event: Event; dimmed?: boolean }) {
  const artistNames = event.artists.map((slug) => {
    const artist = ARTISTS.find((a) => a.slug === slug);
    return artist?.name ?? slug;
  });

  return (
    <div
      className={`flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-8 border-b border-white/5 ${
        dimmed
          ? 'opacity-40 hover:opacity-70 transition-opacity duration-300'
          : ''
      }`}
    >
      <div className="md:w-48 shrink-0">
        <span className="text-[11px] uppercase tracking-[0.3em] text-okra-bright/80 font-oo-neureal">
          {formatEventDate(event.date)}
        </span>
        <div className="mt-2">
          <span className="text-[9px] uppercase tracking-[0.25em] px-2 py-1 rounded-full border border-white/10 text-white/40 font-oo-neureal">
            {event.type}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg md:text-xl font-oo-neureal uppercase tracking-tight text-white mb-1">
          {event.title}
        </h3>
        <p className="text-sm text-white/50 font-oo-neureal uppercase tracking-[0.1em]">
          {event.venue}, {event.city}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {artistNames.map((name) => (
            <span
              key={name}
              className="text-[10px] uppercase tracking-[0.2em] text-okra-bright/70 font-oo-neureal"
            >
              {name}
            </span>
          ))}
        </div>
        {event.description && (
          <p className="text-xs text-white/30 mt-3 font-oo-neureal leading-relaxed max-w-xl">
            {event.description}
          </p>
        )}
      </div>
      <div className="shrink-0 md:self-center">
        {event.ticketUrl ? (
          !dimmed ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="badge badge-fire text-[10px] px-4 py-2"
            >
              Tickets →
            </a>
          ) : null
        ) : (
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-oo-neureal">
            Past
          </span>
        )}
      </div>
    </div>
  );
}
