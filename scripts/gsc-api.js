const http = require('http');
const https = require('https');
const { URL } = require('url');
const { execSync } = require('child_process');

const SITE_URL = 'https://fasting-tracker-dusky.vercel.app/';
const CLIENT_ID = '764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com';
const CLIENT_SECRET = 'd-FL95Q19q7MQmFpd7hHD0Ty';
const REDIRECT_PORT = 8888;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}`;
const SCOPES = 'https://www.googleapis.com/auth/webmasters';

function httpsRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({ hostname: u.hostname, path: u.pathname + u.search, ...options }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

(async () => {
  console.log('=== Google Search Console API - Sitemap Submission ===\n');

  // Step 1: Start local server to receive OAuth callback
  const codePromise = new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, REDIRECT_URI);
      const code = url.searchParams.get('code');
      if (code) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>인증 완료! 이 창을 닫으셔도 됩니다.</h1>');
        server.close();
        resolve(code);
      } else {
        res.writeHead(400);
        res.end('No code');
      }
    });
    server.listen(REDIRECT_PORT, () => {
      console.log(`Local server listening on port ${REDIRECT_PORT}`);
    });
    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.log(`Port ${REDIRECT_PORT} in use, trying ${REDIRECT_PORT + 1}...`);
        server.listen(REDIRECT_PORT + 1);
      } else {
        reject(e);
      }
    });
    setTimeout(() => { server.close(); reject(new Error('Timeout - 브라우저에서 Google 계정 허용을 클릭해주세요')); }, 300000);
  });

  // Step 2: Open browser with OAuth URL
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPES)}&access_type=offline`;

  console.log('Opening browser for Google login...\n');
  try {
    execSync(`powershell.exe -Command "Start-Process '${authUrl}'"`, { stdio: 'ignore' });
  } catch {
    console.log('Auto-open failed. Please open this URL manually:');
    console.log(authUrl);
  }

  // Step 3: Wait for auth code
  console.log('Waiting for authorization...');
  const code = await codePromise;
  console.log('✓ Authorization code received!\n');

  // Step 4: Exchange code for token
  console.log('Exchanging code for access token...');
  const tokenBody = `code=${encodeURIComponent(code)}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&grant_type=authorization_code`;
  const tokenRes = await httpsRequest('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }, tokenBody);

  const tokens = JSON.parse(tokenRes.body);
  if (!tokens.access_token) {
    console.log('Token error:', tokenRes.body);
    process.exit(1);
  }
  console.log('✓ Access token obtained!\n');

  const AUTH = `Bearer ${tokens.access_token}`;
  const QUOTA_PROJECT = 'booming-cosine-386915';

  // Step 5: Check site is in Search Console
  console.log('Checking site registration...');
  const sitesRes = await httpsRequest('https://www.googleapis.com/webmasters/v3/sites', {
    method: 'GET',
    headers: { 'Authorization': AUTH, 'x-goog-user-project': QUOTA_PROJECT },
  });
  console.log('Sites:', sitesRes.body);

  const sites = JSON.parse(sitesRes.body);
  const siteExists = sites.siteEntry && sites.siteEntry.some(s => s.siteUrl === SITE_URL);

  if (!siteExists) {
    // Add site
    console.log('\nAdding site to Search Console...');
    const addRes = await httpsRequest(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}`, {
      method: 'PUT',
      headers: { 'Authorization': AUTH, 'Content-Type': 'application/json', 'x-goog-user-project': QUOTA_PROJECT },
    }, '{}');
    console.log('Add site result:', addRes.status, addRes.body);
  } else {
    console.log('✓ Site already registered');
  }

  // Step 6: Submit sitemap
  console.log('\nSubmitting sitemap...');
  const sitemapUrl = SITE_URL + 'sitemap.xml';
  const smRes = await httpsRequest(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
    {
      method: 'PUT',
      headers: { 'Authorization': AUTH, 'Content-Type': 'application/json', 'x-goog-user-project': QUOTA_PROJECT },
    },
    '{}'
  );
  console.log('Submit result:', smRes.status, smRes.body || '(empty = success)');

  if (smRes.status === 200 || smRes.status === 204) {
    console.log('\n✓✓✓ SITEMAP 제출 성공! ✓✓✓');
  }

  // Step 7: Verify - list sitemaps
  console.log('\nVerifying submitted sitemaps...');
  const listRes = await httpsRequest(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps`,
    {
      method: 'GET',
      headers: { 'Authorization': AUTH, 'x-goog-user-project': QUOTA_PROJECT },
    }
  );
  console.log('Sitemaps:', listRes.body);

  console.log('\n=== DONE ===');
  process.exit(0);
})();
