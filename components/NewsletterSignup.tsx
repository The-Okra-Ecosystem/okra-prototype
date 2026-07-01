'use client';

import { useState } from 'react';
import { MAIL_ADDRESS } from '@/lib/constants';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const subject = encodeURIComponent('Newsletter Signup');
    const body = encodeURIComponent(
      `Please add me to the Okra newsletter.\n\nEmail: ${email.trim()}`
    );
    window.open(`mailto:${MAIL_ADDRESS}?subject=${subject}&body=${body}`);
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section className="py-32">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-okra-bright/40 bg-okra-bright/10 mb-8">
              <span className="text-okra-bright text-2xl">✓</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-oo-neureal uppercase tracking-tighter text-okra-bright text-glow-bright mb-4">
              You&apos;re In
            </h2>
            <p className="text-sm text-white/50 font-oo-neureal uppercase tracking-[0.15em] leading-relaxed">
              Check your email client to confirm. We&apos;ll keep you posted on the next wave of Okra events, panel talks, mentorships, films, and ticket drops.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-oo-neureal">
            / Stay Connected
          </span>
          <h2 className="text-4xl md:text-6xl font-oo-neureal uppercase tracking-tighter text-okra-bright text-glow-bright leading-[0.9] mb-6 mt-6">
            Never Miss a Drop
          </h2>
          <p className="text-sm md:text-base text-white/50 font-oo-neureal uppercase tracking-[0.1em] leading-relaxed mb-10 max-w-lg mx-auto">
            Get early access to upcoming Okra events — panel talks, mentorships, films, and ticket releases — straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-full text-sm text-white font-oo-neureal uppercase tracking-[0.15em] placeholder:text-white/20 outline-none focus:border-okra-bright/50 focus:shadow-[0_0_20px_rgba(0,255,0,0.15)] transition-all duration-300"
            />
            <button
              type="submit"
              className="badge badge-fire text-[10px] px-8 py-3 shrink-0"
            >
              Subscribe →
            </button>
          </form>

          <p className="text-[9px] uppercase tracking-[0.3em] text-white/10 mt-6">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
