// Renders a project page from the shared data. Each /projects/<slug>/index.html
// is a tiny stub that loads this; the slug comes from the URL.
(function () {
  const slug = location.pathname.split("/").filter(Boolean).pop();
  const p = PROJECTS.find(x => x.slug === slug);
  const root = document.getElementById("root");
  if (!p) { root.innerHTML = `<main class="page"><h1>Not found</h1><p><a href="/projects/">All projects</a></p></main>`; return; }

  document.title = `${p.name} · Gabe Becker`;
  const L = p.links;
  const related = PROJECTS.filter(x => x !== p)
    .map(x => ({ x, n: x.tags.filter(t => p.tags.includes(t) && t !== "Python").length }))
    .filter(r => r.n > 0).sort((a, b) => b.n - a.n).slice(0, 3);

  root.innerHTML = `
  <aside>
    <div class="group"><div class="label">On this page</div>
      <a href="#top" class="on">Overview</a>
      ${p.install ? `<a href="#install">Install</a>` : ""}
      <a href="#features">Features</a>
      ${L.issues ? `<a href="#help">Get help</a>` : ""}
    </div>
    <div class="group"><div class="label">Links</div>
      <a href="${L.source}">Source ↗</a>
      ${L.source && p.status === "active" ? `<a href="${L.source}/blob/main/CHANGELOG.md">Changelog ↗</a>` : ""}
      ${L.pypi ? `<a href="${L.pypi}">PyPI ↗</a>` : ""}
      ${L.docker ? `<a href="${L.docker}">Docker image ↗</a>` : ""}
      ${L.issues ? `<a href="${L.issues}">Report a bug ↗</a>` : ""}
    </div>
    <div class="group"><div class="label">Projects</div>
      ${PROJECTS.map(x => `<a href="${x.page}" class="${x === p ? "on" : ""}">${esc(x.name)}</a>`).join("")}
    </div>
  </aside>
  <main class="page" id="top">
    <p class="crumbs"><a href="/projects/">Projects</a> / ${esc(p.name)}</p>
    <h1>${esc(p.name)} <span class="ver">${p.version ? "v" + p.version : "archived"}</span></h1>
    <p class="lede">${esc(p.tagline)} ${esc(p.long)}</p>
    <div class="ptags">${p.tags.map(t => `<a class="ptag" href="/projects/?tag=${encodeURIComponent(t)}">${esc(t)}</a>`).join("")}</div>
    <div class="facts">
      <div><b>Latest</b>${p.version ? "v" + p.version : "n/a"}</div>
      <div><b>Status</b>${p.status === "active" ? "Maintained" : "Archived"}</div>
      <div><b>Started</b>${p.started}</div>
      <div><b>Updated</b>${p.updated}</div>
    </div>
    ${p.image ? `<img class="shot" src="${p.image}" alt="${esc(p.name)} screenshot">` : ""}
    ${p.install ? `<h2 id="install">Install</h2><pre>${esc(p.install)}</pre><p class="muted">Full instructions are in the <a href="${L.source}#readme">README</a>.</p>` : ""}
    <h2 id="features">Features</h2>
    <ul>${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
    ${L.issues ? `<h2 id="help">Get help</h2><p>Found a bug or have a question? <a href="${L.issues}">Open an issue on GitHub</a>.</p>` : ""}
    ${related.length ? `<h2>Related projects</h2><ul>${related.map(({ x }) => `<li><a href="${x.page}">${esc(x.name)}</a>: ${esc(x.desc)}</li>`).join("")}</ul>` : ""}
  </main>`;
})();
