import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourceDir = path.join(root, "..", "lyric-slides", "release-licensed");
const destDir = path.join(root, "downloads");

const files = [
  { src: "LyricsAI-1.0.0.dmg", dest: "LyricsAI-1.0.0.dmg" },
  { src: "LyricsAI Setup 1.0.0.exe", dest: "LyricsAI-Setup-1.0.0.exe" },
];

if (!fs.existsSync(sourceDir)) {
  console.error(`Release folder not found: ${sourceDir}`);
  console.error("Run npm run dist:all:subscription in lyric-slides first.");
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });

for (const { src, dest } of files) {
  const from = path.join(sourceDir, src);
  const to = path.join(destDir, dest);
  if (!fs.existsSync(from)) {
    console.warn(`Skip (missing): ${src}`);
    continue;
  }
  fs.copyFileSync(from, to);
  const mb = (fs.statSync(to).size / (1024 * 1024)).toFixed(1);
  console.log(`Copied ${dest} (${mb} MB)`);
}

console.log("Done. Installers are in downloads/");
