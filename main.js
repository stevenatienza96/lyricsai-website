const config = window.LYRICSAI_SITE;

function downloadUrl(platform) {
  const item = config?.downloads?.[platform];
  if (!item?.file && !item?.url) return "#";

  if (item.url) return item.url;

  if (config.downloadSource === "github" && config.githubRepo && config.releaseTag) {
    return `https://github.com/${config.githubRepo}/releases/download/${config.releaseTag}/${item.file}`;
  }

  if (config.downloadSource === "external" && config.downloadsBaseUrl) {
    const base = config.downloadsBaseUrl.replace(/\/+$/, "");
    return `${base}/${encodeURIComponent(item.file)}`;
  }

  return `/downloads/${encodeURIComponent(item.file)}`;
}

function bindDownload(id, platform) {
  const el = document.getElementById(id);
  if (!el) return;
  el.href = downloadUrl(platform);
  el.setAttribute("download", "");
}

document.getElementById("year").textContent = String(new Date().getFullYear());

if (config?.version) {
  document.getElementById("site-version").textContent = config.version;
  document.getElementById("download-version").textContent = config.version;
}

if (config?.downloads?.mac?.size) {
  document.getElementById("mac-size").textContent = `DMG · ${config.downloads.mac.size}`;
}

if (config?.downloads?.win?.size) {
  document.getElementById("win-size").textContent = `Installer · ${config.downloads.win.size}`;
}

bindDownload("hero-download-mac", "mac");
bindDownload("hero-download-win", "win");
bindDownload("download-mac", "mac");
bindDownload("download-win", "win");

function renderShowcase() {
  const grid = document.getElementById("showcase-grid");
  const shots = config?.screenshots ?? [];
  if (!grid) return;

  if (shots.length === 0) {
    grid.innerHTML = `<p class="showcase-empty">Screenshots coming soon.</p>`;
    return;
  }

  grid.innerHTML = shots
    .map(
      (shot) => `
      <figure class="showcase-item">
        <div class="showcase-frame">
          <img src="${shot.src}" alt="${shot.alt ?? "LyricsAI screenshot"}" loading="lazy" />
        </div>
        ${shot.caption ? `<figcaption>${shot.caption}</figcaption>` : ""}
      </figure>`
    )
    .join("");
}

renderShowcase();
