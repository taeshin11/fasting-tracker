const { spawn } = require('child_process');
const puppeteer = require('puppeteer-core');

const GCLOUD = 'C:\\Program Files (x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd';

(async () => {
  // Step 1: Start gcloud, capture auth URL
  console.log('[1] Starting gcloud...');
  const gcloud = spawn(`"${GCLOUD}"`, ['auth', 'login', '--no-launch-browser', '--quiet'], {
    stdio: ['pipe', 'pipe', 'pipe'], shell: true, windowsVerbatimArguments: true,
  });

  let authUrl = '';
  const urlPromise = new Promise(resolve => {
    const handler = d => {
      const t = d.toString();
      const m = t.match(/(https:\/\/accounts\.google\.com\/[^\s]+)/);
      if (m) { authUrl = m[1]; resolve(authUrl); }
    };
    gcloud.stdout.on('data', handler);
    gcloud.stderr.on('data', handler);
  });

  const url = await urlPromise;
  console.log('[2] Got auth URL. Navigating Chrome...');

  // Step 2: Use existing Chrome (port 9333)
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9333', defaultViewport: null });
  const page = (await browser.pages()).find(p => p.url().includes('about:blank')) || await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  console.log('[3] Auth page loaded. User should already be logged in...');

  // Check if already on consent page (user is logged in from previous session)
  await new Promise(r => setTimeout(r, 3000));
  let currentUrl = page.url();
  console.log('  Current:', currentUrl.substring(0, 80) + '...');

  // If on consent page, click Allow
  try {
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await btn.evaluate(el => el.textContent.trim());
      if (text.includes('허용') || text.includes('Allow') || text.includes('Continue') || text.includes('계속')) {
        await btn.click();
        console.log(`  ✓ Clicked: "${text}"`);
        break;
      }
    }
  } catch(e) {}

  // Wait for redirect to authcode page
  console.log('[4] Waiting for auth code...');
  let code = '';
  for (let i = 0; i < 120; i++) {
    await new Promise(r => setTimeout(r, 1000));
    currentUrl = page.url();

    if (currentUrl.includes('sdk.cloud.google.com/authcode')) {
      const urlObj = new URL(currentUrl);
      code = urlObj.searchParams.get('code');
      if (code) {
        console.log(`  ✓ Got code: ${code.substring(0, 30)}...`);
        break;
      }
      // Also try from page
      code = await page.evaluate(() => {
        const body = document.body?.innerText || '';
        const m = body.match(/4\/0[A-Za-z0-9_.-]{20,}/);
        return m ? m[0] : '';
      });
      if (code) {
        console.log(`  ✓ Got code from page: ${code.substring(0, 30)}...`);
        break;
      }
    }
    if (i % 10 === 0 && i > 0) console.log(`  Waiting... (${i}s)`);
  }

  browser.disconnect();

  if (!code) {
    console.log('  ✗ Could not get code');
    gcloud.kill();
    process.exit(1);
  }

  // Step 3: Feed code to gcloud
  console.log('[5] Sending code to gcloud...');
  gcloud.stdin.write(code + '\n');

  const exitCode = await new Promise(resolve => {
    gcloud.on('close', resolve);
    gcloud.stdout.on('data', d => process.stdout.write(d));
    gcloud.stderr.on('data', d => process.stderr.write(d));
    setTimeout(() => resolve(-1), 20000);
  });

  console.log(`[6] gcloud exit code: ${exitCode}`);

  if (exitCode === 0) {
    // Step 4: Now use gcloud for Search Console
    const { execSync } = require('child_process');
    console.log('\n=== gcloud authenticated! ===');
    console.log(execSync(`"${GCLOUD}" auth list`).toString());

    // Enable APIs
    console.log('\n[7] Setting up project & enabling APIs...');
    try {
      execSync(`"${GCLOUD}" projects create fasting-tracker-gsc --quiet 2>&1 || true`);
      execSync(`"${GCLOUD}" config set project fasting-tracker-gsc --quiet 2>&1`);
      execSync(`"${GCLOUD}" services enable searchconsole.googleapis.com --quiet 2>&1`);
      execSync(`"${GCLOUD}" services enable siteverification.googleapis.com --quiet 2>&1`);
      console.log('  ✓ APIs enabled');
    } catch(e) {
      console.log('  API setup:', e.message);
    }
  }

  process.exit(0);
})();
