import Image from 'next/image';
import { MEDIA_MANIFEST } from '@/lib/media-manifest';
import HeroButton from './HeroButton';

interface HeroButtonConfig {
  label: string;
  href: string;
  external?: boolean;
}

interface HeroProps {
  title: React.ReactNode;
  subtitle?: string;
  imageKey: string;
  theme?: 'dark' | 'light';
  /** Optional CTA rendered below the subtitle. */
  button?: HeroButtonConfig;
}

export default function Hero({ title, subtitle, imageKey, theme = 'dark', button }: HeroProps) {
  const imageSrc = MEDIA_MANIFEST.HEROES[imageKey as keyof typeof MEDIA_MANIFEST.HEROES];
  const altText = typeof title === 'string' ? title : 'OKRA';

  return (
    <section className={`relative h-screen flex flex-col justify-center overflow-hidden ${theme === 'light' ? 'bg-okra-paper text-okra-black' : 'bg-black text-white'}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={altText}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20 mix-blend-overlay bg-repeat bg-[length:200px_200px]" />
      </div>

      <div className="container-custom relative z-10 w-full text-left pt-36 lg:pt-56">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-oo-neureal leading-[0.85] mb-12 sm:mb-16 uppercase tracking-tighter text-okra-bright text-glow-bright">
          {title}
        </h1>
        {subtitle && (
          <p className={`max-w-xl text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-oo-neureal leading-relaxed text-glow-breathe ${theme === 'light' ? 'text-black/60' : 'text-okra-bright/80'}`}>
            {subtitle}
          </p>
        )}
        {button && (
          <div className="mt-8 sm:mt-10">
            <HeroButton
              label={button.label}
              href={button.href}
              external={button.external}
            />
          </div>
        )}
      </div>
    </section>
  );
}
