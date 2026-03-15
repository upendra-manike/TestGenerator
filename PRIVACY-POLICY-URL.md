# Privacy policy URL for Chrome Web Store

The Chrome Web Store requires a **privacy policy URL** that is publicly accessible.

## Option 1: GitHub Pages (free)

1. Create a GitHub repo (e.g. `testgenerator-extension` or use your existing one).
2. Add the file **`privacy-policy.html`** from this project to the repo (e.g. in the root or in a `docs/` folder).
3. Enable GitHub Pages: **Settings → Pages → Source**: Deploy from branch, branch `main`, folder `/ (root)` or `/docs` if you put the file in `docs/`.
4. Your URL will be:
   - `https://<username>.github.io/<repo>/privacy-policy.html`  
   - or `https://<username>.github.io/<repo>/` if you rename the file to `index.html` in the chosen folder.

**Example:**  
Repo: `myuser/testgenerator`  
URL: `https://myuser.github.io/testgenerator/privacy-policy.html`

## Option 2: Your own website

Upload **`privacy-policy.html`** to your site, e.g.:

- `https://yourdomain.com/testgenerator-privacy-policy.html`

## Option 3: Gist (quick)

1. Go to [gist.github.com](https://gist.github.com).
2. Create a new gist, paste the **contents** of `privacy-policy.html`, name the file `privacy-policy.html`.
3. Click “Create public gist.”
4. Click “Raw” to get the raw file URL – that will show the HTML as raw text. For a proper page, use a viewer like [htmlpreview.github.io](https://htmlpreview.github.io/) or host the file as in Option 1.  
   **Better:** Use Option 1 (GitHub Pages) so the URL serves a real webpage.

## What to enter in the Chrome Web Store

In the item’s **Privacy practices** (or Store listing) section, in the field for **Privacy policy URL**, enter the full URL where your privacy policy is publicly visible, e.g.:

- `https://<username>.github.io/<repo>/privacy-policy.html`

Use the **exact URL** that opens the privacy policy page in a browser.
