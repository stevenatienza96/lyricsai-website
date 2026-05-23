# LyricsAI Website

Marketing and download page for the **licensed** LyricsAI desktop app.

## Fix missing downloads (404)

Installers are **not in Git** (each file is >100 MB). A normal `git push` deploy to Vercel only uploads the website — not the DMG/EXE.

### Option A — Vercel CLI (works with a **private** GitHub repo)

Upload installers directly to Vercel:

```bash
cd lyricsai-website
npm run deploy
```

First time: `npx vercel login` and link the project when prompted.

In `site-config.js` keep:

```js
downloadSource: "vercel",
```

Re-run `npm run deploy` whenever you ship a new app version.

### Option B — GitHub Releases (repo must be **public** for customers)

Private repos hide release files from the public. Make the repo public, then:

```bash
chmod +x scripts/publish-github-release.sh
./scripts/publish-github-release.sh 1.0.0
```

In `site-config.js` set:

```js
downloadSource: "github",
releaseTag: "v1.0.0",
githubRepo: "stevenatienza96/lyricsai-website",
```

Push the config change. Downloads use GitHub’s CDN.

## Local preview

```bash
npm run dev
```

Place installers in `downloads/` (or run `npm run sync-downloads` from `../lyric-slides/release-licensed`).

## Sync installers from lyric-slides

```bash
# Build licensed app first
cd ../lyric-slides && npm run dist:all:subscription

cd ../lyricsai-website
npm run sync-downloads
```

## Structure

```
lyricsai-website/
  site-config.js   downloadSource: "vercel" | "github"
  downloads/       Installers (local + Vercel CLI deploy, not in Git)
  scripts/
    sync-downloads.mjs
    publish-github-release.sh
```
