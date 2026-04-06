const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');
const SITE_URL = 'https://fasting-tracker-dusky.vercel.app';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  console.log('=== Launching Chrome with original profile ===');
  console.log('User data dir:', USER_DATA);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    userDataDir: USER_DATA,
    headless: false,
    args: [
      '--no-first-run',
      '--no-default-browser-check',
    ],
    defaultViewport: null,
  });

  console.log('Chrome launched!');
  const page = (await browser.pages())[0] || await browser.newPage();

  // ============================================
  // PART 1: Google Search Console
  // ============================================
  console.log('\n=== GOOGLE SEARCH CONSOLE ===');

  console.log('[1] Navigating...');
  await page.goto('https://search.google.com/search-console', { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(3000);
  console.log('  URL:', page.url());
  await page.screenshot({ path: 'scripts/setup-gsc-1.png', fullPage: true });

  // Login check
  if (page.url().includes('accounts.google.com')) {
    console.log('\n  !! Google login required - please log in manually !!');
    for (let i = 0; i < 120; i++) {
      await sleep(1000);
      if (!page.url().includes('accounts.google.com')) {
        console.log('  Login successful!');
        await sleep(3000);
        break;
      }
      if (i % 15 === 0) console.log('  Waiting for login...', 120 - i, 's left');
    }
  }

  await page.screenshot({ path: 'scripts/setup-gsc-2.png', fullPage: true });
  console.log('  Current URL:', page.url());

  // Check if already on the dashboard (property exists)
  const currentUrl = page.url();
  const pageContent = await page.content();

  if (currentUrl.includes('search-console/about') || currentUrl.includes('welcome')) {
    // Not logged in or no property - click Start
    console.log('[2] On landing/welcome page - clicking Start...');
    await page.evaluate(() => {
      const els = [...document.querySelectorAll('a, button, [role="button"]')];
      for (const el of els) {
        if (el.textContent.includes('시작하기') || el.textContent.includes('Start')) {
          el.click(); return true;
        }
      }
      return false;
    });
    await sleep(5000);
    await page.screenshot({ path: 'scripts/setup-gsc-3.png', fullPage: true });
    console.log('  URL after Start:', page.url());
  }

  // If on property selection page - add URL prefix
  console.log('[3] Adding URL prefix property...');

  // Click URL prefix option if visible
  await page.evaluate(() => {
    const els = [...document.querySelectorAll('div, span, label, h2, h3')];
    for (const el of els) {
      const t = el.textContent.trim();
      if ((t === 'URL 접두어' || t === 'URL prefix') && el.offsetParent !== null) {
        el.click(); return true;
      }
    }
    return false;
  });
  await sleep(2000);

  // Look for any visible text input and enter URL
  const inputs = await page.$$('input');
  let filled = false;
  for (const input of inputs) {
    const info = await input.evaluate(el => ({
      visible: el.offsetParent !== null,
      type: el.type,
      placeholder: el.placeholder || '',
      value: el.value
    }));
    if (info.visible && (info.type === 'text' || info.type === 'url' || info.type === '')) {
      await input.click({ clickCount: 3 });
      await input.type(SITE_URL);
      filled = true;
      console.log('  Entered URL:', SITE_URL);
      break;
    }
  }

  if (filled) {
    await sleep(1000);
    // Click Continue/계속/Add
    await page.evaluate(() => {
      const btns = [...document.querySelectorAll('button, [role="button"]')];
      for (const b of btns) {
        const t = b.textContent.trim();
        if (t.includes('계속') || t.includes('Continue') || t.includes('추가') || t.includes('Add')) {
          b.click(); return;
        }
      }
    });
    console.log('  Clicked Continue/Add');
    await sleep(8000);
    await page.screenshot({ path: 'scripts/setup-gsc-4.png', fullPage: true });
  }

  // Verification
  console.log('[4] Verification...');
  // Try HTML tag method
  await page.evaluate(() => {
    const els = [...document.querySelectorAll('div, span')];
    for (const el of els) {
      const t = el.textContent.trim();
      if ((t === 'HTML 태그' || t === 'HTML tag') && el.offsetParent !== null) {
        el.click(); return;
      }
    }
  });
  await sleep(2000);

  // Click Verify
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button, [role="button"]')];
    for (const b of btns) {
      const t = b.textContent.trim();
      if (t.includes('확인') || t.includes('Verify')) {
        b.click(); return;
      }
    }
  });
  await sleep(5000);
  await page.screenshot({ path: 'scripts/setup-gsc-5.png', fullPage: true });
  console.log('  Verification screenshot saved');

  // Submit Sitemap
  console.log('[5] Submitting sitemap...');
  try {
    const sitemapUrl = `https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(SITE_URL + '/')}`;
    console.log('  Going to:', sitemapUrl);
    await page.goto(sitemapUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(3000);
    await page.screenshot({ path: 'scripts/setup-gsc-6.png', fullPage: true });

    // Find sitemap input
    const sInputs = await page.$$('input');
    for (const input of sInputs) {
      const vis = await input.evaluate(el => el.offsetParent !== null);
      if (vis) {
        await input.click({ clickCount: 3 });
        await input.type('sitemap.xml');
        console.log('  Entered: sitemap.xml');

        await sleep(1000);
        await page.evaluate(() => {
          const btns = [...document.querySelectorAll('button, [role="button"]')];
          for (const b of btns) {
            const t = b.textContent.trim();
            if (t.includes('제출') || t.includes('Submit')) { b.click(); return; }
          }
        });
        console.log('  Clicked Submit');
        break;
      }
    }
    await sleep(5000);
    await page.screenshot({ path: 'scripts/setup-gsc-7.png', fullPage: true });
  } catch (e) {
    console.log('  Sitemap error:', e.message);
  }

  // ============================================
  // PART 2: Google AdSense
  // ============================================
  console.log('\n=== GOOGLE ADSENSE ===');

  const page2 = await browser.newPage();
  console.log('[1] Navigating to AdSense...');
  await page2.goto('https://adsense.google.com', { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(3000);
  console.log('  URL:', page2.url());
  await page2.screenshot({ path: 'scripts/setup-ads-1.png', fullPage: true });

  // Look for URL input or "Get started" button
  console.log('[2] Looking for registration form...');

  // Click "시작하기" / "Get started" if present
  await page2.evaluate(() => {
    const els = [...document.querySelectorAll('a, button, [role="button"]')];
    for (const el of els) {
      const t = el.textContent.trim().toLowerCase();
      if (t.includes('시작하기') || t.includes('get started') || t.includes('sign up')) {
        el.click(); return true;
      }
    }
    return false;
  });
  await sleep(5000);
  await page2.screenshot({ path: 'scripts/setup-ads-2.png', fullPage: true });
  console.log('  URL:', page2.url());

  // Try to find and fill site URL
  const adsInputs = await page2.$$('input');
  for (const input of adsInputs) {
    const info = await input.evaluate(el => ({
      visible: el.offsetParent !== null,
      type: el.type,
      placeholder: (el.placeholder || el.getAttribute('aria-label') || '').toLowerCase()
    }));
    if (info.visible && (info.placeholder.includes('site') || info.placeholder.includes('url') || info.placeholder.includes('사이트'))) {
      await input.click({ clickCount: 3 });
      await input.type(SITE_URL);
      console.log('  Entered site URL');
      break;
    }
  }

  await sleep(2000);

  // Click save/submit/next
  await page2.evaluate(() => {
    const btns = [...document.querySelectorAll('button, [role="button"]')];
    for (const b of btns) {
      const t = b.textContent.trim().toLowerCase();
      if (t.includes('save') || t.includes('저장') || t.includes('next') || t.includes('다음') || t.includes('submit')) {
        b.click(); return;
      }
    }
  });
  await sleep(5000);
  await page2.screenshot({ path: 'scripts/setup-ads-3.png', fullPage: true });

  console.log('\n=== DONE! ===');
  console.log('Check screenshots in scripts/ folder');

  browser.disconnect();
  process.exit(0);
})();
