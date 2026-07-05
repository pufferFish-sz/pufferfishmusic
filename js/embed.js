/* ==========================================================================
   Dual YouTube / Bilibili video embed component.
   --------------------------------------------------------------------------
   You should not need to edit this file. Video IDs live in js/videos.js.

   How it works:
   - Every <div class="video-embed" data-video="key"> is upgraded into a
     player card with a "YouTube | Bilibili" toggle.
   - Nothing is loaded from YouTube/Bilibili until the visitor clicks play
     (click-to-load facade) — keeps pages fast and privacy-friendly.
   - YouTube uses the privacy-enhanced youtube-nocookie.com domain.
   - The visitor's source choice is remembered in localStorage and applied
     to every embed on the site.
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "pfm-video-source"; // "yt" | "bili"

  function isPlaceholder(id) {
    return !id || id.startsWith("YT_") || id.startsWith("BILI_");
  }

  function preferredSource() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "yt" || saved === "bili") return saved;
    } catch (e) { /* private browsing — fall through */ }
    return "yt"; // default source
  }

  function savePreference(source) {
    try { localStorage.setItem(STORAGE_KEY, source); } catch (e) { /* ignore */ }
  }

  function embedUrl(source, video) {
    if (source === "yt") {
      return "https://www.youtube-nocookie.com/embed/" +
        encodeURIComponent(video.yt) + "?autoplay=1&rel=0";
    }
    return "https://player.bilibili.com/player.html?bvid=" +
      encodeURIComponent(video.bili) + "&page=1&autoplay=0&high_quality=1";
  }

  /* Build the facade (thumbnail + play button) for the current source. */
  function renderBody(body, source, video) {
    body.innerHTML = "";
    const id = source === "yt" ? video.yt : video.bili;

    if (isPlaceholder(id)) {
      const panel = document.createElement("div");
      panel.className = "ve-placeholder";
      const label = source === "yt" ? "YouTube" : "Bilibili";
      panel.innerHTML =
        "<strong>" + video.title + "</strong>" +
        "<span>" + label + " version coming soon</span>";
      body.appendChild(panel);
      return;
    }

    const facade = document.createElement("button");
    facade.type = "button";
    facade.className = "ve-facade";
    facade.setAttribute("aria-label", "Play video: " + video.title);

    // YouTube offers free thumbnails; Bilibili does not (CORS), so the
    // Bilibili facade uses the styled dark panel background instead.
    if (source === "yt") {
      facade.style.backgroundImage =
        "url(https://i.ytimg.com/vi/" + encodeURIComponent(video.yt) + "/hqdefault.jpg)";
    }

    const play = document.createElement("span");
    play.className = "ve-play";
    play.setAttribute("aria-hidden", "true");
    const hint = document.createElement("span");
    hint.className = "ve-hint";
    hint.textContent = source === "yt" ? "Play on YouTube" : "Play on Bilibili";

    facade.appendChild(play);
    facade.appendChild(hint);
    facade.addEventListener("click", function () {
      const iframe = document.createElement("iframe");
      iframe.src = embedUrl(source, video);
      iframe.title = video.title;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      iframe.setAttribute("allowfullscreen", "");
      iframe.loading = "lazy";
      body.innerHTML = "";
      body.appendChild(iframe);
    });

    body.appendChild(facade);
  }

  function upgrade(container) {
    const key = container.dataset.video;
    const video = typeof VIDEOS !== "undefined" ? VIDEOS[key] : null;
    if (!video) {
      container.innerHTML =
        '<div class="ve-body"><div class="ve-placeholder">' +
        "<strong>Unknown video key: " + key + "</strong>" +
        "<span>Add it to js/videos.js</span></div></div>";
      return;
    }

    let source = preferredSource();

    const header = document.createElement("div");
    header.className = "ve-header";
    const title = document.createElement("span");
    title.className = "ve-title";
    title.textContent = video.title;

    const tabs = document.createElement("div");
    tabs.className = "ve-tabs";
    tabs.setAttribute("role", "group");
    tabs.setAttribute("aria-label", "Video source for " + video.title);

    const body = document.createElement("div");
    body.className = "ve-body";

    const buttons = {};
    [["yt", "YouTube"], ["bili", "Bilibili"]].forEach(function (pair) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ve-tab";
      btn.textContent = pair[1];
      btn.setAttribute("aria-pressed", String(source === pair[0]));
      btn.addEventListener("click", function () {
        if (source === pair[0]) return;
        source = pair[0];
        savePreference(source);
        Object.keys(buttons).forEach(function (k) {
          buttons[k].setAttribute("aria-pressed", String(k === source));
        });
        renderBody(body, source, video);
      });
      buttons[pair[0]] = btn;
      tabs.appendChild(btn);
    });

    header.appendChild(title);
    header.appendChild(tabs);
    container.appendChild(header);
    container.appendChild(body);
    renderBody(body, source, video);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".video-embed[data-video]").forEach(upgrade);
  });
})();
