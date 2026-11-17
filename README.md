# ICRI-HEE website (GitHub Pages)

1. Create a repository named `<your-username>.github.io` (or any repo and enable Pages).
2. Upload everything in this folder to the repository root.
3. Settings > Pages > Deploy from branch > `main` / root.

Edit content in `data/site.json` (text, lab links, team, navigation). Replace the SVG placeholders in
`assets/images/team/` with real approved portraits (same file names, or update the paths in the JSON).
To test locally run `python3 -m http.server` in this folder; opening index.html directly will not load the JSON.
