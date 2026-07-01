'use client';

import { useRef, useEffect } from 'react';
import {
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import HeroButton from './HeroButton';

interface HeroButtonConfig {
  label: string;
  href: string;
  external?: boolean;
}

interface ScrollFrameFilmProps {
  /**
   * Ordered array of frame image URLs. Will be pre-decoded into in-memory
   * `Image` objects on mount. Missing frames are NOT pre-filtered here —
   * pass the array as-is from the manifest (manifests already skip gaps).
   */
  frames: readonly string[];
  /** Optional overlay headline rendered above the canvas. */
  title?: React.ReactNode;
  /** Optional overlay subline. */
  subtitle?: string;
  /**
   * Optional CTA rendered below the subtitle. Uses the shared `HeroButton`
   * component (`btn-premium` styling + scroll-active glow).
   */
  button?: HeroButtonConfig;
  /**
   * Scroll length, in viewport heights, to traverse the full sequence.
   * 9vh aligns with ~13-17fps playback at typical scroll speed on a
   * 148-frame film — slow, cinematic, Apple-product-page pacing.
   * @default 9
   */
  scrollLengthVh?: number;
  /** Accessible label for the section. */
  ariaLabel?: string;
  /** Reduced-motion alt text for the static fallback. */
  altText?: string;
  /**
   * Position of the text overlay.
   *
   * - `'default'` — responsive: center-center on mobile + tablet
   *   (< sm, 640px), text-left with the original top padding offset on
   *   larger viewports (sm+). Matches the home page baseline.
   * - `'center-left-bottom'` — fixed bottom-left block, center-aligned
   *   text within the block. Applied on all viewports. Used on /about.
   * - `'top-cta-bottom'` — title + subtitle at the top of the sticky
   *   shell (text-center on mobile, text-left sm+), CTA button pinned
   *   to the bottom of the sticky shell with a generous pb offset.
   *   Used on /tickets.
   *
   * @default 'default'
   */
  position?: 'default' | 'center-left-bottom' | 'top-cta-bottom';
  /**
   * Vertical shift applied to the text overlay only (the canvas and
   * scroll film stay put). Value in rem. Positive = down, negative = up.
   * Applied as `transform: translateY(Nrem)`.
   *
   * @default 0
   */
  verticalShiftRem?: number;
}

/**
 * Scroll-driven frame-swap hero using a pre-decoded canvas.
 *
 * This is the protocol Pattern A — see docs/scroll-animation-protocol.md.
 *
 * Why canvas (not `<img key={frame}>`):
 *  - Pre-decoding all frames into Image objects eliminates fetch+decode
 *    latency on every swap.
 *  - Canvas draws are pure GPU operations, no React re-render, no DOM
 *    mutation, no remount — that removes the "black flash between frames"
 *    artifact of the img-key approach.
 *  - requestAnimationFrame coalesces multiple scroll events into one draw
 *    per display refresh.
 *
 * Why triple-frame additive blend (not discrete 2-frame cross-fade):
 *  - The scroll input is continuous; mapping it to discrete frame indices
 *    creates a "frame by frame" feel that's visibly stop-motion at slow
 *    scroll speeds.
 *  - We use the float `exact` position (latest × maxIndex) and blend THREE
 *    adjacent frames additively using `globalCompositeOperation = 'lighter'`:
 *      - frame[index-1] ("ghost") at sin(π·t) · 0.12 — motion-blur halo
 *      - frame[index]      at (1 - ghost) · (1 - t_eased)
 *      - frame[index+1]    at (1 - ghost) · t_eased
 *    where t_eased = easeInOutCubic(t). The ghost peaks mid-transition,
 *    giving each frame a subtle "trail" that reads as motion blur rather
 *    than a stop-motion snap.
 *  - Additive blending gives a true weighted sum (no over/underdraw);
 *    weights are renormalized each frame so output is bounded to [0, 1].
 *  - Snap threshold lowered to 0.0001 (essentially "never snap") so even
 *    micro-scrolls produce a cross-fade.
 *  - Combined with the animated grain (`grain-shift` keyframe) and
 *    static vignette overlay, the result reads as cinema-grade, not
 *    PowerPoint-grade.
 *
 * Used by:
 *  - /              (home page, KA-RABA reveal)
 *  - /about         (about page, History montage, center-left-bottom layout)
 *  - /artists       (artists page, Foncé reveal)
 *  - /events        (events page, Toulouse crowd reveal)
 *  - /tickets       (tickets page, Foncé/Arsenic reveal, top-cta-bottom layout)
 */
export default function ScrollFrameFilm({
  frames,
  title,
  subtitle,
  button,
  scrollLengthVh = 9,
  ariaLabel = 'Scroll-driven film',
  altText = 'OKRA scroll reveal',
  position = 'default',
  verticalShiftRem = 0,
}: ScrollFrameFilmProps) {
  /**
   * Text overlay container className. Three layouts:
   *  - default: responsive (center-center < sm, text-left with original
   *    pt-36 / pt-56 top padding at sm+ and lg+ respectively)
   *  - center-left-bottom: block anchored to bottom-left of the viewport,
   *    text-center alignment inside the block, all viewports
   *  - top-cta-bottom: title + subtitle at the top of the sticky shell
   *    (text-center on mobile, text-left sm+), CTA button pinned to the
   *    bottom of the shell via `mt-auto` on the button wrapper
   */
  const overlayClass =
    position === 'center-left-bottom'
      ? 'container-custom relative z-10 w-full h-full flex flex-col justify-end items-start text-center pb-12 sm:pb-20 md:pb-24'
      : position === 'top-cta-bottom'
      ? 'container-custom relative z-10 w-full h-full flex flex-col items-center sm:items-start text-center sm:text-left pt-12 sm:pt-36 lg:pt-56 pb-12 sm:pb-20 md:pb-24'
      : 'container-custom relative z-10 w-full h-full flex flex-col justify-center items-center text-center pt-0 sm:text-left sm:pt-36 lg:pt-56';

  /**
   * Button wrapper class. For the 'top-cta-bottom' layout, the wrapper
   * uses `mt-auto self-center` to pin the button to the bottom-center
   * of the sticky shell (overriding the parent's `sm:items-start`).
   * For the other layouts, a small `mt-8 sm:mt-10` keeps the button
   * close to the subtitle inside the centered group.
   */
  const buttonWrapperClass =
    position === 'top-cta-bottom' ? 'mt-auto self-center' : 'mt-8 sm:mt-10';

  /**
   * Optional inline style for vertical shift. Applied to the overlay
   * container only; the canvas and sticky scroll shell are unaffected.
   */
  const overlayStyle =
    verticalShiftRem !== 0
      ? { transform: `translateY(${-verticalShiftRem}rem)` }
      : undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(frames.length).fill(null)
  );
  // Float position in [0, max] driving the cross-fade blend.
  // -1 sentinel = never drawn yet (used by resize guard).
  const lastExactRef = useRef<number>(-1);
  // Float position queued for the next animation frame.
  const pendingExactRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const reducedMotion = useReducedMotion();
  const totalFrames = frames.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Compute "object-fit: cover" draw parameters.
  const computeDrawParams = (
    img: HTMLImageElement,
    targetW: number,
    targetH: number
  ) => {
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const wrapperAspect = targetW / targetH;
    if (imgAspect > wrapperAspect) {
      const drawH = targetH;
      const drawW = drawH * imgAspect;
      return { drawW, drawH, drawX: (targetW - drawW) / 2, drawY: 0 };
    }
    const drawW = targetW;
    const drawH = drawW / imgAspect;
    return { drawW, drawH, drawX: 0, drawY: (targetH - drawH) / 2 };
  };

  // Snap threshold — below this `t` we treat the position as exactly on a
  // frame and draw a single frame at full alpha. Lower = smoother (more
  // cross-fade visible at the boundaries), but more draw calls.
  // 0.0001 = essentially "never snap", giving a continuous dissolve.
  const SNAP_THRESHOLD = 0.0001;

  // Max weight given to the "ghost" frame (index - 1) for motion-blur feel.
  // Drawn additively at low alpha, peaks at t = 0.5.
  const GHOST_PEAK = 0.12;

  // Cubic ease-in-out for the blend factor. Slows the blend at the
  // boundaries so each frame feels "anchored" before the cross-fade takes
  // over, then accelerates through the middle for a smooth handoff.
  const easeInOutCubic = (x: number) =>
    x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  // Draw the frame at the given float position `exact` (in [0, max]) to the
  // canvas. Uses an Apple-style triple-frame blend:
  //
  //   exact    continuous scroll position, mapped to [0, max]
  //   index    floor(exact) — the dominant frame
  //   t        exact - index — raw blend factor in [0, 1] toward frame[i+1]
  //   t_eased  easeInOutCubic(t) — softened blend factor
  //
  // The canvas is cleared, then three frames are drawn additively
  // (composite 'lighter') with weights that always sum to 1:
  //
  //   ghost (frame[index-1])   = sin(π·t) · GHOST_PEAK        peaks at t=0.5
  //   current (frame[index])    = (1 - ghost) · (1 - t_eased)
  //   next    (frame[index+1])  = (1 - ghost) · t_eased
  //
  // This gives a true weighted sum (no over/underdraw) and produces a
  // motion-blur halo around each frame for a cinema-like feel.
  //
  // Fallback cases:
  //   - dominant frame not decoded  → leave canvas as-is
  //   - t below SNAP_THRESHOLD      → single-frame draw at alpha 1
  //   - last frame or next missing  → two-frame cross-fade only
  const drawFrame = (exact: number) => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const cssW = wrapper.clientWidth;
    const cssH = wrapper.clientHeight;
    if (cssW === 0 || cssH === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const targetW = Math.floor(cssW * dpr);
    const targetH = Math.floor(cssH * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const max = totalFrames - 1;
    const clamped = Math.max(0, Math.min(max, exact));
    const index = Math.floor(clamped);
    const t = clamped - index;
    const nextIndex = index + 1;
    const tEased = easeInOutCubic(t);

    const a = imagesRef.current[index];
    const b = nextIndex <= max ? imagesRef.current[nextIndex] : null;
    const g = index > 0 ? imagesRef.current[index - 1] : null;
    const aReady = !!(a && a.complete && a.naturalWidth > 0);
    const bReady = !!(b && b.complete && b.naturalWidth > 0);
    const gReady = !!(g && g.complete && g.naturalWidth > 0);

    ctx.clearRect(0, 0, targetW, targetH);

    if (!aReady) {
      // Dominant frame not decoded yet — leave canvas as-is.
      lastExactRef.current = clamped;
      return;
    }

    if (t < SNAP_THRESHOLD || !bReady) {
      // Pure single-frame draw.
      ctx.globalAlpha = 1;
      const { drawW, drawH, drawX, drawY } = computeDrawParams(a, targetW, targetH);
      ctx.drawImage(a, drawX, drawY, drawW, drawH);
    } else {
      // Triple-frame additive blend for motion-blur cinema feel.
      const ghostWeight = Math.sin(Math.PI * t) * GHOST_PEAK;
      const mainScale = 1 - ghostWeight;
      const paramsA = computeDrawParams(a, targetW, targetH);
      const paramsB = computeDrawParams(b, targetW, targetH);

      ctx.globalCompositeOperation = 'lighter';

      // 1. Ghost of previous frame (only if ready, only mid-blend).
      if (gReady && ghostWeight > 0.001) {
        const paramsG = computeDrawParams(g, targetW, targetH);
        ctx.globalAlpha = ghostWeight;
        ctx.drawImage(g, paramsG.drawX, paramsG.drawY, paramsG.drawW, paramsG.drawH);
      }

      // 2. Current frame, scaled down to make room for the next.
      ctx.globalAlpha = mainScale * (1 - tEased);
      ctx.drawImage(a, paramsA.drawX, paramsA.drawY, paramsA.drawW, paramsA.drawH);

      // 3. Next frame.
      ctx.globalAlpha = mainScale * tEased;
      ctx.drawImage(b, paramsB.drawX, paramsB.drawY, paramsB.drawW, paramsB.drawH);

      // Reset compositing state.
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    lastExactRef.current = clamped;
  };

  // Coalesce multiple scroll-driven calls into one draw per display frame.
  const scheduleDraw = (exact: number) => {
    pendingExactRef.current = exact;
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      drawFrame(pendingExactRef.current);
    });
  };

  // Pre-decode all frames on mount.
  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    const imgs: (HTMLImageElement | null)[] = new Array(totalFrames).fill(null);

    frames.forEach((src, i) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      imgs[i] = img;

      const onReady = () => {
        if (cancelled) return;
        imagesRef.current = imgs;
        if (i === 0) scheduleDraw(0);
      };

      if (img.complete) onReady();
      else {
        img.addEventListener('load', onReady, { once: true });
        img.addEventListener('error', onReady, { once: true });
      }
    });

    imagesRef.current = imgs;

    // Redraw on resize, preserving the current cross-fade position.
    const handleResize = () => {
      if (lastExactRef.current >= 0) {
        requestAnimationFrame(() => drawFrame(lastExactRef.current));
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      imgs.forEach((img) => img && (img.src = ''));
    };
  }, [frames, totalFrames, reducedMotion]);

  // Drive the float frame position from scroll progress.
  // We pass the continuous (unrounded) value so drawFrame can blend adjacent
  // frames for a life-like dissolve at slow scroll speeds.
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (reducedMotion) return;
    const max = totalFrames - 1;
    const exact = Math.max(0, Math.min(max, latest * max));
    scheduleDraw(exact);
  });

  // Reduced motion: static middle frame, no scroll-driven swap.
  if (reducedMotion) {
    const midFrame = frames[Math.floor(totalFrames / 2)];
    return (
      <section className="relative h-screen w-full bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={midFrame}
            alt={altText}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20 mix-blend-overlay bg-repeat bg-[length:200px_200px] grain-shift" />
          <div className="absolute inset-0 vignette" />
        </div>
        {(title || subtitle) && (
          <div className={overlayClass} style={overlayStyle}>
            {title && (
              <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-oo-neureal leading-[0.85] mb-12 sm:mb-16 uppercase tracking-tighter text-okra-bright text-glow-bright">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="max-w-xl text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-oo-neureal leading-relaxed text-glow-breathe text-okra-bright/80">
                {subtitle}
              </p>
            )}
            {button && (
              <div className={buttonWrapperClass}>
                <HeroButton
                  label={button.label}
                  href={button.href}
                  external={button.external}
                />
              </div>
            )}
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${scrollLengthVh * 100}vh` }}
      aria-label={ariaLabel}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={wrapperRef} className="absolute inset-0 z-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20 mix-blend-overlay bg-repeat bg-[length:200px_200px] grain-shift pointer-events-none" />
          <div className="absolute inset-0 vignette pointer-events-none" />
        </div>

        {(title || subtitle) && (
          <div className={overlayClass} style={overlayStyle}>
            {title && (
              <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-oo-neureal leading-[0.85] mb-12 sm:mb-16 uppercase tracking-tighter text-okra-bright text-glow-bright">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="max-w-xl text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-oo-neureal leading-relaxed text-glow-breathe text-okra-bright/80">
                {subtitle}
              </p>
            )}
            {button && (
              <div className={buttonWrapperClass}>
                <HeroButton
                  label={button.label}
                  href={button.href}
                  external={button.external}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
