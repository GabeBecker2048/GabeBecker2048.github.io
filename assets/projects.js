// Project data + search/filter + the shared project row. Used by every page.
//
// The order of this list is the "Recommended" sort (the default on /projects/):
// move entries up or down to change it. The home page shows the first
// FEATURED_COUNT entries.
//
// Fields worth knowing:
//   desc     one or two sentences, for the home page and the terminal
//   long     the overview: a list of paragraphs. The first one must stand on
//            its own (it is the summary on /projects/); the project's own page
//            shows all of them.
//   status   "active", "wip" (not released yet) or "archived"
//   started  when work began: "YYYY", "YYYY-MM" or "YYYY-MM-DD", as precise as
//            is known. This is not always the repo's first commit (a prototype
//            may have lived elsewhere). Drives the "Newest/Oldest first" sorts.
//   updated  the last change, "YYYY-MM-DD". Public repos get the live date from
//            GitHub. Use "continuous" for something that changes all the time
//            and has no public repo (the homelab): no date is shown.
//   image    a 16:10 picture; the lists crop to that shape from the top.
//            Pictures for private repos live in /assets/img/ (the .svg files
//            there are the sources of the .png files). imageAlt describes it.
//   links.docs   the project's own docs site, when it has one. Without it,
//                public projects get a "Docs in the repo" link to the README.
//
// To add a project: add an entry below, copy any folder in /projects/ to
// /projects/<slug>/ (the stub reads the slug from the URL), and add the URL to
// /sitemap.xml.

const FEATURED_COUNT = 4;

