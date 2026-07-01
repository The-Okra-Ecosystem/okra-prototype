import Hero from "@/components/Hero";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Hero
        title="CONNECT"
        subtitle="Reach out to the Okra Ecosystem."
        imageKey="CONTACT"
        button={{ label: 'Bookings / Press', href: 'mailto:katie@weareokra.ch' }}
      />

      <div className="container-custom py-32">
        <div className="max-w-2xl mx-auto space-y-16">
          <div className="space-y-6 text-center">
            <h2 className="text-5xl md:text-6xl font-oo-neureal text-okra-bright">
              INITIALIZE CONNECTION
            </h2>
            <p className="text-white/50 font-oo-neureal uppercase tracking-[0.2em] text-sm">
              For bookings, collaborations, and inquiries
            </p>
          </div>

          <div className="space-y-8">
            {[
              { label: "Bookings", value: "bookings@okra.ecosystem" },
              { label: "Press", value: "press@okra.ecosystem" },
              { label: "General", value: "hello@okra.ecosystem" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center border-b border-white/5 py-6 group"
              >
                <span className="text-white/40 text-sm uppercase tracking-[0.3em]">
                  {item.label}
                </span>
                <span className="text-white/80 text-lg font-oo-neureal group-hover:text-okra-bright transition-colors">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-okra-bright/20 to-transparent" />

          <p className="text-white/30 text-xs uppercase tracking-[0.4em] text-center leading-relaxed">
            Basel, Switzerland — The Okra Ecosystem
          </p>
        </div>
      </div>
    </div>
  );
}
