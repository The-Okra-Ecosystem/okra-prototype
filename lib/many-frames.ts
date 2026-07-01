/**
 * Scroll-driven hero frame manifest — many_frames (about page reveal).
 *
 * 90 frames present in /public/images/many_frames/
 * Naming: frame_001.webp … frame_090.webp (3-digit zero-pad, no gaps)
 *
 * 2026-06-05: added per user request "use the folder in images many_frames
 * to create a hero scrolling video in the about section". Replaces the
 * static <Hero /> at the top of /about with a scroll-driven film that
 * scrubs through all 90 frames as the user scrolls.
 */

const FOLDER = '/images/many_frames';

export const MANY_FRAMES: readonly string[] = Array.from(
  { length: 90 },
  (_, i) => `${FOLDER}/frame_${(i + 1).toString().padStart(3, '0')}.webp`
);

export const MANY_FRAMES_TOTAL = MANY_FRAMES.length;
export const MANY_FRAMES_MID = MANY_FRAMES[Math.floor(MANY_FRAMES.length / 2)];
