// Project data + search/filter + the shared project row. Used by every page.
//
// The order of this list is the "Recommended" sort (the default on /projects/):
// move entries up or down to change it.
//
// To add a project: add an entry below, copy any folder in /projects/ to
// /projects/<slug>/ (the stub reads the slug from the URL), and add the URL to
// /sitemap.xml.

const PROJECTS = [
  {
    slug: "anchorless",
    name: "anchorless",
    featured: true,
    tagline: "News without the anchor.",
    desc: "A 24/7 text news TV channel for Jellyfin, Plex and IPTV: headlines from public RSS feeds on a pixel-art news set.",
    long: "Turns RSS headlines into a 24/7 TV channel you can add to Jellyfin, Plex, Channels DVR or any IPTV player: an empty pixel-art news set with a headline crawl, background music and breaking-news alerts.",
    features: [
      "Pulls headlines from public RSS feeds and groups the same story across outlets.",
      "Breaking news interrupts the rundown when many outlets pick a story up at once.",
      "Two looks: the pixel-art Studio, or Classic cable-news pages.",
      "Lightweight: Python draws the frames, ffmpeg encodes them, nothing runs while nobody watches.",
    ],
    version: "1.0.2",
    status: "active",
    started: "2026-11",
    updated: "2026-11-07",
    tags: ["Python", "Docker", "ffmpeg", "RSS", "Self-hosted", "Media"],
    install: "pip install anchorless",
    image: "https://raw.githubusercontent.com/GabeBecker2048/anchorless/main/docs/studio.gif",
    links: {
      source: "https://github.com/GabeBecker2048/anchorless",
      pypi: "https://pypi.org/project/anchorless/",
      docker: "https://github.com/GabeBecker2048/anchorless/pkgs/container/anchorless",
      issues: "https://github.com/GabeBecker2048/anchorless/issues",
    },
  },
  {
    slug: "chesssnake",
    name: "chesssnake",
    featured: true,
    tagline: "Play, render and persist chess games in Python.",
    desc: "A pure-Python chess engine, board renderer and REST game server backed by SQLite or PostgreSQL, with a web UI.",
    long: "A chess engine, a board renderer and a game server in one package. The server owns the rules, so a client cannot cheat and a frontend in any language needs no chess logic of its own.",
    features: [
      "Full rules: castling, en passant, promotion, and every draw condition.",
      "Board images from any position as PIL images.",
      "FEN, PGN and SAN in and out.",
      "REST API on SQLite or PostgreSQL, with live updates over websockets.",
      "A web UI to play, watch games and manage accounts.",
    ],
    version: "0.14.4",
    status: "active",
    started: "2024-11",
    updated: "2026-11-05",
    tags: ["Python", "REST", "FastAPI", "PostgreSQL", "SQLite", "WebSockets", "Docker", "Games"],
    install: "pip install chesssnake",
    image: "https://raw.githubusercontent.com/GabeBecker2048/chesssnake/main/docs/web-ui.png",
    links: {
      source: "https://github.com/GabeBecker2048/chesssnake",
      pypi: "https://pypi.org/project/chesssnake/",
      docker: "https://github.com/GabeBecker2048/chesssnake/pkgs/container/chesssnake",
      issues: "https://github.com/GabeBecker2048/chesssnake/issues",
    },
  },
  {
    slug: "whirligig",
    name: "whirligig",
    featured: true,
    tagline: "Let the wheel decide.",
    desc: "Spin a colorful ASCII wheel of fortune in your terminal, from the CLI or Python. Zero dependencies.",
    long: "Spins a colorful ASCII wheel of fortune in your terminal and lands on one of your choices. The animation plays on the terminal but stdout is only the chosen label, so it is safe to use in scripts.",
    features: [
      "A proper spin: the arm sweeps, slows down and holds on the winner.",
      "Scripting-safe: LUNCH=$(whirligig ...) just works.",
      "Weighted odds, labels from a file or pipe, ready-made wheels.",
      "Zero dependencies; Linux, macOS and Windows.",
    ],
    version: "1.0.0",
    status: "active",
    started: "2026-07",
    updated: "2026-11-05",
    tags: ["Python", "CLI", "Library", "Terminal"],
    install: "uvx whirligig Pizza Sushi Tacos",
    image: "https://raw.githubusercontent.com/GabeBecker2048/whirligig/main/demo/demo.gif",
    links: {
      source: "https://github.com/GabeBecker2048/whirligig",
      pypi: "https://pypi.org/project/whirligig/",
      issues: "https://github.com/GabeBecker2048/whirligig/issues",
    },
  },
  {
    slug: "homelab",
    name: "homelab",
    private: true,
    tagline: "Two small machines that run my self-hosted services.",
    desc: "My self-hosted setup: a Docker host and a Raspberry Pi running media, photos, a game server and my own projects, with monitoring, alerts and version-controlled configs.",
    long: "A Docker host that runs every service as its own Compose stack, and a Raspberry Pi that handles DNS, DHCP and HTTPS for the network. Monitoring tells me when something breaks, and every config lives in one git repo.",
    features: [
      "Every service is its own Docker Compose stack with a README and an example env file. No secrets in git.",
      "A Raspberry Pi runs Pi-hole for DNS and DHCP, and Caddy as the HTTPS entry point, with fail2ban blocking abusive clients.",
      "Prometheus and Alertmanager watch the services and send push notifications through a self-hosted ntfy server.",
      "Hosts Jellyfin, Immich, a Minecraft server, and live instances of anchorless and chesssnake.",
      "Configs are collected from both machines every night and committed, so drift shows up in git status and a rebuild starts from a known state.",
    ],
    version: null,
    status: "active",
    started: "2026-08",
    updated: "2026-11-07",
    tags: ["Docker", "Linux", "Self-hosted", "Monitoring", "Networking", "Automation", "Media"],
    install: null,
    image: null,
    links: {},
  },
  {
    slug: "tetris-ai-demo",
    name: "tetris-ai-demo",
    tagline: "An AI that plays Tetris.",
    desc: "An AI that plays Tetris, scoring candidate placements with board heuristics. Built with pygame and numpy.",
    long: "For each falling piece it tries every possible placement and picks the one that leaves the best board, judged by a few simple heuristics.",
    features: ["Tries every rotation and position of the current piece.", "Scores each board by holes, aggregate height, bumpiness and max height.", "Rendered live with pygame."],
    version: null,
    status: "archived",
    started: "2023-02",
    updated: "2023-02-08",
    tags: ["Python", "AI", "Math", "numpy", "Games"],
    install: null,
    image: null,
    links: { source: "https://github.com/GabeBecker2048/tetris-ai-demo" },
  },
  {
    slug: "mc-server-smartstart",
    name: "mc-server-smartstart",
    tagline: "Start and back up a Minecraft server.",
    desc: "A Windows batch script that automatically starts and backs up a Minecraft server. Works with vanilla, Bukkit or Forge.",
    long: "A simple Windows batch script that keeps a server running and backed up. Works with any server: vanilla, Bukkit or Forge.",
    features: ["Automatic restarts.", "Automatic backups."],
    version: null,
    status: "archived",
    started: "2022-10",
    updated: "2022-10-11",
    tags: ["Batch", "Windows", "Automation", "Games"],
    install: null,
    image: null,
    links: { source: "https://github.com/GabeBecker2048/mc-server-smartstart" },
  },
];

