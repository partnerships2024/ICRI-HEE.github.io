# Future Scientific Leaders — GitHub Pages Website Package

A responsive, multi-page static website starter for the Future Scientific Leaders programme, organised around three connected research laboratories:
- **CHI Lab** — Healthcare & Biomedical Research
- **IESST Lab** — Energy & Smart Technologies
- **EIAS Lab** — Environment & Sustainability

## Deploy
1. Download and extract this ZIP.
2. Create or open the GitHub repository that will host the website.
3. Upload the **contents** of this folder to the repository root (so `index.html` is at the root).
4. In GitHub, open **Settings → Pages**.
5. Select **Deploy from a branch**, choose your publishing branch (usually `main`) and `/ (root)`, then save.
6. Open the published Pages URL after the deployment completes.

GitHub Pages supports static HTML, CSS, JavaScript, JSON and image assets. This package includes `.nojekyll` and uses client-side JSON loading. See the [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Main structure
- `index.html` — homepage
- `pages/` — About, Research, Laboratories, ECR Network, Chapters, Join, Contact, Governance, Newsroom
- `people/index.html` — people directory
- `labs/` — local overview pages for CHI, IESST and EIAS
- `data/labs.json` — canonical lab names, descriptions, focus areas and external links
- `data/people.json` — team directory content
- `data/programmes.json` — ECR pathways and activities
- `data/site.json` — site identity and configuration placeholders
- `assets/css/` — responsive visual system
- `assets/js/` — navigation and JSON-driven directory rendering
- `assets/images/` — original SVG diagrams and brand mark

## Important configuration before public launch
1. Confirm the official expansion of **ICRI-HEE** and its legal/institutional relationship to ICRI-STE. The package does not invent an expansion or assert a rebranding.
2. Confirm the programme's official institutional owner, governance, approval and public contact address.
3. Confirm every proposed role and obtain consent to publish names, titles, biographies and research contributions.
4. Add Muhammad Ali's approved domain and profile details if desired.
5. Replace the placeholder contact link on the Join page and implement a secure external application workflow if applications are to be collected.
6. Review all claims about clinical translation, validation, funding, publications and project status before publication.
7. Replace the generic SVG brand mark with official, approved ICRI-HEE and/or programme logos if available. The included SVG is a neutral starter mark, not an official institutional logo.

## Editing the lab directory
Edit `data/labs.json`. Keep each lab's `id`, `name`, `short_name`, `pillar`, `tagline`, `url` and `focus` fields. The homepage and laboratory directory render from this JSON file.

## Updating team members
Edit `data/people.json`. Preserve accurate role status. Do not remove the word **Proposed** from roles until appointments are formally confirmed.

## Notes
- This is a static site. It does not include a server, database, secure membership application system, authentication, or private document storage.
- All included diagrams are editable SVG files located in `assets/images/`.
- No external stock photos or unlicensed institutional logos are included.
