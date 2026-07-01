/**
 * Scroll-driven hero frame manifest — Toulouse crowd (events page reveal).
 *
 * 155 frames present in /public/images/toulouse-crowd-hero/
 * No gaps in the 1-155 range.
 *
 * Total weight ~11.6MB (frames are higher-res than the other two folders,
 * ~75KB per frame vs ~40KB). Still acceptable for desktop broadband;
 * consider a 480w/960w variant ladder if mobile-3G LCP suffers.
 */

const FOLDER = '/images/toulouse-crowd-hero';
const TOTAL_IN_RANGE = 155;
const MISSING_FRAMES = new Set<number>([]);

export const TOULOUSE_CROWD_HERO_FRAMES: readonly string[] = Array.from(
  { length: TOTAL_IN_RANGE },
  (_, i) => {
    const num = i + 1;
    if (MISSING_FRAMES.has(num)) return null;
    return `${FOLDER}/frame_${num.toString().padStart(3, '0')}.webp`;
  }
).filter((frame): frame is string => frame !== null);

export const TOULOUSE_CROWD_HERO_FRAMES_TOTAL = TOULOUSE_CROWD_HERO_FRAMES.length;
export const TOULOUSE_CROWD_HERO_FRAMES_MID =
  TOULOUSE_CROWD_HERO_FRAMES[Math.floor(TOULOUSE_CROWD_HERO_FRAMES.length / 2)];
