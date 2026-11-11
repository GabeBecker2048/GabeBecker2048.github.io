// Shared header and footer, so they are written once.
// <header data-topbar="projects"></header>  <footer data-foot></footer>
const SITE = {
  name: "Gabe Becker",
  avatar: "https://avatars.githubusercontent.com/u/78775796?v=4",
  github: "https://github.com/GabeBecker2048",
  resume: "#",   // TODO: /assets/gabe-becker-resume.pdf
  linkedin: "#", // TODO
  email: "#",    // TODO: mailto:
};

document.querySelectorAll("[data-topbar]").forEach(el => {
  const on = el.dataset.topbar;
  el.className = "topbar";
  el.innerHTML = `<div class="in">
    <a class="brand" href="/"><img src="${SITE.avatar}" alt=""><span class="bn">${SITE.name}</span></a>
    <nav>
      <a href="/" class="${on === "home" ? "on" : ""}">About</a>
      <a href="/projects/" class="${on === "projects" ? "on" : ""}">Projects</a>
      <a href="${SITE.resume}">Résumé</a>
      <a href="${SITE.github}">GitHub</a>
    </nav></div>`;
});

document.querySelectorAll("[data-foot]").forEach(el => {
  el.className = "foot";
  el.innerHTML = `<div class="in">
    <span>© ${new Date().getFullYear()} ${SITE.name}</span>
    <span><a href="${SITE.github}">GitHub</a><a href="${SITE.resume}">Résumé</a><a href="/projects/">Projects</a><a class="shell" href="/terminal/">prefer a shell? $_</a></span>
  </div>`;
});
