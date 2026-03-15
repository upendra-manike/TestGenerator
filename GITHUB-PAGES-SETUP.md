# GitHub Pages setup

Follow these steps to turn on GitHub Pages for this repo. After that, your **privacy policy URL** for the Chrome Web Store will work.

## 1. Push the `docs` folder

Make sure the **`docs`** folder is in your GitHub repo (it contains `index.html` and `privacy-policy.html`). If you haven’t pushed yet:

```bash
git add docs/
git commit -m "Add docs for GitHub Pages"
git push origin main
```

(Use your default branch name if it’s not `main`.)

## 2. Enable GitHub Pages

1. Open your repo on **GitHub**.
2. Go to **Settings** (repo menu).
3. In the left sidebar, click **Pages** (under “Code and automation”).
4. Under **Build and deployment**:
   - **Source:** choose **Deploy from a branch**.
   - **Branch:** select **main** (or your default branch).
   - **Folder:** select **/ (root)** if your repo root is the TestGenerator folder and `docs` is at the root, **or** select **/docs** if the `docs` folder is in the repo root.
     - If the **root** of your repo is the TestGenerator project (so you see `manifest.json`, `docs/`, `popup.html`, etc. at the top level), choose **/docs**.
   - Click **Save**.

## 3. Wait for the site to build

After a minute or two, GitHub will build the site. You’ll see something like:

> Your site is live at **https://YOUR_USERNAME.github.io/YOUR_REPO/**

## 4. Your URLs

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name:

| Page            | URL |
|-----------------|-----|
| Landing page    | `https://YOUR_USERNAME.github.io/YOUR_REPO/` |
| **Privacy policy** (for Chrome Web Store) | `https://YOUR_USERNAME.github.io/YOUR_REPO/privacy-policy.html` |

## 5. Use in Chrome Web Store

In the Chrome Web Store **Privacy practices** → **Privacy policy URL**, enter:

```
https://YOUR_USERNAME.github.io/YOUR_REPO/privacy-policy.html
```

## Troubleshooting

- **404:** Wait a few minutes after saving the Pages settings, then refresh.
- **Wrong folder:** If the root of your repo is the folder that *contains* `manifest.json` and `docs/`, use folder **/docs**. If the repo root is *inside* TestGenerator (no `docs` at top level), your structure may differ—ensure `docs/index.html` and `docs/privacy-policy.html` exist and use **/docs**.
