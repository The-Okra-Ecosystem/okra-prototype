import Image from "next/image";

export default function HeroParallax() {
  return (
    <section className="relative h-screen w-full bg-okra-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/heroes/home-hero.webp"
          alt="OKRA Ecosystem"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-okra-black via-okra-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Text Layer */}
      <div className="relative z-10 h-full container-custom flex flex-col justify-center items-center text-center pointer-events-none">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-oo-neureal leading-[0.85] tracking-tighter text-glow-bright text-white drop-shadow-2xl">
          ENTER THE<br />ECOSYSTEM
        </h1>
        <p className="mt-8 text-xs sm:text-sm md:text-base font-oo-neureal uppercase tracking-[0.25em] text-okra-paper/80 font-medium max-w-lg mx-auto">
          A safe haven for sonic exploration
        </p>
      </div>
    </section>
  );
}
