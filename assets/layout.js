// Shared navbar and footer, written once.
//   <header data-topbar="projects"></header>   (value marks the active nav item)
//   <footer data-foot></footer>
const SITE = {
  name: "Gabe Becker",
  domain: "https://gabebecker.com",
  avatar: "https://avatars.githubusercontent.com/u/78775796?v=4",
  github: "https://github.com/GabeBecker2048",
  resume: "/resume.pdf", // drop the PDF at the repo root
  linkedin: "#",         // TODO
  email: "#",            // TODO: mailto:you@example.com
};

document.querySelectorAll("[data-topbar]").forEach(el => {
  const on = el.dataset.topbar;
  const item = (key, href, label) => `<a href="${href}"${on === key ? ' class="on" aria-current="page"' : ""}>${label}</a>`;
  el.className = "topbar";
  el.innerHTML = `<div class="in">
    <a class="brand" href="/"><img src="${SITE.avatar}" alt=""><span class="bn">${SITE.name}</span></a>
    <nav>
      ${item("projects", "/projects/", "Projects")}
      ${item("ai", "/ai/", "AI")}
      ${item("resume", SITE.resume, "Résumé")}
      ${item("github", SITE.github, "GitHub")}
    </nav></div>`;
});

document.querySelectorAll("[data-foot]").forEach(el => {
  el.className = "foot";
  el.innerHTML = `<div class="in">
    <span>© ${new Date().getFullYear()} ${SITE.name}</span>
    <span><a href="/projects/">Projects</a><a href="/ai/">AI</a><a href="${SITE.resume}">Résumé</a><a href="${SITE.github}">GitHub</a><a class="shell" href="/terminal/">prefer a shell? $_</a></span>
  </div>`;
});
