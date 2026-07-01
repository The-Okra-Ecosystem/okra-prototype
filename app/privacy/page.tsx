import Hero from "@/components/Hero";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Hero
        title="PRIVACY"
        subtitle="How we handle your data."
        imageKey="ABOUT"
      />

      <div className="container-custom py-32">
        <div className="max-w-3xl mx-auto space-y-12 text-white/60 font-oo-neureal leading-relaxed text-sm uppercase tracking-[0.1em]">
          <section className="space-y-4">
            <h2 className="text-2xl text-white font-oo-neureal">Information We Collect</h2>
            <p>We collect only the information you provide directly, such as your name and email address when you contact us. We do not track or sell your personal data.</p>
          </section>

          <div className="h-[1px] w-full bg-white/5" />

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-oo-neureal">How We Use It</h2>
            <p>Your information is used solely to respond to your inquiries, process collaborations, and improve the Okra Ecosystem experience.</p>
          </section>

          <div className="h-[1px] w-full bg-white/5" />

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-oo-neureal">Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at hello@okra.ecosystem.</p>
          </section>

          <div className="h-[1px] w-full bg-white/5" />

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-oo-neureal">Contact</h2>
            <p>Okra Ecosystem — Basel, Switzerland. Email: hello@okra.ecosystem</p>
          </section>
        </div>
      </div>
    </div>
  );
}