// Every project has its own page at /projects/<slug>/
PROJECTS.forEach(p => (p.page = `/projects/${p.slug}/`));

// Sort orders for the "Sort by" dropdown. Ties keep the recommended order.
const SORTS = {
  recommended: () => 0,
  az: (a, b) => a.name.localeCompare(b.name),
  maintained: (a, b) => (a.status === "active" ? 0 : 1) - (b.status === "active" ? 0 : 1),
};

function allTags() {
  const counts = {};
  PROJECTS.forEach(p => p.tags.forEach(t => (counts[t] = (counts[t] || 0) + 1)));
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b)).map(t => ({ tag: t, count: counts[t] }));
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/*
 * setupFilter wires a search box and a tag dropdown to a render callback.
 *   search:  <input>
 *   tagsEl:  empty container, a <details> dropdown with checkboxes is built inside
 *   activeEl (optional): container that shows the selected tags as removable chips
 *   label:   text on the dropdown button
 *   sortEl (optional): <select> whose option values are keys of SORTS
 *   render(list, state): draws the filtered, sorted projects
 * Selected tags must ALL match (AND). State is kept in the URL (?q=...&tag=...&sort=...).
 */
function setupFilter({ search, tagsEl, activeEl, sortEl, label = "Tags", render }) {
  const params = new URLSearchParams(location.search);
  const state = { q: params.get("q") || "", tags: new Set(params.getAll("tag")), sort: SORTS[params.get("sort")] ? params.get("sort") : "recommended" };
  search.value = state.q;
  if (sortEl) { sortEl.value = state.sort; sortEl.addEventListener("change", () => { state.sort = sortEl.value; update(); }); }

  tagsEl.innerHTML =
    `<details class="tagpick"><summary><span class="tp-label">${esc(label)}</span><span class="tp-n"></span></summary>` +
    `<div class="tp-menu">` +
    allTags().map(({ tag, count }) => `<label><input type="checkbox" value="${esc(tag)}"> <span>${esc(tag)}</span> <span class="tp-c">${count}</span></label>`).join("") +
    `</div></details>`;
  const details = tagsEl.querySelector("details");
  const boxes = [...tagsEl.querySelectorAll("input")];
  boxes.forEach(b => b.addEventListener("change", () => { b.checked ? state.tags.add(b.value) : state.tags.delete(b.value); update(); }));
  document.addEventListener("click", e => { if (!details.contains(e.target)) details.open = false; });

  search.addEventListener("input", () => { state.q = search.value; update(); });
  document.addEventListener("keydown", e => {
    if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) { e.preventDefault(); search.focus(); }
    if (e.key === "Escape") { details.open = false; if (document.activeElement === search) { search.value = ""; state.q = ""; update(); } }
  });

  function matches(p) {
    const q = state.q.trim().toLowerCase();
    const hay = [p.name, p.desc, p.tagline, ...p.tags].join(" ").toLowerCase();
    if (q && !q.split(/\s+/).every(w => hay.includes(w))) return false;
    for (const t of state.tags) if (!p.tags.includes(t)) return false;
    return true;
  }

  function update() {
    boxes.forEach(b => (b.checked = state.tags.has(b.value)));
    const n = state.tags.size;
    tagsEl.querySelector(".tp-n").textContent = n ? ` (${n})` : "";
    if (activeEl) {
      activeEl.innerHTML = n
        ? [...state.tags].map(t => `<button class="chip" data-tag="${esc(t)}" title="Remove filter">${esc(t)} ×</button>`).join("") +
          `<button class="chip clear" data-clear>Clear all</button>`
        : "";
    }
    const url = new URLSearchParams();
    if (state.q) url.set("q", state.q);
    state.tags.forEach(t => url.append("tag", t));
    if (state.sort !== "recommended") url.set("sort", state.sort);
    history.replaceState(null, "", url.toString() ? "?" + url : location.pathname);
    const list = PROJECTS.filter(matches);
    render(list.map((p, i) => [p, i]).sort(([a, i], [b, j]) => SORTS[state.sort](a, b) || i - j).map(([p]) => p), state);
  }

  // Any element with data-tag toggles that tag; data-clear resets everything.
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-tag]");
    if (t) { e.preventDefault(); const v = t.dataset.tag; state.tags.has(v) ? state.tags.delete(v) : state.tags.add(v); update(); return; }
    if (e.target.closest("[data-clear]")) { e.preventDefault(); state.tags.clear(); state.q = ""; search.value = ""; update(); }
  });

  update();
  return { state, update };
}

