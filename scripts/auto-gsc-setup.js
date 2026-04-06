const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SITE_URL = 'https://fasting-tracker-dusky.vercel.app';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const tempDir = path.join(process.env.TEMP, 'chrome-gsc-' + Date.now());

  console.log('=== Launching Chrome ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    userDataDir: tempDir,
    headless: false,
    ignoreDefaultArgs: ['--enable-automation'],
    args: [
      '--no-first-run',
      '--no-default-browser-check',
      '--start-maximized',
      '--disable-blink-features=AutomationControlled',
    ],
    defaultViewport: null,
  });

  const page = (await browser.pages())[0];

  // Go to GSC sitemaps directly
  await page.goto(`https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(SITE_URL + '/')}`, {
    waitUntil: 'networkidle2', timeout: 60000
  });
  await sleep(2000);

  // Wait for login (10 min)
  if (page.url().includes('accounts.google.com') || page.url().includes('signin')) {
    console.log('\n  ╔══════════════════════════════════════════════╗');
    console.log('  ║  Chrome에서 Google 로그인해주세요! (10분 대기)  ║');
    console.log('  ╚══════════════════════════════════════════════╝\n');

    for (let i = 0; i < 600; i++) {
      await sleep(1000);
      if (!page.url().includes('accounts.google.com') && !page.url().includes('signin')) {
        console.log('  ✓ 로그인 완료!');
        await sleep(5000);
        break;
      }
      if (i === 599) { console.log('  ✗ 타임아웃'); process.exit(1); }
      if (i % 60 === 0 && i > 0) console.log(`  대기 중... ${Math.floor((600 - i) / 60)}분 남음`);
    }
  }

  console.log('URL:', page.url());
  await page.screenshot({ path: 'scripts/gsc-sitemap-1.png', fullPage: true });

  // If redirected to not-verified, we need to verify first
  if (page.url().includes('not-verified')) {
    console.log('\n=== Verifying ownership first ===');

    // Click 소유권 확인
    await page.evaluate(() => {
      const els = [...document.querySelectorAll('button, a, [role="button"]')];
      for (const el of els) {
        if (el.textContent.trim() === '소유권 확인' || el.textContent.trim() === 'Verify ownership') {
          el.click(); return;
        }
      }
    });
    await sleep(10000);
    await page.screenshot({ path: 'scripts/gsc-sitemap-2.png', fullPage: true });
    console.log('After verify URL:', page.url());

    // Check for success dialog and click 속성으로 이동
    const html = await page.content();
    if (html.includes('자동으로 확인') || html.includes('확인됨') || html.includes('Ownership verified')) {
      console.log('✓ Ownership verified!');

      // Click 속성으로 이동
      await page.evaluate(() => {
        const els = [...document.querySelectorAll('button, a, [role="button"]')];
        for (const el of els) {
          const t = el.textContent.trim();
          if (t === '속성으로 이동' || t === 'Go to property') {
            el.click(); return;
          }
        }
      });
      await sleep(5000);

      // Navigate to sitemaps
      await page.goto(`https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(SITE_URL + '/')}`, {
        waitUntil: 'networkidle2', timeout: 30000
      });
      await sleep(5000);
    } else {
      // Try clicking 확인 button (HTML file verify)
      await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        for (const b of btns) {
          if (b.textContent.trim() === '확인' && b.offsetParent !== null) {
            b.click(); return;
          }
        }
      });
      await sleep(15000);
      await page.screenshot({ path: 'scripts/gsc-sitemap-3.png', fullPage: true });

      // Click 속성으로 이동 if success
      await page.evaluate(() => {
        const els = [...document.querySelectorAll('button, a')];
        for (const el of els) {
          if (el.textContent.trim() === '속성으로 이동') { el.click(); return; }
        }
      });
      await sleep(5000);

      await page.goto(`https://search.google.com/search-console/sitemaps?resource_id=${encodeURIComponent(SITE_URL + '/')}`, {
        waitUntil: 'networkidle2', timeout: 30000
      });
      await sleep(5000);
    }
  }

  console.log('\n=== Submitting Sitemap ===');
  console.log('URL:', page.url());
  await page.screenshot({ path: 'scripts/gsc-sitemap-4.png', fullPage: true });

  if (!page.url().includes('not-verified')) {
    // Type sitemap.xml using keyboard
    const inputs = await page.$$('input');
    let typed = false;
    for (const input of inputs) {
      const vis = await input.evaluate(el => el.offsetParent !== null && el.getBoundingClientRect().width > 50);
      if (vis) {
        await input.click({ clickCount: 3 }).catch(() => {});
        await page.keyboard.type('sitemap.xml');
        typed = true;
        console.log('✓ Typed: sitemap.xml');
        break;
      }
    }

    if (typed) {
      await sleep(2000);
      // Click 제출
      await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button, [role="button"]')];
        for (const b of btns) {
          if ((b.textContent.trim() === '제출' || b.textContent.trim() === 'Submit') && b.offsetParent !== null) {
            b.click(); return;
          }
        }
      });
      console.log('✓ Clicked Submit');
      await sleep(8000);
      await page.screenshot({ path: 'scripts/gsc-sitemap-5.png', fullPage: true });
      console.log('\n✓✓✓ SITEMAP 제출 완료! ✓✓✓');
    }
  } else {
    console.log('✗ Still not verified');
    await page.screenshot({ path: 'scripts/gsc-sitemap-fail.png', fullPage: true });
  }

  console.log('\n=== DONE ===');
  browser.disconnect();
  process.exit(0);
})();
