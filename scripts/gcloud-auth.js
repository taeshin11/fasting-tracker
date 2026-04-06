// Automate gcloud auth: capture URL, open browser, get code, feed back
const { spawn, exec } = require('child_process');
const puppeteer = require('puppeteer-core');

const GCLOUD = 'C:\\Program Files (x86)\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud.cmd';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  // Step 1: Start gcloud auth login, capture the auth URL
  console.log('[1] Starting gcloud auth login...');

  const gcloud = spawn(`"${GCLOUD}"`, ['auth', 'login', '--no-launch-browser', '--quiet'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    shell: true,
    windowsVerbatimArguments: true,
  });

  let authUrl = '';
  const urlPromise = new Promise((resolve) => {
    const handler = (data) => {
      const text = data.toString();
      process.stdout.write(text);
      const match = text.match(/(https:\/\/accounts\.google\.com\/[^\s]+)/);
      if (match) {
        authUrl = match[1];
        resolve(authUrl);
      }
    };
    gcloud.stdout.on('data', handler);
    gcloud.stderr.on('data', handler);
  });

  const url = await urlPromise;
  console.log('\n[2] Got auth URL, launching Chrome...');

  // Step 2: Open Chrome, navigate to auth URL, wait for code page
  // Kill any existing Chrome first
  try {
    require('child_process').execSync('powershell.exe -Command "Stop-Process -Name chrome -Force -ErrorAction SilentlyContinue"');
  } catch(e) {}
  await new Promise(r => setTimeout(r, 2000));

  // Launch Chrome with REAL user profile
  const userDataDir = process.env.LOCALAPPDATA + '\\Google\\Chrome\\User Data';
  require('child_process').execSync(`powershell.exe -Command "Start-Process 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' -ArgumentList '--remote-debugging-port=9333','--user-data-dir=${userDataDir}','--profile-directory=Default','--no-first-run','about:blank'"`);
  await new Promise(r => setTimeout(r, 6000));

  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9333',
    defaultViewport: null,
  });

  const page = (await browser.pages())[0];

  console.log('[3] Navigating to Google auth page...');
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  console.log('  Auth page loaded:', page.url());

  // Wait for the user to authenticate OR auto-redirect
  // The final page will be sdk.cloud.google.com/authcode.html with the code
  // Auto-fill email if on login page
  try {
    const loginInput = await page.$('input[type="email"]');
    if (loginInput) {
      await loginInput.type('spinaiceo@gmail.com', { delay: 30 });
      console.log('  ✓ Auto-filled email: spinaiceo@gmail.com');
      // Click Next button
      await new Promise(r => setTimeout(r, 500));
      const nextBtn = await page.$('#identifierNext button, button[type="button"]');
      if (nextBtn) {
        await nextBtn.click();
        console.log('  ✓ Clicked Next');
      }
    }
  } catch(e) {
    console.log('  Could not auto-fill email:', e.message);
  }

  console.log('[4] Waiting for authentication to complete...');
  console.log('  (Enter your password in the Chrome window if prompted)');

  // Poll for the auth code page
  let code = '';
  for (let i = 0; i < 300; i++) { // Wait up to 5 minutes
    await new Promise(r => setTimeout(r, 1000));
    const currentUrl = page.url();

    // Only extract code when on the actual code page
    if (currentUrl.includes('sdk.cloud.google.com/authcode')) {
      try {
        code = await page.evaluate(() => {
          // The code is displayed in a textarea on the authcode page
          const textarea = document.querySelector('textarea');
          if (textarea && textarea.value && textarea.value.startsWith('4/')) return textarea.value;
          // Or in the page body as a long code string
          const body = document.body.innerText;
          const match = body.match(/4\/0[A-Za-z0-9_.-]{20,}/);
          if (match) return match[0];
          return '';
        });
      } catch(e) {}

      if (code) {
        console.log(`\n[5] ✓ Got verification code!`);
        break;
      }
    }

    if (i % 10 === 0 && i > 0) {
      console.log(`  Still waiting... (${i}s)`);
    }
  }

  if (!code) {
    console.log('  Could not get code automatically. Taking screenshot...');
    await page.screenshot({ path: 'scripts/auth-page.png', fullPage: true });
    browser.disconnect();
    gcloud.kill();
    process.exit(1);
  }

  // Step 3: Feed the code back to gcloud
  console.log('[6] Sending code to gcloud...');
  gcloud.stdin.write(code + '\n');

  // Wait for gcloud to finish
  await new Promise((resolve) => {
    gcloud.on('close', (exitCode) => {
      console.log(`\n[7] gcloud auth completed (exit code: ${exitCode})`);
      resolve();
    });
    // Timeout after 15s
    setTimeout(resolve, 15000);
  });

  // Clean up Chrome
  browser.disconnect();
  try {
    require('child_process').execSync('powershell.exe -Command "Stop-Process -Name chrome -Force -ErrorAction SilentlyContinue"');
  } catch(e) {}

  // Step 4: Now use gcloud to access Search Console
  console.log('\n=== Using gcloud for Search Console ===');

  // Check auth status
  try {
    const authList = require('child_process').execSync(`"${GCLOUD}" auth list 2>&1`).toString();
    console.log(authList);
  } catch(e) {
    console.log('Auth check:', e.message);
  }

  console.log('\n=== DONE ===');
  process.exit(0);
})();