/*
 * The one project row used on the home page (compact) and /projects/ (full).
 * state is optional: when given, tags are filter buttons; otherwise they link
 * to /projects/?tag=...
 */
function projectRow(p, { compact = false, state = null } = {}) {
  const tag = t => state
    ? `<button class="ptag ${state.tags.has(t) ? "on" : ""}" data-tag="${esc(t)}">${esc(t)}</button>`
    : `<a class="ptag" href="/projects/?tag=${encodeURIComponent(t)}">${esc(t)}</a>`;
  const pill = p.version ? `v${p.version}` : p.status === "archived" ? `archived · ${p.started.slice(0, 4)}` : "ongoing";
  const links = [
    `<a class="main" href="${p.page}">${p.install ? "Docs &amp; install" : "Details"} →</a>`,
    p.links.source ? `<a href="${p.links.source}">Source</a>` : "",
    p.links.pypi ? `<a href="${p.links.pypi}">PyPI</a>` : "",
  ].join("");
  return `
    <article class="prow ${compact ? "compact" : ""} ${p.image ? "" : "noimg"}" data-href="${p.page}">
      ${p.image ? `<img src="${p.image}" alt="${esc(p.name)} screenshot">` : ""}
      <div>
        <h3><a href="${p.page}">${esc(p.name)}</a><span class="ver">${pill}</span></h3>
        <div class="tagline">${esc(p.tagline)}</div>
        <p>${esc(compact ? p.desc : p.long)}</p>
        ${!compact && p.install ? `<div class="install"><code>${esc(p.install)}</code><button data-copy="${esc(p.install)}">Copy</button></div>` : ""}
        <div class="ptags">${p.tags.map(tag).join("")}</div>
        <div class="links">${links}</div>
      </div>
    </article>`;
}

// Whole row opens the project page, except clicks on links, buttons, the
// install command, or while selecting text. Also wires the Copy buttons.
function enableRowClicks() {
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-copy]");
    if (b) {
      navigator.clipboard?.writeText(b.dataset.copy).then(() => { b.textContent = "Copied"; setTimeout(() => (b.textContent = "Copy"), 1200); });
      return;
    }
    const row = e.target.closest(".prow[data-href]");
    if (row && !e.target.closest("a, button, .install") && !getSelection().toString()) location.href = row.dataset.href;
  });
}
