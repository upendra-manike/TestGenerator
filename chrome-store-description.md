# TestGenerator – Chrome Web Store Listing

Use these when submitting at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

---

## Short description (132 characters max)

**Option A (132 chars):**  
Capture browser API calls and generate Playwright, Cypress, Postman & REST-assured tests in one click. Stop writing API tests by hand.

**Option B (128 chars):**  
Record network requests as you use any website, then generate Playwright, Cypress, Postman or REST-assured tests instantly. For devs & QA.

**Option C (119 chars):**  
Turn browser API traffic into test code. Generate Playwright, Cypress, Postman & REST-assured tests from captured requests. One click.

---

## Detailed description (store listing)

Use the full text below in the "Detailed description" field. You can trim if the store has a character limit.

---

**TestGenerator** turns the API calls your browser makes into ready-to-use test code. No more copying URLs and headers from the Network tab by hand.

**What it does**

• **Capture** – Records `fetch` and XMLHttpRequest calls on the current tab (method, URL, headers, body) while you browse.  
• **Generate** – With one click, creates:  
  - **Playwright** – API tests for `@playwright/test`  
  - **Cypress** – Tests using `cy.request()`  
  - **Postman** – A Postman Collection (v2.1) you can import  
  - **REST-assured** – JUnit 5 Java tests  

**How to use it**

1. Open the website or app you want to test.  
2. Click the TestGenerator icon and choose **Start capture**.  
3. Use the site as normal (login, click, submit forms, load data). Every API request is recorded.  
4. Click **Stop capture**.  
5. Pick a format (Playwright, Cypress, Postman, or REST-assured). The generated file is **copied to your clipboard**.  
6. Paste into your project and adjust (e.g. base URL, environment variables, extra assertions).  

**Who it’s for**

• **Developers** – Quickly scaffold API tests from real traffic.  
• **QA engineers** – Build regression and integration tests without typing requests from scratch.  
• **Anyone** – Who needs Playwright, Cypress, Postman, or REST-assured tests and wants to start from real browser traffic.  

**Why use it**

• Saves time – Get a full set of API tests in seconds instead of writing them manually.  
• Fewer mistakes – No copy-paste errors from DevTools.  
• One workflow – Record once, export to the framework or tool you use.  

**Privacy & permissions**

• The extension only runs when you use it. It does not send your data to any external server.  
• **Host permissions** – Required to inject a small script on the page you choose so it can record `fetch` and XHR.  
• **Storage** – Used locally to keep captured requests until you generate or clear them.  

**Limitations**

• Only requests made **after** you click “Start capture” are recorded.  
• Works on normal web pages; it cannot run on restricted pages (e.g. chrome://).  
• Captures requests made via `fetch` and XMLHttpRequest; other mechanisms (e.g. WebSocket) are not recorded.  

**Support**

If something doesn’t work as expected, check the extension’s console logs (see README in the source or the extension’s description) and ensure you’re on a normal HTTP/HTTPS page when you start capture.

---

## Category

**Suggested:** Developer Tools (or Productivity)

---

## Screenshots suggestions

1. Popup with “Start capture” / “Stop capture” and the list of captured requests.  
2. Same popup with a few requests listed and the four format buttons (Playwright, Cypress, Postman, REST-assured) visible.  
3. (Optional) A snippet of generated Playwright or Cypress code in an editor.

---

## Promotional tile (optional)

**Small tile (440×280):**  
“Capture API calls → Generate tests. Playwright • Cypress • Postman • REST-assured”

**Marquee (1400×560):**  
“Turn browser API traffic into test code. One click to generate Playwright, Cypress, Postman, or REST-assured tests.”
