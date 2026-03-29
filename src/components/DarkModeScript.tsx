export function DarkModeScript() {
  const script = `
    (function() {
      try {
        var dm = localStorage.getItem('fasting_dark_mode');
        if (dm === 'true') document.documentElement.classList.add('dark');
      } catch(e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
