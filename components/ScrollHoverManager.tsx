'use client';

import { useEffect } from 'react';

export default function ScrollHoverManager() {
  useEffect(() => {
    // Only run on mobile/touch devices if preferred, but user said "mobile responsiveness"
    // so we can check window width or just let it run globally.
    
    const options = {
      root: null, // use the viewport
      rootMargin: '-45% 0px -45% 0px', // target the center 10%
      threshold: 0
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-scrolled-active');
        } else {
          entry.target.classList.remove('is-scrolled-active');
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    // Target elements: buttons, groups, and any element with the data-scroll-hover attribute
    const refreshTargets = () => {
      const targets = document.querySelectorAll('.btn-premium, .group, [data-scroll-hover], .hover-trigger');
      targets.forEach(target => observer.observe(target));
    };

    refreshTargets();

    // Re-run if content changes (e.g. hydration)
    const mutationObserver = new MutationObserver(refreshTargets);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}
