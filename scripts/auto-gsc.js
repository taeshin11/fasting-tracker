const puppeteer = require('puppeteer-core');
const { execSync } = require('child_process');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA = process.env.LOCALAPPDATA + '\\Google\\Chrome\\User Data';
const SITE_URL = 'https://fasting-tracker-dusky.vercel.app';
const DEBUG_PORT = 9222;

(async () => {
  // Launch Chrome with remote debugging
  console.log('Launching Chrome with remote debugging...');
  const { spawn } = require('child_process');
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${USER_DATA}`,
    '--profile-directory=Default',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ], { detached: true, stdio: 'ignore' });
  chrome.unref();

  // Wait for Chrome to start
  await new Promise(r => setTimeout(r, 5000));

  console.log('Connecting to Chrome...');
  const browser = await puppeteer.connect({
    browserURL: `http://localhost:${DEBUG_PORT}`,
    defaultViewport: null,
  });

  const pages = await browser.pages();
  const page = pages[0] || await browser.newPage();

  // --- GOOGLE SEARCH CONSOLE ---
  console.log('\n=== Google Search Console ===');
  console.log('[1] Navigating...');
  await page.goto('https://search.google.com/search-console', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  console.log('  URL:', page.url());
  await page.screenshot({ path: 'scripts/gsc-1.png', fullPage: true });

  // Check if we're on the welcome page or already have properties
  const pageContent = await page.content();

  if (page.url().includes('welcome') || pageContent.includes('URL prefix') || pageContent.includes('URL 접두어')) {
    console.log('  On welcome page — adding property...');

    // Find and fill the URL prefix input
    const inputs = await page.$$('input');
    for (const input of inputs) {
      const type = await input.evaluate(el => el.type);
      if (type === 'text' || type === 'url') {
        await input.click({ clickCount: 3 });
        await input.type(SITE_URL);
        console.log('  ✓ Entered URL');
        break;
      }
    }

    await new Promise(r => setTimeout(r, 1000));

    // Click Continue
    const buttons = await page.$$('button, [role="button"]');
    for (const btn of buttons) {
      const text = await btn.evaluate(el => el.textContent.trim());
      if (text.includes('Continue') || text.includes('계속')) {
        await btn.click();
        console.log('  ✓ Clicked Continue');
        break;
      }
    }

    await new Promise(r => setTimeout(r, 5000));
    await page.screenshot({ path: 'scripts/gsc-2.png', fullPage: true });

  } else if (page.url().includes('search-console')) {
    console.log('  Already on Search Console dashboard');

    // Try to add property via the dropdown
    const addBtn = await page.$('[aria-label="Add property"], [aria-label="속성 추가"]');
    if (addBtn) {
      await addBtn.click();
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // Check for verification code in page
  const content2 = await page.content();
  const metaMatch = content2.match(/google-site-verification.*?content=["']([^"']+)["']/);
  if (metaMatch) {
    console.log(`  ✓ Found verification code: ${metaMatch[1]}`);
    fs.writeFileSync('scripts/gsc-meta-content.txt', metaMatch[1]);
  }

  console.log('  Screenshot saved to scripts/gsc-2.png');

  // --- Try sitemap submission via URL ---
  console.log('\n[2] Navigating to sitemaps...');
  // If we have access, go directly to sitemaps page
  try {
    const sitemapUrl = `https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(SITE_URL + '/')}`;
    await page.goto(sitemapUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: 'scripts/gsc-sitemaps.png', fullPage: true });
    console.log('  Sitemaps URL:', page.url());
  } catch(e) {
    console.log('  Could not access sitemaps:', e.message);
  }

  // --- GOOGLE ADSENSE ---
  console.log('\n=== Google AdSense ===');
  const page2 = await browser.newPage();
  await page2.goto('https://www.google.com/adsense/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  console.log('  AdSense URL:', page2.url());
  await page2.screenshot({ path: 'scripts/adsense-1.png', fullPage: true });

  console.log('\n=== Done! Browser is open for you to review. ===');
  console.log('Screenshots saved in scripts/ folder.');
  console.log('Close Chrome manually when done.');

  // Disconnect (don't close browser)
  browser.disconnect();
  process.exit(0);
})();
