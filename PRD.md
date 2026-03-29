# PRD.md — Intermittent Fasting Tracker

## 0. Autonomous Agent Harness Design

This project follows the **Anthropic Harness Design** methodology. Claude Code operates as four distinct agents in sequence:

| Agent | Role |
|---|---|
| **Planner Agent** | Expands this PRD into a full feature spec. Focuses on *what* to build, not *how*. |
| **Initializer Agent** | Creates the three handoff files (`feature_list.json`, `claude-progress.txt`, `init.sh`) in the first session. |
| **Builder Agent** | Reads handoff files at each session start → runs tests → picks next feature → implements → commits → updates progress → repeats. |
| **Reviewer Agent** | Separate from Builder. Reviews code quality, UI/UX, accessibility, SEO, and performance after each milestone. |

### Session-Start Routine (every session)

```
1. Read `claude-progress.txt` → understand current state
2. Read `feature_list.json` → identify next incomplete feature
3. Run `init.sh` → start dev server, verify environment
4. Run existing tests → confirm nothing is broken
5. Pick ONE feature → implement → test → commit
6. Update `claude-progress.txt`
7. If milestone reached → git push + deploy
8. Move to next feature or end session
```

### Three Handoff Files

| File | Purpose |
|---|---|
| `feature_list.json` | Ordered array of all features with id, name, status (`pending` / `in-progress` / `done`), and acceptance criteria |
| `claude-progress.txt` | Human-readable log: what was done, what's next, known blockers, current milestone |
| `init.sh` | One-command project bootstrap: install deps, start dev server, verify env |

---

## 1. Product Overview

**Service Name:** Intermittent Fasting Tracker
**Short Title:** Fasting Tracker
**Folder Name:** `fasting-tracker`
**Domain:** Weight & Diet / Health & Wellness

### Concept

A free, browser-based intermittent fasting tracker that lets users select a fasting protocol (16:8, 18:6, 20:4, 5:2, OMAD), start/stop fasting timers, and visually track their current fasting state through an animated progress bar showing metabolic phases (Fed State → Blood Sugar Stabilization → Fat Burning → Ketosis → Deep Ketosis / Autophagy). All data is stored in the browser (`localStorage`) — no login required, zero server cost.

### Target Audience

- People practicing intermittent fasting who want a simple, visual timer
- Health-conscious users searching for "intermittent fasting timer" or "fasting tracker online"
- Mobile users who want a lightweight web app instead of installing native apps

---

## 2. Feature Specification

### 2.1 Core Features

#### F1 — Fasting Protocol Selector
- Provide preset protocols: **16:8**, **18:6**, **20:4**, **5:2**, **OMAD (23:1)**
- Allow **custom fasting/eating window** input (hours:minutes)
- Show a brief explanation of each protocol when selected
- Store last-used protocol in `localStorage`

#### F2 — Fasting Timer (Hero Section)
- Large, prominent circular or arc-shaped timer display
- Show: elapsed fasting time, remaining fasting time, total fasting goal
- Start / Stop / Reset controls
- Timer persists across page refreshes via `localStorage` (store start timestamp)
- Timer continues counting even when the browser is closed (calculates elapsed from stored start time on re-open)
- Optional: gentle pulse animation while fasting is active

#### F3 — Metabolic Phase Progress Bar
- Horizontal or vertical multi-stage progress bar below the timer
- Stages with approximate time thresholds:
  1. **Fed State** (0–4 hrs) — "Digesting & absorbing nutrients"
  2. **Early Fasting** (4–8 hrs) — "Blood sugar stabilizing"
  3. **Fat Burning** (8–12 hrs) — "Body switching to fat for fuel"
  4. **Ketosis** (12–18 hrs) — "Ketone production increasing"
  5. **Deep Ketosis / Autophagy** (18–24+ hrs) — "Cellular cleanup activated"
- Each stage shows: icon/emoji, title, short description, estimated calorie-burn mode
- Current stage is highlighted and animated
- Tooltip or expandable info card per stage with health context

#### F4 — Fasting History Log
- Calendar-style or list view of past fasting sessions
- Each entry: date, protocol used, duration, completed (yes/no)
- Store in `localStorage` (array of session objects)
- Basic stats: total fasts this week/month, average duration, longest streak
- Option to clear history

#### F5 — Hydration & Notes Tracker
- Simple water intake counter (glasses or ml) per fasting session
- Optional text notes field per session ("felt great", "broke fast early")
- Stored alongside session data in `localStorage`

