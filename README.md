# gabebecker.com

My personal site: who I am, my projects, and my stance on AI. Plain HTML, CSS
and a little JavaScript, served by GitHub Pages. No build step.

## Preview locally

From the repo root:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. It has to be served from the root because pages
use absolute paths like `/assets/site.css`. (The custom 404 page only works on
GitHub Pages.)

## Where things live

| What | File |
|---|---|
| About, "Currently", title, skills, experience | `index.html` (hand-written) |
| My stance on AI | `ai/index.html`, inside `<article id="ai-stance">` (hand-written) |
| Project data (all pages read this) | `assets/projects.js` |
| Navbar, footer, contact links | `assets/layout.js` (`SITE` at the top) |
| Styles | `assets/site.css` (the terminal has its own styles) |
| Project page template | `assets/project-page.js` |
| Terminal | `terminal/index.html` |
| Résumé | `GabrielBecker_Resume.pdf` in the repo root (replace the file to update it) |

The terminal reads the About, experience and AI text from the real pages, so
edit those once in `index.html` / `ai/index.html` and the terminal follows.
Keep the ids (`about`, `now`, `experience`, `ai-stance`) and classes it looks
for: `.lead` for About, and for each experience entry `.job` containing
`.job-title`, `.org`, `.start`, `.end` and an optional `<p>`. The terminal turns
the experience entries into `experience.csv` and shows them as a DuckDB query.

## Add a project

1. Add an entry to `PROJECTS` in `assets/projects.js` (copy an existing one).
   The list order is the "Recommended" sort, and the first four entries are
   the ones on the home page. `long` is a list of paragraphs: the first is the
   summary on `/projects/`, and the project's page shows all of them. `started`
   is when work began (`YYYY`, `YYYY-MM` or `YYYY-MM-DD`) and drives the
   Newest/Oldest sorts. `status` is `active`, `wip` or `archived`. Leave
   `links.source` out and set `private: true` for a private repo. Set
   `links.docs` when the project has its own docs site; without it a public
   project links to its README. `links.more` adds other links to the
   project's page, as `[{ href, label }]`. `version` and `updated` are
   fallbacks: pages replace them with the live PyPI version (if `links.pypi`
   is set) and the GitHub last-push date (if `links.source` is one of my own
   repos; a repo under someone else's account keeps the typed date).
2. Copy any folder in `projects/` to `projects/<slug>/` and change the title,
   description and URLs in its `<head>`. The page content comes from the data.
3. Add `https://gabebecker.com/projects/<slug>/` to `sitemap.xml`.
