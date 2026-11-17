# ICRI-HEE website (GitHub Pages)

Pages: `index.html` (home), `community.html`, `scientific-activities.html`, `404.html`.

1. Create a repository named `<your-username>.github.io` (or any repo and enable Pages).
2. Upload everything in this folder to the repository root.
3. Settings > Pages > Deploy from branch > `main` / root.

Where to edit:
- `data/site.json`: home content, **header menu (`menu`)**, footer columns, statutes link.
- `data/community.json`: scientists. `data/activities.json`: event, pathway, news, portals.
- `js/shell.js` + `css/shell.css`: the shared header and footer used on every page.
- Replace the SVG placeholder portraits in `assets/images/team/` and `assets/images/community/` with approved photos (same file names, or update the paths in the JSON).

To preview locally run `python3 -m http.server` in this folder; opening a page directly will not load the JSON.