const PROJECTS = [
  {
    slug: "murmur",
    name: "Murmur",
    private: true,
    tagline: "Does news predict prices, follow them, or move with them?",
    desc: "A daily pipeline that scores news-headline sentiment for the 100 largest US companies, stores it next to their stock prices, and tests whether news leads, lags or moves with returns.",
    long: [
      "Murmur is a daily data pipeline built to answer one question: does news predict stock prices, follow them, or move with them? Every evening it collects headlines for the 100 largest US companies, scores the sentiment of each one with FinBERT, stores the scores next to that day's prices, and correlates the two.",
      "Each trading day is split into an overnight and an intraday news window, and each window is compared with the overnight, intraday and daily return one day back, on the same day, and one day ahead. A shuffle test checks whether a result depends on matching each company to its own news, or would appear from market-wide moves alone. The store is SQLite and every write is an upsert, so any day can be rerun safely. The results are published as Parquet datasets behind a REST API and a dashboard.",
      "It began in 2023 as a small project with two collaborators that compared headline sentiment with stock prices, and was rebuilt in 2026 as a pipeline that runs every day on my home server. It is still a work in progress: the source will be public once the remaining work is done and the original contributors have agreed.",
    ],
    features: [
      "Its own index: the 100 largest US companies by market cap, rebuilt every month, with membership recorded per day so any past day can be reconstructed.",
      "Headlines from Yahoo, Finnhub and GDELT, stored once when several sources carry the same story. Prices from yfinance or Polygon.",
      "Sentiment scored with FinBERT on a CPU.",
      "Correlations at lags of -1, 0 and +1 days, per news source and pooled, daily and over rolling horizons.",
      "One Docker image in three roles: the API and dashboard, a scheduler, and a single worker with a job queue. Failed runs are retried, and a restart never loses a day.",
      "Published datasets in Parquet, with a manifest and a data dictionary.",
    ],
    version: "0.8.2",
    status: "wip",
    started: "2023-11-25",
    updated: "2026-11-08",
    tags: ["Python", "Data pipeline", "Finance", "Machine learning", "SQLite", "Parquet", "FastAPI", "REST", "Docker"],
    install: null,
    image: "/assets/img/murmur.png",
    imageAlt: "Chart: correlation between news sentiment and stock returns one session back, in the same session, and one session ahead",
    links: {},
  },
  {
    slug: "chesssnake",
    name: "chesssnake",
    tagline: "Play, render and persist chess games in Python.",
    desc: "A pure-Python chess engine, board renderer and REST game server backed by SQLite or PostgreSQL, with a web UI.",
    long: [
      "chesssnake is a chess engine, a board renderer and a game server in one Python package. You can play a game in a few lines of Python, draw any position as an image, or run the server and let many clients share games through a REST API.",
      "The server owns the rules, so a client cannot cheat and a frontend in any language needs no chess logic of its own. Games are kept in SQLite or PostgreSQL, clients can follow a game live over a websocket instead of polling, and the server comes with a web UI for playing, watching games in progress and managing accounts.",
      "It started as a prototype in early 2024 and has been on PyPI since December 2024. A live instance runs on my homelab.",
    ],
    features: [
      "Full rules: castling, en passant, promotion, and every draw condition.",
      "Board images from any position as PIL images.",
      "FEN, PGN and SAN in and out.",
      "REST API on SQLite or PostgreSQL, with live updates over websockets.",
      "A web UI to play, watch games and manage accounts.",
    ],
    version: "0.14.4",
    status: "active",
    started: "2024-02-03",
    updated: "2026-11-05",
    tags: ["Python", "REST", "FastAPI", "PostgreSQL", "SQLite", "WebSockets", "Docker", "Games"],
    install: "pip install chesssnake",
    image: "https://raw.githubusercontent.com/GabeBecker2048/chesssnake/main/docs/web-ui.png",
    links: {
      source: "https://github.com/GabeBecker2048/chesssnake",
      docs: "https://gabebecker.com/chesssnake/",
      pypi: "https://pypi.org/project/chesssnake/",
      docker: "https://github.com/GabeBecker2048/chesssnake/pkgs/container/chesssnake",
      issues: "https://github.com/GabeBecker2048/chesssnake/issues",
    },
  },
  {
    slug: "how-much-music",
    name: "how-much-music",
    tagline: "How many possible measures of music are there?",
    desc: "An exact count of every possible measure of 4/4 music on a piano: about 2.08 × 10³⁵ ways to write one. A paper, an interactive calculator and a Python tool.",
    long: [
      "How many different measures of music can exist? This project counts them exactly. For one measure of 4/4 on the 88 keys of a piano, with note values from sixteenth notes to whole notes, there are about 2.08 × 10³⁵ ways to write it and about 4.09 × 10³¹ ways it can sound.",
      "I first asked the question in high school, in 2018, and got halfway: I could count the measures that one set of notes produces, but had no way to list every set of notes that fills a measure. Years later I came back to it and saw that the list was never needed. Counting one note at a time gives a short recurrence that a computer evaluates instantly.",
      "The result is written up like a math paper, with an addendum that adds triplets, a calculator for any pitch range, time signature and set of note values, and the story of how the problem was solved. All of the arithmetic uses exact integers, so nothing is rounded.",
    ],
    features: [
      "The paper: the derivation, from the high-school formula to the recurrence f(t) = p · Σ f(t − d).",
      "The addendum: the same count with triplets, where the sounding count needs a small finite automaton.",
      "The calculator: any pitch range, time signature and set of note values, computed in the browser with exact integers.",
      "A Python command-line tool with no dependencies, and tests.",
    ],
    version: null,
    status: "active",
    started: "2018",
    updated: "2026-11-12",
    tags: ["Math", "Music", "Python", "JavaScript"],
    install: null,
    image: "/assets/img/how-much-music.png",
    imageAlt: "The recurrence that counts the measures, and the 36-digit answer",
    links: {
      source: "https://github.com/GabeBecker2048/how-much-music",
      docs: "https://gabebecker.com/how-much-music/",
      docsLabel: "Paper and calculator",
      issues: "https://github.com/GabeBecker2048/how-much-music/issues",
    },
  },
  {
    slug: "anchorless",
    name: "anchorless",
    tagline: "News without the anchor.",
    desc: "A 24/7 text news TV channel for Jellyfin, Plex and IPTV: headlines from public RSS feeds on a pixel-art news set.",
    long: [
      "Anchorless turns news headlines into a 24/7 TV channel that you can add to Jellyfin, Plex, Channels DVR or any IPTV player. The picture is an empty pixel-art news set: the news plays on the big screen behind a desk nobody sits at, with a headline crawl, background music and breaking-news alerts.",
      "It reads public RSS feeds, groups the same story across outlets, and builds a rundown of top stories, local, national, world and business news. When many outlets pick a story up at once, it interrupts the rundown as breaking news. There is no browser involved: Python draws the frames, ffmpeg encodes them, and nothing runs while nobody is watching.",
      "I built it for my own Jellyfin server, where it runs as live TV channels.",
    ],
    features: [
      "Pulls headlines from public RSS feeds and groups the same story across outlets.",
      "Breaking news interrupts the rundown when many outlets pick a story up at once.",
      "Two looks: the pixel-art Studio, or Classic cable-news pages.",
      "Lightweight: Python draws the frames, ffmpeg encodes them, nothing runs while nobody watches.",
    ],
    version: "1.0.2",
    status: "active",
    started: "2026-11-01",
    updated: "2026-11-07",
    tags: ["Python", "Docker", "ffmpeg", "RSS", "Self-hosted", "Media"],
    install: "pip install anchorless",
    image: "https://raw.githubusercontent.com/GabeBecker2048/anchorless/main/docs/studio.gif",
    links: {
      source: "https://github.com/GabeBecker2048/anchorless",
      docs: "https://gabebecker.com/anchorless/",
      pypi: "https://pypi.org/project/anchorless/",
      docker: "https://github.com/GabeBecker2048/anchorless/pkgs/container/anchorless",
      issues: "https://github.com/GabeBecker2048/anchorless/issues",
    },
  },
  {
    slug: "whirligig",
    name: "whirligig",
    tagline: "Let the wheel decide.",
    desc: "Spin a colorful ASCII wheel of fortune in your terminal, from the CLI or Python. Zero dependencies.",
    long: [
      "whirligig spins a colorful ASCII wheel of fortune in your terminal and lands on one of your choices: what's for lunch, who reviews the pull request, heads or tails. It is a command-line tool and a one-function Python library.",
      "The spin is a real animation: the arm sweeps the wheel, slows down and holds on the winner. It plays on the terminal while standard output carries only the chosen label, so it is safe to use in scripts. Odds can be weighted by repeating a label, labels can come from a file or a pipe, and there are ready-made wheels for a coin, dice, a clock and the alphabet.",
      "It began as a prototype in July 2024 and was released on PyPI in 2026. It has no dependencies and runs on Linux, macOS and Windows.",
    ],
    features: [
      "A proper spin: the arm sweeps, slows down and holds on the winner.",
      "Scripting-safe: LUNCH=$(whirligig ...) just works.",
      "Weighted odds, labels from a file or pipe, ready-made wheels.",
      "Zero dependencies; Linux, macOS and Windows.",
    ],
    version: "1.0.0",
    status: "active",
    started: "2024-07-25",
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
    long: [
      "My homelab is two small machines that run the services I use every day: a Docker host for the workloads, and a Raspberry Pi that is the front door, handling DNS, DHCP and HTTPS for the network.",
      "Every service is its own Docker Compose stack: Jellyfin for media, Immich for photos, a Minecraft network, and live instances of my own projects, including Murmur's daily job, the anchorless news channels and a chesssnake server. Prometheus and Alertmanager watch all of it and send push notifications to my phone through a self-hosted ntfy server. Nightly jobs update the container images and roll back when a service fails to come back up.",
      "The configuration is the real project. Both machines collect their configs every night and commit them to one git repository, with a guard that refuses to commit secrets, next to a wiki that records how everything works and why. The repository is private because it describes my own network.",
    ],
    features: [
      "Every service is its own Docker Compose stack with a README and an example env file. No secrets in git.",
      "A Raspberry Pi runs Pi-hole for DNS and DHCP, and Caddy as the HTTPS entry point, with fail2ban blocking abusive clients.",
      "Prometheus and Alertmanager watch the services and send push notifications through a self-hosted ntfy server.",
      "Hosts Jellyfin, Immich, a Minecraft server, and live instances of Murmur, anchorless and chesssnake.",
      "Configs are collected from both machines every night and committed, so drift shows up in git status and a rebuild starts from a known state.",
    ],
    version: null,
    status: "active",
    started: "2026-06-17",
    updated: "continuous",
    tags: ["Docker", "Linux", "Self-hosted", "Monitoring", "Networking", "Automation", "Media"],
    install: null,
    image: "/assets/img/homelab.png",
    imageAlt: "Diagram: a Raspberry Pi in front of a Docker host, with both machines' configs committed to one git repository",
    links: {},
  },
  {
    slug: "tetris-ai-demo",
    name: "tetris-ai-demo",
    tagline: "An AI that plays Tetris.",
    desc: "A Tetris game and an AI that plays it with a hand-built static evaluation function. An academic project from my junior year of college, with the slides I presented.",
    long: [
      "A Tetris game written from scratch with pygame, and an AI that plays it. I built it as an academic project in my junior year at Mississippi State, in the fall of 2021, and presented it under the title \"Tetris game playing AI using static evaluation function\".",
      "The AI does not chase points. Its strategy is to clear lines and survive for as long as possible, on the reasoning that an AI that never loses will end up with the higher score anyway. For each falling piece it simulates dropping it in every rotation and every column, scores the board that would result, and plays the best one.",
      "The score is a static evaluation function that I worked out by hand: E = w1·A + w2·B + w3·C + w4·D. Each term measures one thing about the board: the number of holes, the total height of the columns, how bumpy the surface is, and the height of the tallest column. Each is passed through a modified sigmoid function so that it lands between 0 and 1, where 1 is a clean board. The weights are 0.2, 0.35, 0.1 and 0.35, which add up to 1, so the whole score stays between 0 and 1 as well. One evaluation takes about 0.0003 seconds.",
      "The presentation also reports how well it worked. The AI clears about 20 to 30 lines a game, with a best of 90, which I described as a slightly below-average Tetris player that still beats a first-time human and decides far faster than one. My conclusion was that tuning an evaluation function with pencil and paper only goes so far, and that learning the weights is the way to build a proper Tetris AI. The slides, with the functions and their graphs, are in the repository.",
    ],
    features: [
      "A complete Tetris game in pygame on the standard 10 by 20 grid, with textures drawn in GIMP.",
      "Tries every rotation and column for each piece by simulating the drop.",
      "A static evaluation function over four measures of the board: holes, aggregate height, bumpiness and max height.",
      "The best move is turned into rotate, left and right actions and played like a human would.",
      "The search runs on a second thread, so the piece keeps falling while the AI decides.",
      "Clears about 20 to 30 lines a game; the best run was 90.",
    ],
    version: null,
    status: "archived",
    started: "2021-11",
    updated: "2023-02-08",
    tags: ["Python", "AI", "Math", "numpy", "Games"],
    install: null,
    image: "/assets/img/tetris-ai-demo.gif",
    imageAlt: "The AI playing Tetris and clearing lines, next to the four measures its board score is made of",
    links: {
      source: "https://github.com/GabeBecker2048/tetris-ai-demo",
      docs: "https://github.com/GabeBecker2048/tetris-ai-demo/blob/main/Tetris_presentation.pdf",
      docsLabel: "Presentation slides (PDF)",
    },
  },
  {
    slug: "mc-server-smartstart",
    name: "mc-server-smartstart",
    tagline: "Start and back up a Minecraft server.",
    desc: "A Windows batch script that automatically starts and backs up a Minecraft server. Works with vanilla, Bukkit or Forge.",
    long: [
      "A set of Windows batch scripts that start a Minecraft server and back up its world automatically: on startup, on shutdown, or both. It needs no plugins, so it works with any server, whether vanilla, Bukkit or Forge.",
      "The settings live in one file: how much memory the server gets, which jar to run, when to back up, and how many backups to keep before the oldest is deleted. To start the server you double-click start.bat. Written in 2022, for Windows only.",
    ],
    features: [
      "Backs up the world on startup, on shutdown, or both.",
      "Keeps a set number of backups and deletes the oldest.",
      "One backup per day or several, numbered.",
      "No plugins: works with vanilla, Bukkit and Forge servers.",
    ],
    version: null,
    status: "archived",
    started: "2022-10-07",
    updated: "2022-10-11",
    tags: ["Batch", "Windows", "Automation", "Games"],
    install: null,
    image: "/assets/img/mc-server-smartstart.png",
    imageAlt: "A Windows console running start.bat: it makes a backup, removes the oldest one, then starts the Minecraft server",
    links: { source: "https://github.com/GabeBecker2048/mc-server-smartstart" },
  },
];

