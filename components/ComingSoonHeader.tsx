'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MEDIA_MANIFEST } from '@/lib/media-manifest';

export default function ComingSoonHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-12 pb-6 flex justify-center items-center pointer-events-none">
      <div className="container-custom flex justify-center items-center pointer-events-auto">
        <Link href="/" className="relative h-8 w-32 md:w-40 transition-opacity hover:opacity-80 block">
          <Image 
            src={MEDIA_MANIFEST.LOGOS.MAIN} 
            alt="OKRA" 
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
