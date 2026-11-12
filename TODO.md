# TODO before gabebecker.com goes live

Everything that still needs your own words, files or decisions. The code is
done; these are content and setup. Tick items off as you go.

Preview while you edit (from the repo root), then open http://localhost:8000:

```sh
python3 -m http.server 8000
```

Hard-refresh (Ctrl+Shift+R) after each edit; browsers cache this server's files.
The terminal page (`/terminal/`) reads your text from the home and AI pages, so
it updates by itself. Nothing below needs editing twice unless it says so.

---

## 1. Must do (placeholders visible on the site)

### ☐ About paragraph
- **File:** `index.html`, `<p class="lead">` in the `About` section.
- **How:** replace the bracketed text with a few sentences: what you like
  building, how you got into data engineering, what you're looking for next.
- Plain text inside the `<p>`. Keep `class="lead"` (the terminal reads it).

### ☐ "Currently" line
- **File:** `index.html`, `<div class="now" id="now">`.
- **How:** keep `<b>Currently:</b>` and replace the bracketed text after it,
  e.g. `shipping anchorless 1.x and learning Rust`.

### ☐ Experience and education
- **File:** `index.html`, the `Experience` section. One `<div class="job">` per
  entry; add or delete whole blocks as needed.
- **How:** fill in each field and keep the class names (the terminal turns
  them into `experience.csv`):
  ```html
  <div class="job">
    <div class="head"><b><span class="job-title">Data Engineer</span> · <span class="org">Acme</span></b><span class="when"><span class="start">2024-06</span> – <span class="end">Present</span></span></div>
    <p>One or two sentences: the systems, the scale, the stack.</p>
  </div>
  ```
- Dates as `YYYY-MM` or `YYYY` so the terminal's newest-first sort works.
  `end` can be `Present`. The `<p>` is optional (education usually has none).
- Keep it short: the full detail belongs in the résumé PDF.

### ☐ Résumé PDF
- **File:** add `resume.pdf` to the repo root (exactly that name).
- **How:** export your résumé to PDF and copy it in. Every "Résumé" link and
  the terminal's `resume` / `sudo hire-me` point to `/resume.pdf`, so they all
  start working at once. To update later, replace the file.
- Until it exists, those links are 404s.

### ☐ LinkedIn and email links
These appear in **two places**; edit both:
1. `assets/layout.js`, the `SITE` object at the top:
   ```js
   linkedin: "https://www.linkedin.com/in/your-handle/",
   email: "mailto:you@example.com",
   ```
2. `index.html`, the profile card line with
   `<a href="#">LinkedIn</a><a href="#">Email</a>`: replace each `#` with the
   same URLs.
- If you'd rather not publish an email address, delete the Email link instead.

### ☐ My stance on AI
- **File:** `ai/index.html`, inside `<article id="ai-stance" class="prose">`.
- **How:** replace `<p>[Your text here.]</p>` with your text. Use plain HTML:
  `<p>`, `<h2>`, `<ul>`/`<ol>` + `<li>`, `<blockquote>`. Everything must stay
  inside the `<article>` (the terminal shows only that part; links show as
  plain text there).
- Update the **Last updated** line above it (both the visible date and the
  `datetime="YYYY-MM-DD"` attribute) every time you change the text.

---

## 2. Review what I drafted (correct anything that's wrong)

### ☐ Skills list
- **File:** `index.html`, the `Skills` block in the profile card.
- **How:** add, remove or reorder skills to match you (e.g. add Spark, Airflow,
  dbt, Snowflake, Kafka, DuckDB if they're yours; the current list leans
  backend). A skill is a link when a project has that tag:
  `<a class="skill" href="/projects/?tag=Python">Python</a>`; otherwise plain:
  `<span class="skill">SQL</span>`. The terminal's neofetch shows the first 7.

### ☐ Project descriptions, tags and order
- **File:** `assets/projects.js`, the `PROJECTS` list.
- **Check each entry:** `tagline`, `desc` (short, used on cards), `long` (used
  on the project's own page), `features`, and `tags`.
- **homelab** is written by me from the homelab repo, without IPs, hostnames
  or the torrent pipeline. Make sure you're happy with what it says publicly.
- **Order = the "Recommended" sort.** Move entries up/down to change it.
- **`featured: true`** puts a project on the home page (currently anchorless,
  chesssnake, whirligig). Three is a good number.

### ☐ Page descriptions for link previews and search engines
- Each page's `<meta name="description">` and `og:description` in its
  `<head>` (home, `projects/index.html`, `ai/index.html`, and each
  `projects/<slug>/index.html`). Only worth touching if a description no
  longer fits after your edits.

---

## 3. Go live on gabebecker.com

Do these in order, once the content above is done.

### ☐ Merge `site-redesign` into `main`
```sh
git switch main
git merge site-redesign
git push
```
(Or open a pull request on GitHub and merge it there.) GitHub Pages serves
`main`, so the site changes when this lands.

### ☐ DNS records at your domain registrar
Add for `gabebecker.com`:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | gabebecker2048.github.io |

Remove any parking-page records the registrar added for `@` or `www`.

### ☐ Turn on the custom domain in GitHub
1. Repo **Settings → Pages → Custom domain**: enter `gabebecker.com`, Save.
   (The `CNAME` file in the repo already says this.)
2. Wait for the DNS check to pass (minutes to a few hours).
3. Tick **Enforce HTTPS** once it's offered.

### ☐ (Recommended) Verify the domain
GitHub **account** Settings → **Pages** → Add a domain → follow the TXT-record
steps. This stops anyone else from pointing their Pages site at your domain.

### ☐ Check the live site
Visit https://gabebecker.com, `/projects/`, a project page, `/ai/`,
`/terminal/`, and a made-up URL (should show the 404 page). Paste the link
into LinkedIn or Slack to see the preview card.

---

## 4. Keeping it current (not blocking)

- **New release of a project:** nothing to do. Each page fetches the latest
  version from PyPI and the last-push date from GitHub when it loads (cached
  for an hour per visitor). The `version` and `updated` values in
  `assets/projects.js` are only a fallback for when those can't be reached;
  refresh them now and then so the fallback isn't far behind. Projects without
  PyPI or a public repo (e.g. homelab) always use the typed-in values.
- **New project:** see "Add a project" in `README.md` (data entry + copy a
  stub folder + add the URL to `sitemap.xml`).
- **Later:** per-project docs with MkDocs on each repo's GitHub Pages
  (`gabebecker.com/<repo>/`), then add a `docs` link to the project's `links`.
