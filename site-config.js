/** @type {import('./site-config.d.ts').SiteConfig} */
window.LYRICSAI_SITE = {
  version: "1.0.0",

  // "external" = files hosted elsewhere (R2, Bunny, Drive, etc.)
  // "vercel"   = /downloads/ on same Vercel deploy (CLI deploy only)
  // "github"   = GitHub Releases
  downloadSource: "external",

  // Cloudflare R2 public URL — see docs/R2-SETUP.md
  downloadsBaseUrl: "https://pub-YOUR-ID.r2.dev",

  releaseTag: "v1.0.0",
  githubRepo: "stevenatienza96/lyricsai-website",

  screenshots: [],

  downloads: {
    mac: {
      file: "LyricsAI-1.0.0.dmg",
      label: "macOS 12+",
      size: "128 MB",
      // Or set a full URL to override downloadsBaseUrl + file:
      // url: "https://example.com/LyricsAI-1.0.0.dmg",
    },
    win: {
      file: "LyricsAI-Setup-1.0.0.exe",
      label: "Windows 10+",
      size: "104 MB",
    },
  },
};
