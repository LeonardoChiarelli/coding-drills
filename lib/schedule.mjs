// lib/schedule.mjs
import { join } from 'node:path';

const parse = (t) => { const [h, m] = t.split(':').map(Number); return { h, m }; };

export function windowsTasks({ repoPath, generate, review }) {
  return [
    { name: 'CodingDrillsGenerate', time: generate, command: `node "${join(repoPath, 'scripts', 'run-generate.mjs')}"` },
    { name: 'CodingDrillsReview', time: review, command: `node "${join(repoPath, 'scripts', 'run-review.mjs')}"` },
  ];
}

export function cronLines({ repoPath, generate, review }) {
  const g = parse(generate), r = parse(review);
  const cmd = (s) => `node ${join(repoPath, 'scripts', s)}`;
  return [
    `${g.m} ${g.h} * * * ${cmd('run-generate.mjs')} # coding-drills`,
    `${r.m} ${r.h} * * * ${cmd('run-review.mjs')} # coding-drills`,
  ];
}

export function launchdPlist({ label, time, repoPath, script }) {
  const { h, m } = parse(time);
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${label}</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/bin/env</string>
    <string>node</string>
    <string>${join(repoPath, 'scripts', script)}</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key>
    <integer>${h}</integer>
    <key>Minute</key>
    <integer>${m}</integer>
  </dict>
  <key>RunAtLoad</key>
  <false/>
</dict>
</plist>
`;
}
