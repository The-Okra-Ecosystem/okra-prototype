'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FilterOption } from '@/lib/event-filters';

interface FilterDropdownProps {
  /** Category label shown in trigger when no value is selected. */
  label: string;
  /** Available options (derived from the data). */
  options: readonly FilterOption[];
  /** Currently selected values for this category. */
  selected: readonly string[];
  /** Toggle a value in/out of the selected set. */
  onToggle: (value: string) => void;
}

/**
 * Custom multi-select dropdown for the events filter.
 *
 * Visual (uses the project's existing .badge .badge-fire ticket-badge
 * system — see app/globals.css):
 *  - Trigger: .badge .badge-fire (same as the "Tickets →" link in
 *    EventRow, the buttons in ArtistModal, and the NewsletterSignup
 *    submit). Subdued fire border + label, shifts to okra-bright on
 *    hover via .badge-fire:hover. Compact padding so multiple
 *    dropdowns fit easily in a row.
 *  - Panel: black/95 + backdrop-blur, okra-bright/20 border, okra-bright/5
 *    shadow, animates in via framer-motion (150ms fade + slight Y)
 *  - Options: white/60 text, white/5 hover bg, okra-bright + 5 bg when
 *    selected, with a small okra-bright dot indicator (with 6px glow)
 *  - Chevron: ▼ rotates 180° when panel is open
 *
 * Behavior:
 *  - Click trigger toggles panel
 *  - Click outside closes
 *  - Escape closes
 *  - Click an option toggles its value (panel stays open for multi-select)
 *  - Trigger label: label only if empty; "LABEL: value" if 1 selected;
 *    "LABEL (n)" if 2+ selected
 *
 * Returns null if there are no options for this category.
 */
export default function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  if (options.length === 0) return null;

  const selectedCount = selected.length;
  const hasSelection = selectedCount > 0;
  const singleLabel = hasSelection
    ? options.find((o) => o.value === selected[0])?.label ?? selected[0]
    : null;
  const triggerLabel = hasSelection
    ? selectedCount === 1
      ? `${label}: ${singleLabel}`
      : `${label} (${selectedCount})`
    : label;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="badge badge-fire text-[10px] px-4 py-2 inline-flex items-center gap-2"
      >
        {triggerLabel}
        <span
          className="inline-block text-[8px] transition-transform duration-200 leading-none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▼
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 top-full left-0 mt-2 min-w-[220px] max-w-[calc(100vw-2rem)] max-h-80 overflow-y-auto bg-black/95 backdrop-blur-md border border-okra-bright/20 rounded-lg shadow-2xl shadow-okra-bright/5 py-2"
            role="listbox"
            aria-multiselectable="true"
          >
            {options.map((opt) => {
              const isSelected = selected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onToggle(opt.value)}
                  role="option"
                  aria-selected={isSelected}
                  className={
                    isSelected
                      ? 'w-full text-left px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-oo-neureal flex items-center gap-3 transition-colors duration-150 text-okra-bright bg-okra-bright/5'
                      : 'w-full text-left px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-oo-neureal flex items-center gap-3 transition-colors duration-150 text-white/60 hover:text-white hover:bg-white/5'
                  }
                >
                  <span
                    className={
                      isSelected
                        ? 'w-1.5 h-1.5 rounded-full transition-all shrink-0 bg-okra-bright shadow-[0_0_6px_#00ff00]'
                        : 'w-1.5 h-1.5 rounded-full transition-all shrink-0 bg-white/20'
                    }
                  />
                  {opt.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
