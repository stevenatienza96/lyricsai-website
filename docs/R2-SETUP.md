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

## 3. Enable public access (important)

1. Open your bucket → **Settings**
2. Find **Public Development URL** (not just Custom Domains)
3. Click **Enable**
4. Type `allow` and confirm **Allow**
5. **Public URL Access** must show **Allowed**
6. Copy the URL shown, e.g. `https://pub-fd76918315fb4776a9d456525478a875.r2.dev`

> The base URL alone (`https://pub-….r2.dev`) will **not** show a webpage — that is normal.  
> You must open a **file URL** (step 5 below).

### If the site “takes too long to respond”

- Public access is probably **not enabled** — repeat step 3 and confirm **Allowed**
- Or files were **not uploaded** yet
- `r2.dev` is **dev-only** and can be slow/unreliable — for production use a **Custom Domain** (see below)

## 4. Upload the installers

### Option A — Dashboard (easiest)

1. Bucket → **Upload**
2. Upload from `lyricsai-website/downloads/`:
   - `LyricsAI-1.0.0.dmg`
   - `LyricsAI-Setup-1.0.0.exe`
3. Test **exact file URLs** in your browser (not the bucket root):

   - `https://pub-YOUR-ID.r2.dev/LyricsAI-1.0.0.dmg`
   - `https://pub-YOUR-ID.r2.dev/LyricsAI-Setup-1.0.0.exe`

   Each should **start downloading**. 404 = wrong file name. Hangs = public access off.

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

## Production: use a Custom Domain (recommended)

`r2.dev` is rate-limited and can timeout. For reliable downloads:

1. R2 bucket → **Settings** → **Custom Domains** → **Connect Domain**
2. Use a subdomain you own, e.g. `downloads.yourdomain.com`
3. Update `site-config.js`:

```js
downloadsBaseUrl: "https://downloads.yourdomain.com",
```

4. Re-upload files (same names) if needed

You need the domain on Cloudflare (free plan is fine).

---

## New app version

1. Build: `cd lyric-slides && npm run dist:all:subscription`
2. Sync: `cd lyricsai-website && npm run sync-downloads`
3. Upload new files to R2 (same names or update `site-config.js` filenames + version)
4. Push config changes if filenames/version changed

## Costs

R2 free tier includes 10 GB storage and **zero egress fees** to the internet — ideal for app downloads.
