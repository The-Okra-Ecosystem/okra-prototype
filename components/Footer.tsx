import Link from 'next/link';
import Image from 'next/image';
import { MEDIA_MANIFEST } from '@/lib/media-manifest';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 pt-40 pb-16 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-okra-bright/5 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10 text-center md:text-left">
        <div className="h-8" />
        {/* Newsletter Signup */}
        <div className="max-w-lg mx-auto md:mx-0">
          <h4 className="text-okra-bright text-xs uppercase tracking-[0.4em] mb-4">Stay in the Loop</h4>
          <div className="h-4" />
          <p className="text-[10px] uppercase tracking-[0.15em] text-okra-bright text-glow-breathe leading-relaxed">
            Early access to events, panel talks, mentorships, films, and ticket drops.
          </p>
          <div className="h-2" />
          <form
            action={`mailto:katie@weareokra.ch`}
            method="post"
            encType="text/plain"
            className="flex flex-col sm:flex-row"
          >
            <div className="flex-1">
              <input
                type="email"
                name="email"
                placeholder="janedoe@gmail.com"
                required
                className="w-full px-4 py-2.5 bg-white/5 border border-okra-bright rounded-full text-xs text-okra-bright font-oo-neureal uppercase tracking-[0.15em] placeholder:text-okra-bright/40 outline-none border-glow-breathe focus:text-glow-breathe transition-all duration-300"
              />
            </div>
            <div className="h-2 sm:w-2 sm:h-auto" />
            <button
              type="submit"
              className="badge-cta text-sm px-6 py-3 border-glow-breathe-fire shrink-0"
            >
              Subscribe →
            </button>
          </form>
        </div>

        <div className="h-8" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <Link href="/" className="relative h-10 w-40 block bright-pulse rounded-sm">
              <Image 
                src={MEDIA_MANIFEST.LOGOS.MAIN} 
                alt="OKRA" 
                fill
                className="object-contain object-center md:object-left"
              />
            </Link>
            <div className="h-4" />
            <p className="text-okra-bright text-glow-bright max-w-sm text-[10px] leading-relaxed font-oo-neureal uppercase tracking-wider mx-auto md:mx-0">
              Pioneers of underground sound, arts, and culture. <br />
              A safe haven for radical creative expression.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-okra-bright text-xs uppercase tracking-[0.4em] mb-8">Navigate</h4>
            <ul className="space-y-4">
              <li><Link href="/artists" className="text-sm text-white/50 hover:text-okra-bright active:text-okra-bright active:text-glow-bright transition-all duration-300 uppercase tracking-widest block">Artists</Link></li>
              <li><Link href="/events" className="text-sm text-white/50 hover:text-okra-bright active:text-okra-bright active:text-glow-bright transition-all duration-300 uppercase tracking-widest block">Events</Link></li>
              <li><Link href="/tickets" className="text-sm text-white/50 hover:text-okra-bright active:text-okra-bright active:text-glow-bright transition-all duration-300 uppercase tracking-widest block">Tickets</Link></li>
              <li><Link href="/ecosystem" className="text-sm text-white/50 hover:text-okra-bright active:text-okra-bright active:text-glow-bright transition-all duration-300 uppercase tracking-widest block">Ecosystem</Link></li>
              <li><Link href="/blog" className="text-sm text-white/50 hover:text-okra-bright active:text-okra-bright active:text-glow-bright transition-all duration-300 uppercase tracking-widest block">Blog</Link></li>
              <li><Link href="/about" className="text-sm text-white/50 hover:text-okra-bright active:text-okra-bright active:text-glow-bright transition-all duration-300 uppercase tracking-widest block">About</Link></li>
            </ul>
          </div>

          {/* Social Column */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-okra-bright text-xs uppercase tracking-[0.4em] mb-8">Connect</h4>
            <ul className="space-y-4">
              <li><Link href="/coming-soon" className="text-sm text-white/50 hover:text-okra-bright active:text-okra-bright active:text-glow-bright transition-all duration-300 uppercase tracking-widest block">Gallery</Link></li>
              <li><Link href="/events" className="text-sm text-white/50 hover:text-okra-bright active:text-okra-bright active:text-glow-bright transition-all duration-300 uppercase tracking-widest block">Events</Link></li>
              <li><Link href="/contact" className="text-sm text-white/50 hover:text-okra-bright active:text-okra-bright active:text-glow-bright transition-all duration-300 uppercase tracking-widest block">Bookings</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col items-center pt-12 mt-1 border-t border-white/5 gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.5em] text-okra-bright">
              © {new Date().getFullYear()} Okra Ecosystem — Switzerland
            </p>
            <a 
              href="https://gittensmarketingholding.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[12px] text-okra-bright hover:text-white transition-colors uppercase tracking-widest"
            >
              Web Design By GMH Inc.
            </a>
          </div>
          <div className="flex gap-8">
             <Link href="/privacy" className="text-[10px] uppercase tracking-[0.5em] text-white/20 hover:text-white transition-colors">Privacy</Link>
             <Link href="/terms" className="text-[10px] uppercase tracking-[0.5em] text-white/20 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