// Every project has its own page at /projects/<slug>/
PROJECTS.forEach(p => (p.page = `/projects/${p.slug}/`));

/*
 * Live data: `version` comes from PyPI (projects with links.pypi) and `updated`
 * from GitHub's last push (projects with links.source). The values typed in
 * PROJECTS above are the fallback: pages render with them right away, then call
 * loadLive() and re-render if anything changed. Results are cached in the
 * visitor's browser for an hour to stay far below GitHub's 60 requests/hour.
 */
const LIVE_KEY = "live-projects", LIVE_TTL = 60 * 60 * 1000;
let livePromise;
function loadLive() {
  return (livePromise ||= (async () => {
    let live = null;
    try { const c = JSON.parse(localStorage.getItem(LIVE_KEY)); if (c && Date.now() - c.at < LIVE_TTL) live = c.data; } catch {}
    if (!live) {
      live = {};
      const set = (slug, key, val) => { if (val) (live[slug] ||= {})[key] = val; };
      const repoOf = p => p.links.source?.split("/").pop();
      await Promise.allSettled([
        fetch("https://api.github.com/users/GabeBecker2048/repos?per_page=100")
          .then(r => (r.ok ? r.json() : []))
          .then(repos => PROJECTS.forEach(p => set(p.slug, "updated", repos.find(r => r.name === repoOf(p))?.pushed_at?.slice(0, 10)))),
        ...PROJECTS.filter(p => p.links.pypi).map(p =>
          fetch(`https://pypi.org/pypi/${p.links.pypi.match(/project\/([^/]+)/)[1]}/json`)
            .then(r => (r.ok ? r.json() : null))
            .then(d => set(p.slug, "version", d?.info?.version))),
      ]);
      if (Object.keys(live).length) { try { localStorage.setItem(LIVE_KEY, JSON.stringify({ at: Date.now(), data: live })); } catch {} }
    }
    let changed = false;
    PROJECTS.forEach(p => {
      for (const [k, v] of Object.entries(live[p.slug] || {})) if (v !== p[k]) { p[k] = v; changed = true; }
    });
    return changed;
  })());
}

