#!/usr/bin/env bash
# Builds the zip to upload for Project 1.
#
# The assignment says to include JUST the files for the site and NOT the images,
# so the image files are excluded while site/images/PLACEHOLDER.txt is kept to
# document where they belong.  Output: dist/cse6332-project1-site.zip
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
out="$root/dist/cse6332-project1-site.zip"

mkdir -p "$root/dist"
rm -f "$out"

cd "$root"
zip -r "$out" \
  Dockerfile docker-compose.yaml render.yaml .dockerignore README.md nginx site scripts \
  -x 'site/images/*.avif' -x 'site/images/*.png' -x '*.DS_Store' >/dev/null

echo "Wrote $out ($(du -h "$out" | cut -f1))"
unzip -l "$out"
