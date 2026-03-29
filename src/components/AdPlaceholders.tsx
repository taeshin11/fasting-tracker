'use client';

import { useEffect, useRef } from 'react';

// -- Generic loader: injects a <script> tag into a container once --
function useAdScript(containerId: string, scriptSrc: string, atOptions?: Record<string, unknown>) {
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const container = document.getElementById(containerId);
    if (!container) return;

    if (atOptions) {
      const optScript = document.createElement('script');
      optScript.textContent = `atOptions = ${JSON.stringify(atOptions)};`;
      container.appendChild(optScript);
    }

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = scriptSrc;
    container.appendChild(script);
  }, [containerId, scriptSrc, atOptions]);
}

// -- Native Banner (between content sections) --
export function AdPlaceholder({ id, minHeight = 100, className = '' }: {
  id: string;
  minHeight?: number;
  label?: string;
  className?: string;
}) {
  useAdScript(
    id,
    'https://pl29011759.profitablecpmratenetwork.com/1e8badd234db95319b6c25b8c209a2ec/invoke.js',
  );
  return <div id={id} className={`ad-container w-full text-center ${className}`} style={{ minHeight }} />;
}

// -- Banner Top: 728x90 desktop, 320x50 mobile --
export function BannerTopAd() {
  useAdScript('adsterra-banner-top-desktop', 'https://www.highperformanceformat.com/c91b6d647673fe8f5ee9ae3ce23d7fd7/invoke.js', {
    key: 'c91b6d647673fe8f5ee9ae3ce23d7fd7',
    format: 'iframe',
    height: 90,
    width: 728,
    params: {},
  });
  useAdScript('adsterra-banner-top-mobile', 'https://www.highperformanceformat.com/c2c1894723f974ae75e101a324343493/invoke.js', {
    key: 'c2c1894723f974ae75e101a324343493',
    format: 'iframe',
    height: 50,
    width: 320,
    params: {},
  });

  return (
    <div className="w-full text-center py-1">
      {/* Desktop banner 728x90 */}
      <div id="adsterra-banner-top-desktop" className="hidden md:block mx-auto" style={{ minHeight: 90 }} />
      {/* Mobile banner 320x50 */}
      <div id="adsterra-banner-top-mobile" className="block md:hidden mx-auto" style={{ minHeight: 50 }} />
    </div>
  );
}

// -- Sidebar 300x250 (desktop only) --
export function SidebarAd() {
  useAdScript('adsterra-sidebar', 'https://www.highperformanceformat.com/d6668bf52c8e666d6dc0234c67158359/invoke.js', {
    key: 'd6668bf52c8e666d6dc0234c67158359',
    format: 'iframe',
    height: 250,
    width: 300,
    params: {},
  });
  return (
    <div className="hidden xl:block" style={{ width: 300 }}>
      <div id="adsterra-sidebar" style={{ minHeight: 250 }} />
    </div>
  );
}

// -- Social Bar (floating) --
export function SocialBarAd() {
  useAdScript('adsterra-social-bar', 'https://pl29011760.profitablecpmratenetwork.com/ad/aa/ed/adaaed3b25e7b2df74fd49def037e9e9.js');
  return <div id="adsterra-social-bar" />;
}

// -- Mobile sticky footer --
export function MobileFooterAd() {
  useAdScript('adsterra-mobile-footer', 'https://www.highperformanceformat.com/c2c1894723f974ae75e101a324343493/invoke.js', {
    key: 'c2c1894723f974ae75e101a324343493',
    format: 'iframe',
    height: 50,
    width: 320,
    params: {},
  });
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div id="adsterra-mobile-footer" className="mx-auto" style={{ minHeight: 50 }} />
    </div>
  );
}