### 2.2 Engagement & Retention Features

#### F6 — Fasting Streak & Achievements
- Track consecutive fasting days (streak counter)
- Simple badge/milestone system: 3-day, 7-day, 14-day, 30-day streaks
- Visual celebration animation on milestone achievement (confetti or glow effect)

#### F7 — Educational Tips Section
- Rotating tip cards about intermittent fasting benefits, do's and don'ts
- SEO-rich content: "What happens to your body during a 16-hour fast?"
- Link to a dedicated `/guide` or `/faq` page for long-form SEO content

### 2.3 Data & Privacy

#### F8 — Export / Import Data
- Export fasting history as JSON or CSV
- Import previously exported data
- All data stays client-side; prominently display "Your data never leaves your browser" trust badge

---

## 3. Standing Constraints (Apply to ALL features)

### 3.1 Zero Infrastructure Cost
- **Hosting:** Vercel free tier (deploy via CLI: `npx vercel --prod`)
- **Framework:** Next.js (static export) or plain HTML/CSS/JS — choose whichever is simpler and faster
- **Database:** NONE. Use `localStorage` for all user data
- **Domain:** Use Vercel-provided `.vercel.app` subdomain (free)
- **All services must be on free tiers. No paid APIs, no paid hosting, no paid anything.**

### 3.2 Monetization — Adsterra First
- **Primary ad network: Adsterra** (faster approval than Google AdSense)
- Integrate Adsterra ad units in these placements:
  - Banner ad at top of page (below header, above timer) — non-intrusive
  - Native ad between fasting history entries
  - Sidebar ad on desktop (right rail)
  - Sticky footer banner on mobile
- **Ad placeholder divs must be created from Day 1** with clear comments like `<!-- ADSTERRA_BANNER_TOP -->` and `id="adsterra-banner-top"`
- When Adsterra provides the ad unit key, paste the script into the placeholder
- Ads must NEVER obstruct the timer or core fasting UI
- Future: Apply for Google AdSense once traffic qualifies

### 3.3 Data Collection — Google Sheets Webhook
- **On every "Start Fast" button click**, silently POST the following to a Google Apps Script webhook:
  - Timestamp (ISO 8601)
  - Selected protocol (e.g., "16:8")
  - Custom window if applicable
  - User-Agent string
  - Screen resolution
  - Referrer URL
  - Session count (from localStorage)
  - Country (via free IP geolocation API if available, otherwise omit)
- **On every "Complete Fast" event**, POST:
  - Original start time
  - Actual duration
  - Protocol used
  - Completed (true/false)
- **Google Apps Script webhook setup:**
  - Create a Google Sheet named `fasting-tracker-data`
  - Write an Apps Script `doPost(e)` function that parses JSON and appends rows
  - Deploy as web app (Anyone can access)
  - Hardcode the webhook URL in the frontend code
  - **Claude Code must write the full Apps Script code and provide the exact deployment steps — not just a guide. Automate everything possible via CLI.**

### 3.4 SEO Maximization
- **Title tag:** "Free Intermittent Fasting Tracker — 16:8, 18:6, OMAD Timer Online"
- **Meta description:** compelling, keyword-rich, under 160 chars
- **H1:** One per page, keyword-optimized
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **Schema.org** structured data: `WebApplication`, `FAQPage`
- `sitemap.xml` and `robots.txt` — auto-generated
- **Open Graph & Twitter Card** meta tags with preview image
- Long-form SEO content pages:
  - `/guide` — "Complete Guide to Intermittent Fasting" (1500+ words)
  - `/faq` — 10+ questions with schema markup
  - `/about` — About this tool + credibility signals
  - `/privacy` — Privacy policy (data stays in browser, ad disclosures)
  - `/terms` — Terms of service
- Internal linking between all pages
- Image alt tags on every image
- **Canonical URLs** set correctly
- **Performance:** Lighthouse score > 90 on all metrics
- Optimize for these target keywords:
  - "intermittent fasting tracker"
  - "fasting timer online"
  - "16:8 fasting timer"
  - "intermittent fasting calculator"
  - "free fasting tracker"
  - "fasting progress tracker"
  - "what happens during fasting"

### 3.5 Responsive Design
- Mobile-first design
- Breakpoints: 320px, 768px, 1024px, 1440px
- Touch-friendly: all tap targets ≥ 44px
- Timer and progress bar must be fully functional and beautiful on mobile
- Test on iPhone SE (375px) and iPad (768px) viewports

