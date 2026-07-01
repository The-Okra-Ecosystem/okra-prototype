import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AboutTopicBlockProps {
  /** Topic index, 1–5. Rendered as "Question 01 of 05". */
  index: number;
  /** Total number of topics (for the "of 05" label). Defaults to 5. */
  total?: number;
  /** Short topic name, e.g. "SURVIVAL". */
  topic: string;
  /** The framing question, e.g. "Do you make a living from this? Is this sustainable?" */
  question: string;
  /** Body copy from the artist's perspective. */
  artistAnswer: React.ReactNode;
  /** Body copy from the venue/organiser's perspective. */
  venueAnswer: React.ReactNode;
  /** A short closing pull quote, rendered large in okra-bright. */
  pullQuote: string;
  /** Optional portrait / visual for the side panel. */
  portrait?: React.ReactNode;
  /** When true, flip the image+text orientation. */
  flip?: boolean;
}

/**
 * The single editorial block used by the About page. Each of the 5
 * questions on the page is one of these. Layout:
 *
 *  Mobile:    portrait (square) on top, then text
 *  Desktop:   two columns, image sticky on the side, text in the main column
 *
 * The "flip" prop alternates left/right placement on desktop to keep the
 * page from feeling like five identical rectangles.
 */
export default function AboutTopicBlock({
  index,
  total = 5,
  topic,
  question,
  artistAnswer,
  venueAnswer,
  pullQuote,
  portrait,
  flip = false,
}: AboutTopicBlockProps) {
  return (
    <section
      id={`topic-${index.toString().padStart(2, '0')}`}
      data-topic-index={index}
      className="relative bg-black overflow-hidden py-24 md:py-36 lg:py-48"
    >
      {/* Subtle background rule */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-okra-bright/15 to-transparent"
      />

      <div className="container-custom relative z-10">
        <div
          className={cn(
            'grid gap-12 lg:gap-20 items-start',
            'grid-cols-1 lg:grid-cols-12',
          )}
        >
          {/* Portrait column — order flips on desktop based on `flip` */}
          <div
            className={cn(
              'lg:col-span-5 lg:sticky lg:top-32',
              flip ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            {portrait ?? (
              // Editorial placeholder if no portrait supplied
              <div className="aspect-[4/5] w-full border border-okra-bright/20 bg-black/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,60,0,0.18)_0%,transparent_70%)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-okra-bright/70 font-oo-neureal">
                    PORTRAIT — ASSET PENDING
                  </span>
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-oo-neureal">
                    topic-{index.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Text column */}
          <div
            className={cn(
              'lg:col-span-7',
              flip ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] uppercase tracking-[0.5em] text-okra-bright font-oo-neureal">
                / Question {index.toString().padStart(2, '0')} of {total.toString().padStart(2, '0')}
              </span>
              <div className="h-[1px] w-12 bg-okra-bright/30" />
            </div>

            <h2 className="text-5xl md:text-7xl font-oo-neureal leading-[0.9] tracking-tighter uppercase text-okra-bright text-glow-bright mb-6">
              {topic}
            </h2>

            <p className="text-lg md:text-xl text-white/80 font-oo-neureal leading-snug font-light mb-12 italic max-w-2xl">
              {question}
            </p>

            <div className="space-y-12 max-w-2xl">
              <div>
                <h3 className="text-xs uppercase tracking-[0.4em] text-okra-bright/70 font-oo-neureal mb-4">
                  / The Artist
                </h3>
                <div className="space-y-4 text-base md:text-lg text-white/65 font-oo-neureal leading-relaxed">
                  {artistAnswer}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.4em] text-okra-fire/80 font-oo-neureal mb-4">
                  / The Venue / Organiser
                </h3>
                <div className="space-y-4 text-base md:text-lg text-white/65 font-oo-neureal leading-relaxed">
                  {venueAnswer}
                </div>
              </div>
            </div>

            <blockquote className="mt-16 pt-12 border-t border-okra-bright/20">
              <p className="text-2xl md:text-4xl font-oo-neureal leading-[1.1] text-okra-bright text-glow-bright uppercase tracking-tight max-w-2xl">
                {pullQuote}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
