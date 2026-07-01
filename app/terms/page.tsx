import Hero from "@/components/Hero";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Hero
        title="TERMS"
        subtitle="Conditions of use."
        imageKey="ABOUT"
      />

      <div className="container-custom py-32">
        <div className="max-w-3xl mx-auto space-y-12 text-white/60 font-oo-neureal leading-relaxed text-sm uppercase tracking-[0.1em]">
          <section className="space-y-4">
            <h2 className="text-2xl text-white font-oo-neureal">Use of Content</h2>
            <p>All content on this website is the property of the Okra Ecosystem and its contributors. Unauthorized reproduction or distribution is prohibited.</p>
          </section>

          <div className="h-[1px] w-full bg-white/5" />

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-oo-neureal">Intellectual Property</h2>
            <p>The Okra name, logo, and all related branding are trademarks of the Okra Ecosystem. All artist works displayed remain the intellectual property of their respective creators.</p>
          </section>

          <div className="h-[1px] w-full bg-white/5" />

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-oo-neureal">Limitation of Liability</h2>
            <p>The Okra Ecosystem provides this website on an &ldquo;as is&rdquo; basis. We make no warranties regarding the availability or accuracy of the content.</p>
          </section>

          <div className="h-[1px] w-full bg-white/5" />

          <section className="space-y-4">
            <h2 className="text-2xl text-white font-oo-neureal">Contact</h2>
            <p>For any legal inquiries, contact us at hello@okra.ecosystem.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
