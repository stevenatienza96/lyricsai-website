/** @type {import('./site-config.d.ts').SiteConfig} */
window.LYRICSAI_SITE = {
  version: "1.0.0",
  screenshots: [
    // Add entries when you have images in assets/screenshots/:
    // { src: "./assets/screenshots/main-ui.png", alt: "LyricsAI control panel", caption: "Song queue, live preview, and slide editor" },
  ],
  downloads: {
    mac: {
      // Relative path for Vercel/local, or full URL for GitHub Releases:
      // url: "https://github.com/YOUR_USER/lyricsai-website/releases/download/v1.0.0/LyricsAI-1.0.0.dmg",
      url: "/downloads/LyricsAI-1.0.0.dmg",
      label: "macOS 12+",
      size: "128 MB",
    },
    win: {
      url: "/downloads/LyricsAI-Setup-1.0.0.exe",
      label: "Windows 10+",
      size: "104 MB",
    },
  },
};
