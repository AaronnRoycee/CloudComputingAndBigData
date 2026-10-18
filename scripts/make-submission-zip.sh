#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
name="CSE6332_Project1_AaronPantoja.zip"
out="$root/dist/$name"

mkdir -p "$root/dist"
rm -f "$out"

cd "$root"
zip -r "$out" \
  Dockerfile docker-compose.yaml render.yaml .dockerignore README.md nginx site scripts \
  -x '*.DS_Store' >/dev/null

cp "$out" "$HOME/Desktop/$name"

echo "Wrote $out"
echo "Copied to $HOME/Desktop/$name"
unzip -l "$out" | tail -5
