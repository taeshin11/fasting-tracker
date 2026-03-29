'use client';

import { useEffect, useRef } from 'react';

// Inject an ad script into a specific container element
function AdUnit({ containerId, scriptSrc, atOptions, className = '', style }: {
  containerId: string;
  scriptSrc: string;
  atOptions?: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !ref.current) return;
    loaded.current = true;

    if (atOptions) {
      const optScript = document.createElement('script');
      optScript.textContent = `var atOptions = ${JSON.stringify(atOptions)};`;
      ref.current.appendChild(optScript);
    }

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = scriptSrc;
    ref.current.appendChild(script);
  }, [scriptSrc, atOptions]);

  return <div ref={ref} id={containerId} className={`ad-container ${className}`} style={style} />;
}

// -- Native Banner (between content sections) --
export function AdPlaceholder({ id, minHeight = 100, className = '' }: {
  id: string;
  minHeight?: number;
  label?: string;
  className?: string;
}) {
  return (
    <AdUnit
      containerId={id}
      scriptSrc="https://pl29011759.profitablecpmratenetwork.com/1e8badd234db95319b6c25b8c209a2ec/invoke.js"
      className={`w-full text-center ${className}`}
      style={{ minHeight }}
    />
  );
}

// -- Banner Top: 728x90 desktop, 320x50 mobile --
export function BannerTopAd() {
  return (
    <div className="w-full text-center py-1">
      <div className="hidden md:flex justify-center">
        <AdUnit
          containerId="adsterra-banner-top-desktop"
          scriptSrc="https://www.highperformanceformat.com/c91b6d647673fe8f5ee9ae3ce23d7fd7/invoke.js"
          atOptions={{ key: 'c91b6d647673fe8f5ee9ae3ce23d7fd7', format: 'iframe', height: 90, width: 728, params: {} }}
          style={{ minHeight: 90 }}
        />
      </div>
      <div className="flex md:hidden justify-center">
        <AdUnit
          containerId="adsterra-banner-top-mobile"
          scriptSrc="https://www.highperformanceformat.com/c2c1894723f974ae75e101a324343493/invoke.js"
          atOptions={{ key: 'c2c1894723f974ae75e101a324343493', format: 'iframe', height: 50, width: 320, params: {} }}
          style={{ minHeight: 50 }}
        />
      </div>
    </div>
  );
}

// -- Sidebar 300x250 (desktop only) --
export function SidebarAd() {
  return (
    <div className="hidden xl:block" style={{ width: 300 }}>
      <AdUnit
        containerId="adsterra-sidebar"
        scriptSrc="https://www.highperformanceformat.com/d6668bf52c8e666d6dc0234c67158359/invoke.js"
        atOptions={{ key: 'd6668bf52c8e666d6dc0234c67158359', format: 'iframe', height: 250, width: 300, params: {} }}
        style={{ minHeight: 250 }}
      />
    </div>
  );
}

// -- Social Bar (floating) --
export function SocialBarAd() {
  return (
    <AdUnit
      containerId="adsterra-social-bar"
      scriptSrc="https://pl29011760.profitablecpmratenetwork.com/ad/aa/ed/adaaed3b25e7b2df74fd49def037e9e9.js"
    />
  );
}

// -- Mobile sticky footer --
export function MobileFooterAd() {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-center">
        <AdUnit
          containerId="adsterra-mobile-footer"
          scriptSrc="https://www.highperformanceformat.com/c2c1894723f974ae75e101a324343493/invoke.js"
          atOptions={{ key: 'c2c1894723f974ae75e101a324343493', format: 'iframe', height: 50, width: 320, params: {} }}
          style={{ minHeight: 50 }}
        />
      </div>
    </div>
  );
}
