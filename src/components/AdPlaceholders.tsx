interface AdPlaceholderProps {
  id: string;
  minHeight?: number;
  label?: string;
  className?: string;
}

export function AdPlaceholder({ id, minHeight = 90, label = 'Advertisement', className = '' }: AdPlaceholderProps) {
  return (
    /* ADSTERRA_PLACEHOLDER */
    <div
      id={id}
      className={`ad-container w-full text-center ${className}`}
      style={{ minHeight }}
      aria-label={label}
    >
      {/* Paste Adsterra script here after approval */}
    </div>
  );
}

export function BannerTopAd() {
  return (
    /* ADSTERRA_BANNER_TOP */
    <div id="adsterra-banner-top" className="ad-container w-full text-center py-1" style={{ minHeight: 90 }}>
      {/* Paste Adsterra banner 728x90 (desktop) / 320x50 (mobile) script here */}
    </div>
  );
}

export function SidebarAd() {
  return (
    /* ADSTERRA_SIDEBAR */
    <div id="adsterra-sidebar" className="ad-container hidden xl:block" style={{ minHeight: 250, width: 300 }}>
      {/* Paste Adsterra sidebar ad script here */}
    </div>
  );
}

export function MobileFooterAd() {
  return (
    /* ADSTERRA_MOBILE_FOOTER */
    <div id="adsterra-mobile-footer" className="ad-container sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" style={{ minHeight: 50 }}>
      {/* Paste Adsterra mobile sticky footer 320x50 script here */}
    </div>
  );
}