// Sort orders for the "Sort by" dropdown. Ties keep the recommended order.
const SORTS = {
  recommended: () => 0,
  az: (a, b) => a.name.localeCompare(b.name),
  maintained: (a, b) => (a.status === "archived" ? 1 : 0) - (b.status === "archived" ? 1 : 0),
  newest: (a, b) => b.started.localeCompare(a.started),
  oldest: (a, b) => a.started.localeCompare(b.started),
};

// Small shared labels, used by the rows and the project pages.
const STATUS_TEXT = { active: "Maintained", wip: "Work in progress, not released yet", archived: "Archived" };
const pillText = p => (p.status === "wip" ? "WIP" + (p.version ? ` · v${p.version}` : "") : p.version ? `v${p.version}` : p.status === "archived" ? "archived" : "ongoing");
const startedYear = p => p.started.slice(0, 4);
const updatedText = p => (p.updated === "continuous" ? "Continuously" : p.updated);
// Where a project's docs are: its own site, or else the README of a public repo.
const docsLink = p => (p.links.docs ? { href: p.links.docs, label: p.links.docsLabel || "Docs" }
  : p.links.source ? { href: p.links.source + "#readme", label: "Docs in the repo" } : null);

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
  const docs = docsLink(p);
  const links = [
    `<a class="main" href="${p.page}">${p.install ? "Overview &amp; install" : "Overview"} →</a>`,
    docs ? `<a href="${docs.href}">${esc(docs.label)}</a>` : "",
    p.links.source ? `<a href="${p.links.source}">Source</a>` : "",
    p.links.pypi ? `<a href="${p.links.pypi}">PyPI</a>` : "",
  ].join("");
  return `
    <article class="prow ${compact ? "compact" : ""} ${p.image ? "" : "noimg"}" data-href="${p.page}">
      ${p.image ? `<img src="${p.image}" alt="${esc(p.imageAlt || p.name + " screenshot")}">` : ""}
      <div>
        <h3><a href="${p.page}">${esc(p.name)}</a><span class="ver${p.status === "wip" ? " wip" : ""}">${pillText(p)}</span><span class="since">started ${startedYear(p)}</span></h3>
        <div class="tagline">${esc(p.tagline)}</div>
        <p>${esc(compact ? p.desc : p.long[0])}</p>
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
