# Privacy policy URL for Chrome Web Store

The Chrome Web Store requires a **privacy policy URL** that is publicly accessible.

**This project is on GitHub.** Use the same repo to host the privacy policy:

## Get the URL (GitHub Pages)

1. Ensure **`privacy-policy.html`** is in your public repo (root or e.g. `docs/`).
2. In the repo: **Settings → Pages** (left sidebar).
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch (e.g. `main`) and folder **/ (root)** or **/docs** if the file is in `docs/`. Save.
5. After GitHub builds (1–2 minutes), your policy URL will be:
   - **If `privacy-policy.html` is in the repo root:**  
     `https://<YOUR_GITHUB_USERNAME>.github.io/<REPO_NAME>/privacy-policy.html`
   - **If the repo is just the TestGenerator folder and you use root:**  
     `https://<YOUR_GITHUB_USERNAME>.github.io/<REPO_NAME>/privacy-policy.html`

**Example:** Repo `myuser/TestGenerator` →  
`https://myuser.github.io/TestGenerator/privacy-policy.html`

Replace `<YOUR_GITHUB_USERNAME>` and `<REPO_NAME>` with your actual GitHub username and repository name.

## Other options

### Your own website

Upload **`privacy-policy.html`** to your site, e.g.:

- `https://yourdomain.com/testgenerator-privacy-policy.html`

### Gist (quick)

1. Go to [gist.github.com](https://gist.github.com).
2. Create a new gist, paste the **contents** of `privacy-policy.html`, name the file `privacy-policy.html`.
3. Click “Create public gist.”
4. Click “Raw” to get the raw file URL – that will show the HTML as raw text. For a proper page, use a viewer like [htmlpreview.github.io](https://htmlpreview.github.io/) or host the file as in Option 1.  
   **Better:** Use Option 1 (GitHub Pages) so the URL serves a real webpage.

## What to enter in the Chrome Web Store

In the item’s **Privacy practices** (or Store listing) section, in the field for **Privacy policy URL**, enter the full URL where your privacy policy is publicly visible, e.g.:

- `https://<username>.github.io/<repo>/privacy-policy.html`

Use the **exact URL** that opens the privacy policy page in a browser.
