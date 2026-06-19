#!/usr/bin/env bash
# Usage: schedule-macos.sh <repoPath> <generateHHMM> <reviewHHMM>
set -euo pipefail
REPO="$1"; GEN="$2"; REV="$3"
LA="$HOME/Library/LaunchAgents"
mkdir -p "$LA"
write_plist() {
  local label="$1" time="$2" script="$3" file="$LA/$1.plist"
  local h=${time%%:*} m=${time##*:}
  cat > "$file" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$label</string>
  <key>ProgramArguments</key>
  <array><string>/usr/bin/env</string><string>node</string><string>$REPO/scripts/$script</string></array>
  <key>StartCalendarInterval</key>
  <dict><key>Hour</key><integer>${h#0}</integer><key>Minute</key><integer>${m#0}</integer></dict>
</dict>
</plist>
PLIST
  launchctl unload "$file" 2>/dev/null || true
  launchctl load "$file"
}
write_plist "com.codingdrills.generate" "$GEN" "run-generate.mjs"
write_plist "com.codingdrills.review" "$REV" "run-review.mjs"
echo "launchd agents installed"
