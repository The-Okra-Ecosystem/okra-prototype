/**
 * Scroll-driven hero frame manifest — arsenic-fonce (tickets page reveal).
 *
 * 52 frames present in /public/images/arsenic-fonce/
 * 3 frames intentionally missing from the source folder.
 *
 * 2026-06-05: added per user instruction. Replaces the inline static
 * hero on /tickets with the same ScrollFrameFilm protocol used by
 * /, /about, /artists, /events.
 */

const FOLDER = '/images/arsenic-fonce';
const TOTAL_IN_RANGE = 55;
const MISSING_FRAMES = new Set([15, 26, 53]);

export const ARSENIC_FONCE_FRAMES: readonly string[] = Array.from(
  { length: TOTAL_IN_RANGE },
  (_, i) => {
    const num = i + 1;
    if (MISSING_FRAMES.has(num)) return null;
    return `${FOLDER}/frame_${num.toString().padStart(3, '0')}.webp`;
  }
).filter((frame): frame is string => frame !== null);

export const ARSENIC_FONCE_FRAMES_TOTAL = ARSENIC_FONCE_FRAMES.length;
export const ARSENIC_FONCE_FRAMES_MID = ARSENIC_FONCE_FRAMES[Math.floor(ARSENIC_FONCE_FRAMES.length / 2)];
