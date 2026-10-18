# CSE 6332 Project 1 — 6332 Cloud Computing & Big Data

A containerized image gallery: 12 images in a 4x3 grid, each with a short
description, and a click-to-enlarge viewer that cycles through them.

Aaron Pantoja

**Live site:** <https://cloudcomputingandbigdata.onrender.com>

## Run it locally

    docker compose up -d --build

Then open <http://localhost:8081>. (Host port 8081 keeps this clear of the
course container on 8080.)

    docker compose logs -f      # logs
    docker compose down         # stop and remove

## How it is served

| Piece | Purpose |
|---|---|
| `Dockerfile` | `nginx:1.27-alpine` with the site copied to `/usr/share/nginx/html` |
| `nginx/default.conf.template` | nginx config; `${PORT}` is filled in at container start |
| `render.yaml` | Render Blueprint for the public deployment |
| `site/index.html` | Page shell and the lightbox markup |
| `site/data/images.json` | The 12 filenames, titles, alt text and descriptions |
| `site/js/gallery.js` | Renders the grid from the manifest and drives the lightbox |
| `site/css/styles.css` | Grid (4 columns, down to 2 then 1) and lightbox styling |

The container listens on `$PORT`, which defaults to `8080` locally and is set by
the host in production, so the same image runs in both places unchanged.
`/healthz` returns `200 ok` for the Docker `HEALTHCHECK` and the Render health
check.

## Images

These are personal images, not the set supplied with the assignment, so they are
included in the submission archive.

Sources are 200x200 AVIF. Each is served through a `<picture>` element with a
PNG fallback so browsers without AVIF support still render it. Grid images are
lazy loaded. Filenames and captions are defined in `site/data/images.json`.

## Interaction

- Click any card, or focus it and press Enter, to enlarge it.
- Arrow buttons, or the Left and Right arrow keys, cycle through all 12.
- The X in the corner, the Escape key, or a click on the backdrop closes it.

## Submission archive

    ./scripts/make-submission-zip.sh
