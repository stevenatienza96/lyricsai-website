# Cloudflare R2 setup for LyricsAI downloads

Host the DMG and EXE on R2. Your Vercel site links to them via `site-config.js`.

## 1. Create a Cloudflare account

Sign up at [dash.cloudflare.com](https://dash.cloudflare.com) (free).

## 2. Create an R2 bucket

1. In the dashboard: **Storage & databases → R2 object storage**
2. Click **Create bucket**
3. Name it: `lyricsai-downloads` (or any name)
4. Location: pick the region closest to your users
5. Create

## 3. Enable public access

1. Open your bucket → **Settings**
2. Under **Public access**, enable **R2.dev subdomain** (or connect a custom domain later)
3. Copy the public URL, e.g. `https://pub-abc123def456.r2.dev`

If you use a **path prefix** when uploading (e.g. `v1/LyricsAI-1.0.0.dmg`), include that in `downloadsBaseUrl`:

```js
downloadsBaseUrl: "https://pub-abc123def456.r2.dev/v1",
```

## 4. Upload the installers

### Option A — Dashboard (easiest)

1. Bucket → **Upload**
2. Upload from `lyricsai-website/downloads/`:
   - `LyricsAI-1.0.0.dmg`
   - `LyricsAI-Setup-1.0.0.exe`
3. Test in browser:
   - `https://pub-YOUR-ID.r2.dev/LyricsAI-1.0.0.dmg`
   - Should start downloading

### Option B — Wrangler CLI

```bash
npm install -g wrangler
wrangler login

cd lyricsai-website
npm run sync-downloads   # refresh from lyric-slides if needed

wrangler r2 object put lyricsai-downloads/LyricsAI-1.0.0.dmg \
  --file=downloads/LyricsAI-1.0.0.dmg

wrangler r2 object put lyricsai-downloads/LyricsAI-Setup-1.0.0.exe \
  --file=downloads/LyricsAI-Setup-1.0.0.exe
```

Replace `lyricsai-downloads` with your bucket name.

## 5. Update the website

Edit `site-config.js`:

```js
downloadSource: "external",
downloadsBaseUrl: "https://pub-YOUR-ID.r2.dev",
```

Push to GitHub. Vercel redeploys automatically.

## 6. Verify

Open your live site → **Download for macOS / Windows** → file should download from R2.

---

## New app version

1. Build: `cd lyric-slides && npm run dist:all:subscription`
2. Sync: `cd lyricsai-website && npm run sync-downloads`
3. Upload new files to R2 (same names or update `site-config.js` filenames + version)
4. Push config changes if filenames/version changed

## Costs

R2 free tier includes 10 GB storage and **zero egress fees** to the internet — ideal for app downloads.
