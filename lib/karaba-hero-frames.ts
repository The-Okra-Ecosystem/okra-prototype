/**
 * Scroll-driven hero frame manifest — KA-RABA (home page reveal).
 *
 * 109 frames present in /public/images/karaba-hero/
 * 6 frames intentionally missing from the source folder.
 */

const FOLDER = '/images/karaba-hero';
const TOTAL_IN_RANGE = 115;
const MISSING_FRAMES = new Set([23, 100, 102, 105, 110, 112]);

export const KARABA_HERO_FRAMES: readonly string[] = Array.from(
  { length: TOTAL_IN_RANGE },
  (_, i) => {
    const num = i + 1;
    if (MISSING_FRAMES.has(num)) return null;
    return `${FOLDER}/frame_${num.toString().padStart(3, '0')}.webp`;
  }
).filter((frame): frame is string => frame !== null);

export const KARABA_HERO_FRAMES_TOTAL = KARABA_HERO_FRAMES.length;
export const KARABA_HERO_FRAMES_MID = KARABA_HERO_FRAMES[Math.floor(KARABA_HERO_FRAMES.length / 2)];