### 3.6 Soft & Modern UI/UX
- **Background:** Soft gradient — warm neutral tones (e.g., `#faf8f5` to `#f0ece4`) or gentle pastel health theme (soft sage green `#e8f0e8`, warm cream `#fdf6ec`)
- **Typography:** Clean sans-serif (Inter, Nunito, or system font stack)
- **Color palette:** Earthy, calming tones — sage green, warm amber, soft cream, muted coral
- **Cards:** Rounded corners (12–16px), subtle shadow (`0 2px 8px rgba(0,0,0,0.06)`)
- **Spacing:** Generous whitespace, never cramped
- **Animations:** Subtle, purposeful — no jarring transitions. Use CSS transitions (0.2–0.3s ease)
- **Dark mode:** Optional toggle (store preference in localStorage)
- **Overall vibe:** Clean, calm, trustworthy — like a premium health app

### 3.7 Visitor Counter
- **Location:** Footer area, right side — small, muted text
- Format: `👀 Today: 142 | Total: 12,847`
- Use a **free visitor counter API** or a lightweight Google Apps Script counter
- The counter POST endpoint can be the same Google Sheet webhook (separate sheet/tab)
- **Must not disrupt user experience** — small font, muted color, footer only

### 3.8 Feedback & Contact Channels
- **Feedback button:** Floating subtle button (bottom-left or in footer) labeled "💡 Suggest Improvement"
  - Opens a minimal modal/drawer with: text area + optional email + send button
  - Sends to `spinaiceo@gmail.com` via `mailto:` link or a free email-sending service (e.g., EmailJS free tier, or Google Apps Script email forwarding)
- **Business inquiries:** In the footer, add: "Business Inquiry → spinaiceo@gmail.com"
  - Also include on the `/about` page with a simple contact form
- **Both channels must be non-intrusive and not interfere with the fasting experience**

### 3.9 SPINAI Branding
- Footer text: `"Built with ❤️ by SPINAI"` — small, muted, with optional link
- Do NOT make it prominent — it should feel organic, like a signature
- Include in the `/about` page: "This tool is created and maintained by SPINAI"

### 3.10 Git & Deployment Workflow
- **Create GitHub repo using `gh` CLI:**
  ```bash
  gh repo create fasting-tracker --public --description "Free Intermittent Fasting Tracker — 16:8, 18:6, OMAD Timer Online" --clone
  ```
- **Git push at every major milestone:**
  - M1: Project scaffold + routing + layout → `git push`
  - M2: Timer + protocol selector working → `git push`
  - M3: Progress bar + metabolic phases → `git push`
  - M4: History log + streak system → `git push`
  - M5: SEO pages + schema markup → `git push`
  - M6: Ad placements + Google Sheets webhook → `git push`
  - M7: Visitor counter + feedback system → `git push`
  - M8: Final review + Vercel deploy → `git push`
- **Commit messages:** Descriptive, prefixed with milestone (`[M1] Add project scaffold and base layout`)
- **Deploy to Vercel via CLI:**
  ```bash
  npx vercel --prod
  ```
- **Public URL:** Use the Vercel `.vercel.app` domain — do NOT expose GitHub username in any public-facing link
- If a short/redirect link is needed, use a free URL shortener or Vercel's domain alias

### 3.11 CLI-First Automation
- **Everything that can be done via CLI must be done via CLI.** No manual steps.
- Package installs: `npm install` / `npx`
- Git operations: `git` CLI
- GitHub repo creation: `gh` CLI
- Vercel deployment: `npx vercel` CLI
- File creation, editing: direct file writes
- If blocked by something that requires a browser, document it clearly in `claude-progress.txt` and move on

### 3.12 Live Site Verification
- After deployment, **check the live Vercel URL** and verify:
  - Timer starts, stops, resets correctly
  - Protocol selection works and persists
  - Progress bar animates through metabolic phases
  - Fasting history saves and displays
  - All pages load (`/guide`, `/faq`, `/about`, `/privacy`, `/terms`)
  - Responsive layout on mobile viewport
  - Visitor counter increments
  - Google Sheets webhook receives data
  - Ad placeholders are positioned correctly
  - Feedback modal sends email
  - Meta tags and schema markup render in view-source
  - Lighthouse score check
- Document any issues found in `claude-progress.txt` and fix them

---

## 4. Milestone Breakdown

