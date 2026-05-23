#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

VERSION="${1:-1.0.0}"
TAG="v${VERSION#v}"

npm run sync-downloads

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: https://cli.github.com/"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login"
  exit 1
fi

DMG="downloads/LyricsAI-${VERSION}.dmg"
EXE="downloads/LyricsAI-Setup-${VERSION}.exe"

for f in "$DMG" "$EXE"; do
  if [[ ! -f "$f" ]]; then
    echo "Missing: $f"
    echo "Build first: cd ../lyric-slides && npm run dist:all:subscription"
    exit 1
  fi
done

gh release upload "$TAG" "$DMG" "$EXE" --clobber 2>/dev/null || \
  gh release create "$TAG" "$DMG" "$EXE" \
    --title "LyricsAI ${VERSION}" \
    --notes "Licensed LyricsAI build for macOS and Windows."

echo ""
echo "Release published. Update site-config.js download URLs to:"
echo "  https://github.com/stevenatienza96/lyricsai-website/releases/download/${TAG}/LyricsAI-${VERSION}.dmg"
echo "  https://github.com/stevenatienza96/lyricsai-website/releases/download/${TAG}/LyricsAI-Setup-${VERSION}.exe"
echo ""
echo "Then git push. (Repo must be public for anonymous downloads.)"
