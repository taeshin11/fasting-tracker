const { spawn, execSync } = require('child_process');
const puppeteer = require('puppeteer-core');
const GCLOUD = 'C:\\Program Files (x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_DIR = process.env.LOCALAPPDATA + '\\Temp\\chrome-gcloud3';
const PORT = 9444;

(async () => {
  // Kill any Chrome
  try { execSync('powershell.exe -Command "Stop-Process -Name chrome -Force -ErrorAction SilentlyContinue"'); } catch(e) {}
  await new Promise(r => setTimeout(r, 2000));

  // Launch Chrome with debugging
  console.log('[1] Launching Chrome...');
  execSync(`powershell.exe -Command "Start-Process '${CHROME}' -ArgumentList '--remote-debugging-port=${PORT}','--user-data-dir=${TEMP_DIR}','--no-first-run','about:blank'"`);
  await new Promise(r => setTimeout(r, 5000));

  const browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${PORT}`, defaultViewport: null });
  const page = (await browser.pages())[0];

  // Start gcloud auth
  console.log('[2] Starting gcloud auth...');
  const gcloud = spawn(`"${GCLOUD}"`, ['auth', 'application-default', 'login', '--no-launch-browser', '--quiet', '--scopes=openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/siteverification'], {
    stdio: ['pipe', 'pipe', 'pipe'], shell: true, windowsVerbatimArguments: true,
  });

  // Get auth URL
  const authUrl = await new Promise(resolve => {
    const handler = d => {
      const m = d.toString().match(/(https:\/\/accounts\.google\.com\/[^\s]+)/);
      if (m) resolve(m[1]);
    };
    gcloud.stdout.on('data', handler);
    gcloud.stderr.on('data', handler);
  });

  // Navigate to auth URL
  console.log('[3] Navigating to Google login...');
  await page.goto(authUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Auto-fill email
  const emailInput = await page.$('input[type="email"]');
  if (emailInput) {
    await emailInput.type('spinaiceo@gmail.com', { delay: 30 });
    await new Promise(r => setTimeout(r, 500));
    const nextBtn = await page.$('#identifierNext');
    if (nextBtn) await nextBtn.click();
    console.log('[4] Email entered. Waiting for password...');
    console.log('    >>> Enter password in Chrome window <<<');
  }

  // Wait for auth code page
  let code = '';
  for (let i = 0; i < 300; i++) {
    await new Promise(r => setTimeout(r, 1000));
    try {
      const url = page.url();
      if (url.includes('sdk.cloud.google.com/authcode')) {
        const urlObj = new URL(url);
        code = urlObj.searchParams.get('code') || '';
        if (!code) {
          code = await page.evaluate(() => {
            const m = document.body?.innerText?.match(/4\/0[A-Za-z0-9_.-]{20,}/);
            return m ? m[0] : '';
          });
        }
        if (code) { console.log(`\n[5] ✓ Got auth code!`); break; }
      }
      // Auto-click consent/allow buttons
      if (url.includes('consent') || url.includes('approval')) {
        const btns = await page.$$('button');
        for (const btn of btns) {
          const text = await btn.evaluate(el => el.textContent.trim());
          if (text.includes('허용') || text.includes('Allow') || text.includes('계속') || text.includes('Continue')) {
            await btn.click();
            console.log(`  Clicked: "${text}"`);
            break;
          }
        }
      }
    } catch(e) {}
    if (i % 15 === 0 && i > 0) console.log(`  Waiting... (${i}s)`);
  }

  if (!code) {
    console.log('TIMEOUT: Could not get code');
    await page.screenshot({ path: 'scripts/timeout.png', fullPage: true });
    gcloud.kill();
    browser.disconnect();
    process.exit(1);
  }

  // Feed code to gcloud
  console.log('[6] Authenticating gcloud...');
  gcloud.stdin.write(code + '\n');

  const exitCode = await new Promise(resolve => {
    gcloud.on('close', resolve);
    gcloud.stdout.on('data', d => process.stdout.write(d));
    gcloud.stderr.on('data', d => process.stderr.write(d));
    setTimeout(() => resolve(-1), 20000);
  });

  console.log(`[7] gcloud auth exit: ${exitCode}`);
  browser.disconnect();

  if (exitCode === 0) {
    console.log('\n✓ gcloud application-default authenticated!');
    console.log(execSync(`"${GCLOUD}" auth application-default print-access-token`).toString().substring(0, 30) + '...');
  }

  // Clean up Chrome
  try { execSync('powershell.exe -Command "Stop-Process -Name chrome -Force -ErrorAction SilentlyContinue"'); } catch(e) {}
  process.exit(exitCode);
})();