| Milestone | Features | Git Tag | Deploy? |
|---|---|---|---|
| **M1** | Project setup, folder structure, routing, base layout, header/footer, responsive shell | `v0.1` | No |
| **M2** | Fasting protocol selector, timer (start/stop/reset), localStorage persistence | `v0.2` | No |
| **M3** | Metabolic phase progress bar, stage descriptions, animations | `v0.3` | No |
| **M4** | Fasting history log, streak counter, achievements, hydration tracker | `v0.4` | No |
| **M5** | SEO pages (guide, FAQ, about, privacy, terms), schema markup, sitemap, robots.txt, OG tags | `v0.5` | Yes (staging) |
| **M6** | Adsterra ad placeholders, Google Sheets webhook (Apps Script code included), data collection on start/complete | `v0.6` | Yes |
| **M7** | Visitor counter, feedback modal, business inquiry contact, SPINAI branding, export/import data | `v0.7` | Yes |
| **M8** | Reviewer Agent pass: UI polish, accessibility audit, Lighthouse optimization, live site verification, final deploy | `v1.0` | Yes (production) |

---

## 5. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js (Static Export) or Vanilla HTML/JS | Free hosting, fast, SEO-friendly |
| Styling | Tailwind CSS or vanilla CSS | Rapid, responsive, utility-first |
| Storage | localStorage | Zero cost, no backend |
| Hosting | Vercel (free tier) | CLI deploy, instant, free SSL |
| Ads | Adsterra | Fast approval, easy integration |
| Analytics/Data | Google Sheets + Apps Script webhook | Free, no DB needed |
| Visitor Counter | Google Apps Script or free counter API | Zero cost |
| Email/Feedback | mailto: link + EmailJS (free) or Apps Script | Zero cost |
| Version Control | GitHub (public) via `gh` CLI | Free, standard |

---

## 6. File Structure (Expected)

```
fasting-tracker/
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   ├── sitemap.xml
│   └── robots.txt
├── src/ (or pages/ for Next.js)
│   ├── index.html (or page.js)
│   ├── guide.html
│   ├── faq.html
│   ├── about.html
│   ├── privacy.html
│   ├── terms.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── timer.js
│   │   ├── progress.js
│   │   ├── history.js
│   │   ├── webhook.js
│   │   ├── counter.js
│   │   └── app.js
│   └── assets/
│       └── (icons, images)
├── feature_list.json
├── claude-progress.txt
├── init.sh
├── package.json
├── PRD.md
├── .gitignore
└── README.md
```

---

## 7. Google Apps Script — Webhook Template

Claude Code must create and provide this complete script:

```javascript
// Google Apps Script — paste into Apps Script editor
// Sheet name: fasting-tracker-data

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    
    // Determine which tab to write to
    var tabName = data.event_type || "general";
    var tab = sheet.getSheetByName(tabName);
    if (!tab) {
      tab = sheet.insertSheet(tabName);
      // Add headers based on event type
      if (tabName === "fast_start") {
        tab.appendRow(["Timestamp", "Protocol", "Custom Window", "User Agent", "Screen Resolution", "Referrer", "Session Count", "Country"]);
      } else if (tabName === "fast_complete") {
        tab.appendRow(["Timestamp", "Start Time", "Duration (min)", "Protocol", "Completed"]);
      } else if (tabName === "visitor") {
        tab.appendRow(["Timestamp", "Page", "User Agent", "Referrer"]);
      }
    }
    
    // Append the data row
    var row = data.row || Object.values(data);
    tab.appendRow(row);
    
    // Return visitor count if requested
    if (data.event_type === "visitor") {
      var visitorTab = sheet.getSheetByName("visitor");
      var totalCount = visitorTab ? visitorTab.getLastRow() - 1 : 1;
      var today = new Date().toISOString().split('T')[0];
      var todayCount = 0;
      if (visitorTab) {
        var timestamps = visitorTab.getRange(2, 1, visitorTab.getLastRow() - 1, 1).getValues();
        timestamps.forEach(function(ts) {
          if (ts[0] && ts[0].toString().startsWith(today)) todayCount++;
        });
      }
      return ContentService.createTextOutput(JSON.stringify({
        today: todayCount,
        total: totalCount
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({status: "ok"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Also handle GET for visitor count retrieval
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var visitorTab = sheet.getSheetByName("visitor");
  var totalCount = visitorTab ? visitorTab.getLastRow() - 1 : 0;
  var today = new Date().toISOString().split('T')[0];
  var todayCount = 0;
  if (visitorTab && visitorTab.getLastRow() > 1) {
    var timestamps = visitorTab.getRange(2, 1, visitorTab.getLastRow() - 1, 1).getValues();
    timestamps.forEach(function(ts) {
      if (ts[0] && ts[0].toString().startsWith(today)) todayCount++;
    });
  }
  return ContentService.createTextOutput(JSON.stringify({
    today: todayCount,
    total: totalCount
  })).setMimeType(ContentService.MimeType.JSON);
}
```

