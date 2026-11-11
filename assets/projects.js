// Shared project data + search/filter logic used by every mockup.
// In the real site this would be one data file (or generated from GitHub topics).

const PROJECTS = [
  {
    slug: "anchorless",
    name: "anchorless",
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
 *   render(list, state): draws the filtered projects
 *   extra(p, state) (optional): extra predicate, e.g. hide archived
 * Selected tags must ALL match (AND). State is kept in the URL (?q=...&tag=...).
 */
function setupFilter({ search, tagsEl, activeEl, label = "Tags", render, extra }) {
  const params = new URLSearchParams(location.search);
  const state = { q: params.get("q") || "", tags: new Set(params.getAll("tag")) };
  search.value = state.q;

  const tags = allTags();
  tagsEl.innerHTML =
    `<details class="tagpick"><summary><span class="tp-label">${esc(label)}</span><span class="tp-n"></span></summary>` +
    `<div class="tp-menu">` +
    tags.map(({ tag, count }) => `<label><input type="checkbox" value="${esc(tag)}"> <span>${esc(tag)}</span> <span class="tp-c">${count}</span></label>`).join("") +
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
    return extra ? extra(p, state) : true;
  }

  function update() {
    boxes.forEach(b => (b.checked = state.tags.has(b.value)));
    const n = state.tags.size;
    tagsEl.querySelector(".tp-n").textContent = n ? ` (${n})` : "";
    if (activeEl) {
      activeEl.innerHTML = n
        ? [...state.tags].map(t => `<button class="chip on" data-tag="${esc(t)}" title="Remove filter">${esc(t)} ×</button>`).join("") +
          `<button class="chip clear" data-clear>Clear all</button>`
        : "";
    }
    const url = new URLSearchParams();
    if (state.q) url.set("q", state.q);
    state.tags.forEach(t => url.append("tag", t));
    history.replaceState(null, "", url.toString() ? "?" + url : location.pathname);
    render(PROJECTS.filter(matches), state);
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

// Every project has its own page at /projects/<slug>/
PROJECTS.forEach(p => (p.page = `/projects/${p.slug}/`));
