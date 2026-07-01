/**
 * Scroll-driven hero frame manifest — Foncé (artists page reveal).
 *
 * 148 frames present in /public/images/foncé-hero/
 * Frames 146 and 148 are intentionally missing from the source folder.
 *
 * Mirror the structure of this file for new artists.
 */

const FOLDER = '/images/fonc%C3%A9-hero';
const TOTAL_IN_RANGE = 150;
const MISSING_FRAMES = new Set([146, 148]);

export const FONCE_HERO_FRAMES: readonly string[] = Array.from(
  { length: TOTAL_IN_RANGE },
  (_, i) => {
    const num = i + 1;
    if (MISSING_FRAMES.has(num)) return null;
    return `${FOLDER}/frame_${num.toString().padStart(3, '0')}.webp`;
  }
).filter((frame): frame is string => frame !== null);

export const FONCE_HERO_FRAMES_TOTAL = FONCE_HERO_FRAMES.length;
export const FONCE_HERO_FRAMES_MID = FONCE_HERO_FRAMES[Math.floor(FONCE_HERO_FRAMES.length / 2)];