**Deployment steps (automate via documentation in `claude-progress.txt`):**
1. Go to Google Sheets → Create new sheet → Name it `fasting-tracker-data`
2. Extensions → Apps Script → Paste the above code
3. Deploy → New Deployment → Web App → Anyone can access → Deploy
4. Copy the web app URL → Paste into `webhook.js` as `WEBHOOK_URL`

---

## 8. Adsterra Integration Guide

1. Sign up at [adsterra.com](https://adsterra.com) (free)
2. Add website: enter the Vercel deployment URL
3. Wait for approval (usually < 24 hours)
4. Once approved, create ad units:
   - **Banner 728x90** → Top of page (desktop)
   - **Banner 320x50** → Top of page (mobile)
   - **Native Ad** → Between history entries
   - **Social Bar** → Floating/sticky element
5. Each ad unit provides a `<script>` tag — paste into the corresponding placeholder in the HTML
6. **Placeholder format in code:**
   ```html
   <!-- ADSTERRA_BANNER_TOP -->
   <div id="adsterra-banner-top" class="ad-container" style="min-height:90px; text-align:center;">
     <!-- Paste Adsterra script here after approval -->
   </div>
   ```

---

## 9. Traffic Maximization Checklist

- [ ] SEO-optimized title, meta description, H1 on every page
- [ ] Schema.org structured data (WebApplication + FAQPage)
- [ ] `sitemap.xml` submitted to Google Search Console
- [ ] Open Graph + Twitter Card meta tags for social sharing
- [ ] Long-form content pages (`/guide`, `/faq`) targeting long-tail keywords
- [ ] Internal linking between all pages
- [ ] Fast load time (< 2s) — static site, minimal JS
- [ ] Mobile-friendly (Google mobile-first indexing)
- [ ] Share buttons on guide/FAQ pages (Twitter, Facebook, Reddit, WhatsApp)
- [ ] `<link rel="canonical">` on every page
- [ ] Image optimization (WebP, lazy loading)
- [ ] Google Search Console verification via meta tag or DNS
- [ ] Consider submitting to Product Hunt, Reddit r/intermittentfasting, Hacker News
- [ ] Add "Share your fasting streak" feature with auto-generated social image

---

## 10. Reviewer Agent Checklist (M8)

- [ ] All timer functions work (start, stop, reset, persist across refresh)
- [ ] Protocol selector saves to localStorage
- [ ] Progress bar accurately reflects elapsed fasting time
- [ ] History log records and displays past sessions
- [ ] All SEO pages render correctly with proper meta tags
- [ ] Schema markup validates (Google Rich Results Test)
- [ ] Lighthouse scores: Performance > 90, Accessibility > 90, SEO > 90
- [ ] Responsive design verified at 320px, 768px, 1024px, 1440px
- [ ] Ad placeholders are correctly positioned and don't obstruct UI
- [ ] Google Sheets webhook receives test data
- [ ] Visitor counter displays and increments
- [ ] Feedback modal works and emails reach `spinaiceo@gmail.com`
- [ ] Business inquiry link in footer works
- [ ] SPINAI branding is subtle and present
- [ ] No console errors
- [ ] Dark mode toggle works (if implemented)
- [ ] Export/Import data functions correctly
- [ ] All internal links work (no 404s)
- [ ] Favicon and OG image display correctly
- [ ] HTTPS enforced on Vercel

---

## 11. Important Reminders for Claude Code

1. **DO NOT just write guides or documentation. EXECUTE everything via CLI.**
2. **Create the GitHub repo with `gh repo create` — not manual.**
3. **Deploy to Vercel with `npx vercel --prod` — not manual.**
4. **Write the actual Google Apps Script code — not just instructions.**
5. **Git push at EVERY milestone. No exceptions.**
6. **Never expose GitHub username in public URLs.** Use Vercel domain only.
7. **Adsterra first, AdSense later.** Set up ad placeholders from M1.
8. **Test on mobile viewport.** The timer is the hero — it must look perfect on phones.
9. **When stuck, solve it via CLI.** Only flag for human intervention if CLI cannot solve it.
10. **Update `claude-progress.txt` after every feature completion.**