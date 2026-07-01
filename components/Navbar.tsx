'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { MEDIA_MANIFEST } from '@/lib/media-manifest';
import AnimatedCloseButton from './AnimatedCloseButton';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 }
  }
};

const linkVariants = {
  hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' }
};

const morphVariants = {
  enter: { opacity: 0, scale: 0.6, rotate: -120, filter: 'blur(12px)' },
  center: { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 1.4, rotate: 120, filter: 'blur(12px)' },
};

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Artists', href: '/artists' },
  { name: 'Events', href: '/events' },
  { name: 'Tickets', href: '/tickets' },
  { name: 'Ecosystem', href: '/ecosystem' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowIcon((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  if (pathname === '/coming-soon') {
    return null;
  }

  const isHome = pathname === '/';

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 pt-11 pb-6 transition-all duration-700",
        isHome && !scrolled
          ? "bg-transparent border-b border-transparent"
          : "bg-black/95 backdrop-blur-md border-b border-white/5"
      )}
    >
      <div className="container-custom flex justify-between items-center">
        <Link href="/" className="relative h-8 w-32 md:w-40 transition-opacity hover:opacity-80">
          <Image 
            src={MEDIA_MANIFEST.LOGOS.MAIN} 
            alt="OKRA" 
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm uppercase font-oo-neureal tracking-widest transition-all duration-300",
                  isActive ? "text-okra-bright text-glow-bright" : "text-white/50 hover:text-okra-bright"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button — morphing icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-okra-bright bright-pulse hover:text-white transition-colors duration-300 rounded-full p-1 flex items-center justify-center flex-shrink-0"
            aria-label="Open menu"
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {showIcon ? (
                  <motion.div
                    key="menu"
                    variants={morphVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Menu size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="eye"
                    variants={morphVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src="/images/more-logos/okra%20Eye%20Icon%20Poison.png"
                      alt="OKRA Eye"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', mass: 0.8, stiffness: 100, damping: 20 }}
              className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-black border-l border-white/5 z-50 flex flex-col pt-28 pb-12 px-10"
            >
              {/* Left accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-okra-bright/60 via-okra-bright/20 to-transparent" />
              <AnimatedCloseButton
                onClick={() => setMobileOpen(false)}
                className="absolute top-11 right-8"
              />
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6"
              >
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div key={link.href} variants={linkVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block text-2xl uppercase font-oo-neureal tracking-widest transition-all duration-300 py-1",
                          isActive
                            ? "text-okra-bright text-glow-bright"
                            : "text-white/50 hover:text-okra-bright"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
