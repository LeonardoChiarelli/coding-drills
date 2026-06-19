#!/usr/bin/env bash
# Usage: schedule-linux.sh <repoPath> <generateHHMM> <reviewHHMM>
set -euo pipefail
REPO="$1"; GEN="$2"; REV="$3"
GH=${GEN%%:*}; GM=${GEN##*:}; RH=${REV%%:*}; RM=${REV##*:}
MARK="# coding-drills"
TMP="$(mktemp)"
crontab -l 2>/dev/null | grep -v "$MARK" > "$TMP" || true
echo "${GM#0} ${GH#0} * * * node $REPO/scripts/run-generate.mjs $MARK" >> "$TMP"
echo "${RM#0} ${RH#0} * * * node $REPO/scripts/run-review.mjs $MARK" >> "$TMP"
crontab "$TMP"
rm -f "$TMP"
echo "cron entries installed"
