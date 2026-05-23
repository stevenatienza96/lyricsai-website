# LyricsAI Website

Marketing and download page for the **licensed** LyricsAI desktop app.

## Local preview

```bash
npm run dev
```

Open http://localhost:3000

## Sync installers from lyric-slides

After building the subscription release in `../lyric-slides`:

```bash
npm run sync-downloads
```

This copies `LyricsAI-1.0.0.dmg` and `LyricsAI-Setup-1.0.0.exe` into `downloads/`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Deploy (static site — no build command needed).

### Large download files (>100 MB)

Installers exceed GitHub’s 100 MB per-file limit. Recommended options:

**Option A — GitHub Releases (recommended)**  
Upload the DMG and EXE as release assets, then set full URLs in `site-config.js`:

```js
downloads: {
  mac: { url: "https://github.com/YOU/lyricsai-website/releases/download/v1.0.0/LyricsAI-1.0.0.dmg", ... },
  win: { url: "https://github.com/YOU/lyricsai-website/releases/download/v1.0.0/LyricsAI-Setup-1.0.0.exe", ... },
}
```

**Option B — Host on Vercel**  
Keep files in `downloads/` and deploy. Note Vercel deployment size limits on free plans.

**Option C — Git LFS**  
Track `downloads/*` with Git LFS if you want binaries in the repo.

## Structure

```
lyricsai-website/
  index.html       Landing page
  styles.css       Styles
  main.js          Download link wiring
  site-config.js   Version + download URLs (edit on each release)
  assets/          Logo
  downloads/       Installers (synced from release-licensed)
  vercel.json      Headers for download attachments
```

## Updating a release

1. Build licensed app: `cd ../lyric-slides && npm run dist:all:subscription`
2. Sync: `npm run sync-downloads`
3. Bump `version` and URLs in `site-config.js`
4. Deploy or publish GitHub Release assets
