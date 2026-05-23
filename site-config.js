/** @type {import('./site-config.d.ts').SiteConfig} */
window.LYRICSAI_SITE = {
  version: "1.0.0",

  // Set to "vercel" (files in /downloads/ on deploy) or "github" (Release assets).
  downloadSource: "vercel",

  releaseTag: "v1.0.0",
  githubRepo: "stevenatienza96/lyricsai-website",

  screenshots: [],

  downloads: {
    mac: {
      file: "LyricsAI-1.0.0.dmg",
      label: "macOS 12+",
      size: "128 MB",
    },
    win: {
      file: "LyricsAI-Setup-1.0.0.exe",
      label: "Windows 10+",
      size: "104 MB",
    },
  },
};
