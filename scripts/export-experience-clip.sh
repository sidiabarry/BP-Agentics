#!/usr/bin/env bash
set -euo pipefail
# Usage: scripts/export-experience-clip.sh <master.mp4> <basename>
# Writes public/experience/<basename>.mp4, <basename>-small.mp4, <basename>-poster.webp

MASTER="${1:?master mp4}"
NAME="${2:?basename}"
OUT="public/experience"

ffmpeg -y -i "$MASTER" -an \
  -vf "scale=1200:900:force_original_aspect_ratio=increase,crop=1200:900" \
  -c:v libx264 -pix_fmt yuv420p -preset slow -crf 28 -movflags +faststart \
  "$OUT/${NAME}.mp4"

ffmpeg -y -i "$MASTER" -an \
  -vf "scale=640:480:force_original_aspect_ratio=increase,crop=640:480" \
  -c:v libx264 -pix_fmt yuv420p -preset slow -crf 30 -movflags +faststart \
  "$OUT/${NAME}-small.mp4"

POSTER_NAME="${NAME%-motion}-poster.webp"
ffmpeg -y -i "$MASTER" -frames:v 1 -update 1 \
  -vf "scale=1200:900:force_original_aspect_ratio=increase,crop=1200:900" \
  -c:v libwebp -quality 72 \
  "$OUT/$POSTER_NAME"
