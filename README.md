# LyricsAI Website

Marketing site for the licensed LyricsAI app. **Host installers on a file CDN** — not in GitHub.

## Download hosting: Cloudflare R2

Installers are hosted on **Cloudflare R2** (not GitHub). Full setup:

**→ [docs/R2-SETUP.md](docs/R2-SETUP.md)**

Quick summary:
1. Create R2 bucket at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Enable **R2.dev public URL**
3. Upload `downloads/LyricsAI-1.0.0.dmg` and `LyricsAI-Setup-1.0.0.exe`
4. Set `downloadsBaseUrl` in `site-config.js` to your `https://pub-….r2.dev` URL
5. Push → Vercel redeploys

---

## Recommended: Cloudflare R2 (free egress)

Best for large DMG/EXE files. No bandwidth fees when users download.

1. Sign up at [cloudflare.com](https://dash.cloudflare.com)
2. **R2 → Create bucket** (e.g. `lyricsai-downloads`)
3. Upload `downloads/LyricsAI-1.0.0.dmg` and `LyricsAI-Setup-1.0.0.exe`
4. **Settings → Public access → Allow R2.dev subdomain** (or connect a custom domain)
5. Copy the public URL, e.g. `https://pub-abc123.r2.dev`
6. In `site-config.js`:

```js
downloadSource: "external",
downloadsBaseUrl: "https://pub-abc123.r2.dev",
```

7. `git push` — Vercel redeploys the site; downloads load from R2.

---

## Alternative: Bunny.net Storage (~$0.01/GB)

Simple UI, cheap CDN.

1. [bunny.net](https://bunny.net) → **Storage** → create zone
2. Upload both installers
3. Attach a **Pull Zone** (CDN) to the storage zone
4. Use the CDN URL as `downloadsBaseUrl` in `site-config.js`

---

## Alternative: Google Drive (quick & free)

1. Upload both files to Google Drive
2. Share → **Anyone with the link**
3. Get direct-download links (use a “direct link” converter for Drive files)
4. In `site-config.js`, set full URLs per platform:

```js
downloads: {
  mac: { url: "https://...", file: "LyricsAI-1.0.0.dmg", ... },
  win: { url: "https://...", file: "LyricsAI-Setup-1.0.0.exe", ... },
},
```

Drive links can break or rate-limit — fine for testing, not ideal for production.

---

## Sync installers from lyric-slides

```bash
cd ../lyric-slides && npm run dist:all:subscription
cd ../lyricsai-website && npm run sync-downloads
```

Upload the files from `downloads/` to your chosen host.

## Local preview

```bash
npm run dev
```

## site-config.js

| `downloadSource` | Where files live |
|------------------|------------------|
| `"external"` | R2, Bunny, Drive, S3, etc. — set `downloadsBaseUrl` |
| `"vercel"` | Same Vercel deploy (`npm run deploy` uploads local files) |
| `"github"` | GitHub Releases (public repo) |
