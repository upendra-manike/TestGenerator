# Chrome Web Store – Privacy Practices (paste into the form)

Use the text below on the **Privacy practices** tab. Copy each block into the matching field.

---

## 1. Single purpose description

**Required field: "Single purpose description"**

```
TestGenerator has a single purpose: to capture network requests (fetch and XMLHttpRequest) on the tab the user chooses and to generate test code (Playwright, Cypress, Postman, or REST-assured) from those requests. It does not collect, transmit, or sell user data. All capture and generation happens locally in the browser.
```

**Alternative (shorter):**

```
Capture API requests on the user's chosen tab and generate test files (Playwright, Cypress, Postman, REST-assured) locally. No data is sent to external servers.
```

---

## 2. Justification for activeTab

**Required: "Justification for activeTab"**

```
activeTab is used so that when the user clicks "Start capture," the extension can inject a small script only into the currently active tab to record fetch and XMLHttpRequest calls. We need the active tab's ID and URL to run chrome.scripting.executeScript on that tab only. The extension does not access the tab unless the user explicitly clicks Start capture.
```

---

## 3. Justification for host permission use

**Required: "Justification for host permission use"**

```
Host permissions (e.g. <all_urls>) are required because the user may want to capture API requests on any website they open (their own app, a staging site, a third-party API docs page, etc.). The extension injects scripts only into the tab the user selects when they click "Start capture." We do not access any site in the background; injection happens only after a user action and only in that one tab. No request data is sent to any remote server.
```

---

## 4. Justification for remote code use

**Required: "Justification for remote code use"**

```
The extension does not load or execute code from the internet. The only code executed in the page is our own bundled scripts (capture.js and content.js), which are packaged with the extension and injected into the user's active tab only when they click "Start capture." These scripts patch fetch and XMLHttpRequest on that tab to record request details (URL, method, headers, body) and send them to the extension for local storage and test generation. No remote or user-supplied code is run.
```

---

## 5. Justification for scripting

**Required: "Justification for scripting"**

```
The scripting API is used to inject our bundled capture.js and content.js into the tab the user selects when they click "Start capture." This is necessary to intercept fetch and XMLHttpRequest on that page so we can record API calls and generate tests. Injection happens only after the user clicks Start capture and only in the active tab; we do not run scripts on other tabs or in the background.
```

---

## 6. Justification for storage

**Required: "Justification for storage"**

```
chrome.storage.local is used to store the list of captured requests in the current session (URL, method, headers, body) so that when the user opens the popup or switches tabs, the list is still available. Storage is also used to remember whether capture is on or off. All data stays on the user's device; nothing is synced to the cloud or sent to our servers. The user can clear captured requests at any time with the "Clear" button.
```

---

## 7. Data usage certification (when you certify)

When you check the box that data usage complies with Developer Program Policies, you can confirm:

- **No data sent off-device:** Captured requests and generated test code are kept locally. Nothing is transmitted to the developer or third parties.
- **No personal data collected:** The extension only records request details (URL, method, headers, body) that the user chooses to capture from a tab they control.
- **User control:** The user decides when to start/stop capture and when to clear the list. No background collection.

**Short statement you can keep for your records:**

```
TestGenerator does not collect, store on external servers, or share user data. All captured requests and generated output remain on the user's device. We do not use the data for advertising, analytics, or any purpose other than generating test code in the user's browser.
```

---

## 8. Contact email and verification (Account tab)

The store also requires:

- **Contact email** – Enter a valid support/contact email on the **Account** tab.
- **Verify contact email** – Complete the verification process from the **Account** tab (e.g. click the link in the email from Google).

These are not on the Privacy practices tab but are required to publish.

---

## Quick checklist

- [ ] Single purpose description – filled
- [ ] activeTab justification – filled
- [ ] Host permission justification – filled
- [ ] Remote code justification – filled
- [ ] Scripting justification – filled
- [ ] Storage justification – filled
- [ ] Data usage certified (checkbox on Privacy practices)
- [ ] Contact email set on Account tab
- [ ] Contact email verified on Account tab
