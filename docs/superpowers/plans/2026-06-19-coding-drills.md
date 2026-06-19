# Coding Drills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an open-source template repo that generates 10 adaptive coding exercises daily and reviews the user's solution the next morning, driven by two OS-scheduled local Claude Code headless jobs, set up by a standalone Node installer.

**Architecture:** A pure-logic core (`lib/adapt.mjs`) decides the daily exercise plan and updates progress from review scores. Thin Node wrappers invoke `claude -p` with versioned prompts for generation/review. A Node installer runs a config wizard and registers two scheduled jobs per OS. State is a JSON file synced via git.

**Tech Stack:** Node ≥18 (ESM, `node --test`), git, Claude Code CLI (`claude -p`), OS schedulers (schtasks / launchd / cron).

## Global Constraints

- Node ≥18, ESM modules (`.mjs`), zero runtime dependencies; tests use built-in `node --test`.
- No cloud, no API key — scheduling is local to the user's machine.
- Claude Code CLI must be installed and authenticated; installer preflight verifies it.
- Exercises and feedback are markdown files in the repo; state is `state/progress.json`.
- Branch convention for solutions: `solve/week-NN/day-NN` (zero-padded, 2 digits).
- Code, identifiers, commit messages in English. Default schedule 21:00 generate / 07:00 review.
- Wrappers never use destructive git (`reset --hard`, `clean -f`); on conflict they abort and log.
- Default exercise mix per 10: ~4 logic, 3 algorithms, 3 dataStructures; Friday swaps 1 slot for 1 architecture challenge.

---

### Task 1: Repo scaffold + tooling

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `docs/superpowers/specs/2026-06-19-coding-drills-design.md` (move spec into repo)
- Create: `.github/` placeholder? No — out of scope.

**Interfaces:**
- Produces: npm scripts `test` (`node --test`), repo root layout. No code exports.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "coding-drills",
  "version": "0.1.0",
  "description": "Daily adaptive coding exercises generated and reviewed by Claude Code",
  "type": "module",
  "license": "MIT",
  "engines": { "node": ">=18" },
  "scripts": {
    "test": "node --test",
    "install:wizard": "node install.mjs"
  }
}
```

- [ ] **Step 2: Create `.gitignore`**

```
node_modules/
state/logs/*.log
.DS_Store
```

- [ ] **Step 3: Move the spec into the repo**

Copy the approved spec to `docs/superpowers/specs/2026-06-19-coding-drills-design.md` inside the new repo.

- [ ] **Step 4: Initialize git and make the first commit**

Run:
```bash
git init
git add package.json .gitignore docs/
git commit -m "chore: scaffold coding-drills repo with spec"
```
Expected: repo initialized, one commit on `main`.

---

### Task 2: Adaptive core — daily plan composition

**Files:**
- Create: `lib/adapt.mjs`
- Test: `__tests__/adapt.plan.test.mjs`

**Interfaces:**
- Produces:
  - `planDay(settings, progress, { weekday })` → `Array<{ pillar: 'logic'|'algorithms'|'dataStructures'|'architecture', biasedTopic: string|null, difficulty: number }>` of length `settings.exercisesPerDay`.
  - `weekday`: 0=Sun … 5=Fri … 6=Sat.

- [ ] **Step 1: Write the failing test**

```javascript
// __tests__/adapt.plan.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { planDay } from '../lib/adapt.mjs';

const baseSettings = {
  exercisesPerDay: 10,
  pillars: { logic: true, algorithms: true, dataStructures: true, architecture: true },
};
const baseProgress = { difficulty: 0.5, weakSpots: [] };

test('non-Friday plan has 4 logic, 3 algorithms, 3 dataStructures, no architecture', () => {
  const plan = planDay(baseSettings, baseProgress, { weekday: 1 });
  assert.equal(plan.length, 10);
  const count = (p) => plan.filter((s) => s.pillar === p).length;
  assert.equal(count('logic'), 4);
  assert.equal(count('algorithms'), 3);
  assert.equal(count('dataStructures'), 3);
  assert.equal(count('architecture'), 0);
});

test('Friday plan swaps one slot for an architecture challenge', () => {
  const plan = planDay(baseSettings, baseProgress, { weekday: 5 });
  assert.equal(plan.length, 10);
  assert.equal(plan.filter((s) => s.pillar === 'architecture').length, 1);
});

test('disabled pillar is redistributed among enabled ones', () => {
  const settings = { ...baseSettings, pillars: { ...baseSettings.pillars, dataStructures: false } };
  const plan = planDay(settings, baseProgress, { weekday: 1 });
  assert.equal(plan.filter((s) => s.pillar === 'dataStructures').length, 0);
  assert.equal(plan.length, 10);
});

test('every slot carries the current difficulty', () => {
  const plan = planDay(baseSettings, { difficulty: 0.42, weakSpots: [] }, { weekday: 2 });
  assert.ok(plan.every((s) => s.difficulty === 0.42));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test __tests__/adapt.plan.test.mjs`
Expected: FAIL with "Cannot find module '../lib/adapt.mjs'".

- [ ] **Step 3: Write minimal implementation**

```javascript
// lib/adapt.mjs
const BASE_RATIO = { logic: 4, algorithms: 3, dataStructures: 3 };

function enabledPillars(settings) {
  return Object.entries(settings.pillars)
    .filter(([k, v]) => v && k !== 'architecture')
    .map(([k]) => k);
}

function composition(settings) {
  const n = settings.exercisesPerDay;
  const enabled = enabledPillars(settings);
  const weights = enabled.map((p) => BASE_RATIO[p] ?? 1);
  const total = weights.reduce((a, b) => a + b, 0);
  // Largest-remainder allocation so counts sum exactly to n.
  const raw = enabled.map((p, i) => ({ pillar: p, exact: (weights[i] / total) * n }));
  const counts = raw.map((r) => ({ pillar: r.pillar, count: Math.floor(r.exact), rem: r.exact % 1 }));
  let assigned = counts.reduce((a, c) => a + c.count, 0);
  counts.sort((a, b) => b.rem - a.rem);
  for (let i = 0; assigned < n; i++, assigned++) counts[i % counts.length].count++;
  const slots = [];
  for (const c of counts) for (let i = 0; i < c.count; i++) slots.push(c.pillar);
  return slots;
}

export function planDay(settings, progress, { weekday }) {
  let pillars = composition(settings);
  if (weekday === 5 && settings.pillars.architecture) {
    pillars[pillars.length - 1] = 'architecture';
  }
  const biased = biasedTopics(progress, pillars.length);
  return pillars.map((pillar, i) => ({
    pillar,
    biasedTopic: biased[i] ?? null,
    difficulty: progress.difficulty,
  }));
}

function biasedTopics(progress, slotCount) {
  const want = Math.round(slotCount * 0.35);
  const sorted = [...(progress.weakSpots ?? [])].sort(
    (a, b) => b.misses - a.misses || (b.lastSeen > a.lastSeen ? 1 : -1),
  );
  const out = new Array(slotCount).fill(null);
  for (let i = 0; i < want && i < sorted.length; i++) out[i] = sorted[i].topic;
  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test __tests__/adapt.plan.test.mjs`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/adapt.mjs __tests__/adapt.plan.test.mjs
git commit -m "feat: add daily exercise plan composition"
```

---

### Task 3: Adaptive core — bias and progress update

**Files:**
- Modify: `lib/adapt.mjs`
- Test: `__tests__/adapt.progress.test.mjs`

**Interfaces:**
- Consumes: `planDay`, `biasedTopics` from Task 2.
- Produces:
  - `seedProgress(level: 'beginner'|'intermediate'|'advanced')` → `{ currentWeek:1, currentDay:0, difficulty:number, weakSpots:[], languageFriction:[], history:[] }`.
  - `updateProgress(progress, review)` → new progress object. `review = { day:string, solved:number, total:number, missedTopics:string[], frictionLangs:string[] }`.

- [ ] **Step 1: Write the failing test**

```javascript
// __tests__/adapt.progress.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seedProgress, updateProgress } from '../lib/adapt.mjs';

test('seedProgress sets difficulty by level', () => {
  assert.equal(seedProgress('beginner').difficulty, 0.25);
  assert.equal(seedProgress('intermediate').difficulty, 0.5);
  assert.equal(seedProgress('advanced').difficulty, 0.75);
  assert.equal(seedProgress('intermediate').currentDay, 0);
});

test('high score raises difficulty, low score lowers it, clamped [0,1]', () => {
  const p = { difficulty: 0.5, weakSpots: [], history: [] };
  const up = updateProgress(p, { day: 'week-01/day-01', solved: 10, total: 10, missedTopics: [], frictionLangs: [] });
  assert.ok(up.difficulty > 0.5);
  const down = updateProgress(p, { day: 'week-01/day-01', solved: 0, total: 10, missedTopics: [], frictionLangs: [] });
  assert.ok(down.difficulty < 0.5);
  const floor = updateProgress({ difficulty: 0.02, weakSpots: [], history: [] }, { day: 'd', solved: 0, total: 10, missedTopics: [], frictionLangs: [] });
  assert.ok(floor.difficulty >= 0);
});

test('missed topics accrue into weakSpots with misses and lastSeen', () => {
  const p = { difficulty: 0.5, weakSpots: [{ topic: 'recursion', misses: 1, lastSeen: '2026-06-17' }], history: [] };
  const up = updateProgress(p, { day: 'week-01/day-02', solved: 7, total: 10, missedTopics: ['recursion', 'graphs'], frictionLangs: [] });
  const rec = up.weakSpots.find((w) => w.topic === 'recursion');
  const gr = up.weakSpots.find((w) => w.topic === 'graphs');
  assert.equal(rec.misses, 2);
  assert.equal(gr.misses, 1);
});

test('history gets one appended entry with score', () => {
  const p = { difficulty: 0.5, weakSpots: [], history: [] };
  const up = updateProgress(p, { day: 'week-01/day-02', solved: 6, total: 10, missedTopics: [], frictionLangs: [] });
  assert.equal(up.history.length, 1);
  assert.equal(up.history[0].score, 0.6);
  assert.equal(up.history[0].day, 'week-01/day-02');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test __tests__/adapt.progress.test.mjs`
Expected: FAIL with "seedProgress is not a function" / import error.

- [ ] **Step 3: Add implementation to `lib/adapt.mjs`**

```javascript
// append to lib/adapt.mjs
const LEVEL_DIFFICULTY = { beginner: 0.25, intermediate: 0.5, advanced: 0.75 };

export function seedProgress(level) {
  return {
    currentWeek: 1,
    currentDay: 0,
    difficulty: LEVEL_DIFFICULTY[level] ?? 0.5,
    weakSpots: [],
    languageFriction: [],
    history: [],
  };
}

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

export function updateProgress(progress, review) {
  const score = review.total > 0 ? review.solved / review.total : 0;
  const delta = clamp((score - 0.7) * 0.15, -0.1, 0.1);
  const difficulty = clamp(progress.difficulty + delta, 0, 1);

  const weakSpots = (progress.weakSpots ?? []).map((w) => ({ ...w }));
  for (const topic of review.missedTopics ?? []) {
    const hit = weakSpots.find((w) => w.topic === topic);
    if (hit) { hit.misses += 1; hit.lastSeen = review.day; }
    else weakSpots.push({ topic, misses: 1, lastSeen: review.day });
  }

  const languageFriction = (progress.languageFriction ?? []).map((l) => ({ ...l }));
  for (const lang of review.frictionLangs ?? []) {
    const hit = languageFriction.find((l) => l.lang === lang);
    if (hit) hit.struggles += 1;
    else languageFriction.push({ lang, struggles: 1 });
  }

  const history = [...(progress.history ?? []), { day: review.day, score, solved: review.solved, total: review.total }];
  return { ...progress, difficulty, weakSpots, languageFriction, history };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test __tests__/adapt.progress.test.mjs`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/adapt.mjs __tests__/adapt.progress.test.mjs
git commit -m "feat: seed and update adaptive progress from review scores"
```

---

### Task 4: Config and state file helpers

**Files:**
- Create: `lib/store.mjs`
- Test: `__tests__/store.test.mjs`
- Create: `config/settings.example.json`

**Interfaces:**
- Consumes: `seedProgress` from Task 3.
- Produces:
  - `readJson(path)` → parsed object (throws clear error if missing).
  - `writeJson(path, obj)` → writes pretty JSON + trailing newline.
  - `defaultSettings()` → settings object with documented defaults.
  - `dayDir(progress)` → `weeks/week-NN/day-NN` string for the **current** day.
  - `branchName(week, day)` → `solve/week-NN/day-NN`.

- [ ] **Step 1: Write the failing test**

```javascript
// __tests__/store.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readJson, writeJson, defaultSettings, dayDir, branchName } from '../lib/store.mjs';

test('writeJson then readJson round-trips', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'cd-'));
  const f = join(dir, 'x.json');
  await writeJson(f, { a: 1 });
  assert.deepEqual(await readJson(f), { a: 1 });
  await rm(dir, { recursive: true, force: true });
});

test('readJson throws a clear error when file is missing', async () => {
  await assert.rejects(() => readJson('/no/such/file.json'), /settings or state file/);
});

test('defaultSettings has expected defaults', () => {
  const s = defaultSettings();
  assert.equal(s.schedule.generate, '21:00');
  assert.equal(s.schedule.review, '07:00');
  assert.equal(s.exercisesPerDay, 10);
  assert.equal(s.languages.mode, 'free');
});

test('dayDir and branchName zero-pad week and day', () => {
  assert.equal(dayDir({ currentWeek: 1, currentDay: 3 }), 'weeks/week-01/day-03');
  assert.equal(branchName(2, 10), 'solve/week-02/day-10');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test __tests__/store.test.mjs`
Expected: FAIL with module-not-found for `../lib/store.mjs`.

- [ ] **Step 3: Write minimal implementation**

```javascript
// lib/store.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function readJson(path) {
  let raw;
  try {
    raw = await readFile(path, 'utf8');
  } catch {
    throw new Error(`Cannot read settings or state file: ${path}`);
  }
  return JSON.parse(raw);
}

export async function writeJson(path, obj) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

export function defaultSettings() {
  return {
    schedule: { generate: '21:00', review: '07:00', timezone: 'America/Sao_Paulo' },
    level: 'intermediate',
    pillars: { logic: true, algorithms: true, dataStructures: true, architecture: true },
    exercisesPerDay: 10,
    languages: { mode: 'free', allowed: [] },
    git: { remote: '', autoPush: true },
  };
}

const pad = (n) => String(n).padStart(2, '0');
export function dayDir(progress) {
  return `weeks/week-${pad(progress.currentWeek)}/day-${pad(progress.currentDay)}`;
}
export function branchName(week, day) {
  return `solve/week-${pad(week)}/day-${pad(day)}`;
}
```

- [ ] **Step 4: Write `config/settings.example.json`**

```json
{
  "schedule": { "generate": "21:00", "review": "07:00", "timezone": "America/Sao_Paulo" },
  "level": "intermediate",
  "pillars": { "logic": true, "algorithms": true, "dataStructures": true, "architecture": true },
  "exercisesPerDay": 10,
  "languages": { "mode": "free", "allowed": [] },
  "git": { "remote": "git@github.com:user/coding-drills.git", "autoPush": true }
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `node --test __tests__/store.test.mjs`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add lib/store.mjs __tests__/store.test.mjs config/settings.example.json
git commit -m "feat: add config/state helpers and example settings"
```

---

### Task 5: Scheduler command builders (pure)

**Files:**
- Create: `lib/schedule.mjs`
- Test: `__tests__/schedule.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `windowsTasks({ repoPath, generate, review })` → `[{ name, time, command }]` (2 entries).
  - `cronLines({ repoPath, generate, review })` → `string[]` (2 crontab lines with markers).
  - `launchdPlist({ label, time, repoPath, script })` → plist XML string.
  - Times are `"HH:MM"`. Each builder is pure (no FS/registration).

- [ ] **Step 1: Write the failing test**

```javascript
// __tests__/schedule.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { windowsTasks, cronLines, launchdPlist } from '../lib/schedule.mjs';

const opts = { repoPath: '/home/u/coding-drills', generate: '21:00', review: '07:00' };

test('windowsTasks builds two named tasks running the wrappers', () => {
  const tasks = windowsTasks(opts);
  assert.equal(tasks.length, 2);
  assert.ok(tasks.some((t) => t.name === 'CodingDrillsGenerate' && t.time === '21:00' && t.command.includes('run-generate.mjs')));
  assert.ok(tasks.some((t) => t.name === 'CodingDrillsReview' && t.time === '07:00' && t.command.includes('run-review.mjs')));
});

test('cronLines emits two marked lines at the right minutes/hours', () => {
  const lines = cronLines(opts);
  assert.equal(lines.length, 2);
  assert.ok(lines.some((l) => l.startsWith('0 21 * * *') && l.includes('run-generate.mjs') && l.includes('# coding-drills')));
  assert.ok(lines.some((l) => l.startsWith('0 7 * * *') && l.includes('run-review.mjs')));
});

test('launchdPlist embeds label, hour, minute and script path', () => {
  const xml = launchdPlist({ label: 'com.codingdrills.generate', time: '21:00', repoPath: opts.repoPath, script: 'run-generate.mjs' });
  assert.ok(xml.includes('<string>com.codingdrills.generate</string>'));
  assert.ok(xml.includes('<key>Hour</key>'));
  assert.ok(xml.includes('<integer>21</integer>'));
  assert.ok(xml.includes('<integer>0</integer>'));
  assert.ok(xml.includes('run-generate.mjs'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test __tests__/schedule.test.mjs`
Expected: FAIL with module-not-found for `../lib/schedule.mjs`.

- [ ] **Step 3: Write minimal implementation**

```javascript
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test __tests__/schedule.test.mjs`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/schedule.mjs __tests__/schedule.test.mjs
git commit -m "feat: add pure scheduler command builders per OS"
```

---

### Task 6: Wrapper job runner (pull → claude → commit → push)

**Files:**
- Create: `lib/runner.mjs`
- Create: `scripts/run-generate.mjs`
- Create: `scripts/run-review.mjs`
- Test: `__tests__/runner.test.mjs`

**Interfaces:**
- Consumes: `readJson` from Task 4 (for `autoPush`).
- Produces:
  - `runJob({ repoPath, promptFile, exec, log, autoPush })` → runs steps in order, returns `{ ok, steps }`. `exec(cmd, args)` is injected (so tests pass a fake); real callers pass a child_process wrapper. On any step failure, stops and returns `ok:false`.
  - Step order: `git pull --ff-only` → `claude -p <prompt> --permission-mode acceptEdits` → `git add -A` → `git commit` → (`git push` if `autoPush`).

- [ ] **Step 1: Write the failing test**

```javascript
// __tests__/runner.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runJob } from '../lib/runner.mjs';

function fakeExec(record, failOn = null) {
  return async (cmd, args) => {
    record.push([cmd, ...args].join(' '));
    if (failOn && record[record.length - 1].includes(failOn)) {
      return { code: 1, stdout: '', stderr: 'boom' };
    }
    return { code: 0, stdout: 'ok', stderr: '' };
  };
}

test('runs pull, claude, add, commit, push in order when autoPush', async () => {
  const calls = [];
  const res = await runJob({ repoPath: '/r', promptFile: 'prompts/generate.md', exec: fakeExec(calls), log: () => {}, autoPush: true });
  assert.equal(res.ok, true);
  assert.match(calls[0], /git pull --ff-only/);
  assert.match(calls[1], /claude -p .*generate\.md.*acceptEdits/);
  assert.match(calls[2], /git add -A/);
  assert.match(calls[3], /git commit/);
  assert.match(calls[4], /git push/);
});

test('skips push when autoPush is false', async () => {
  const calls = [];
  const res = await runJob({ repoPath: '/r', promptFile: 'prompts/review.md', exec: fakeExec(calls), log: () => {}, autoPush: false });
  assert.equal(res.ok, true);
  assert.ok(!calls.some((c) => c.includes('git push')));
});

test('stops and reports failure when a step fails', async () => {
  const calls = [];
  const res = await runJob({ repoPath: '/r', promptFile: 'p.md', exec: fakeExec(calls, 'git pull'), log: () => {}, autoPush: true });
  assert.equal(res.ok, false);
  assert.equal(calls.length, 1); // stopped after failing pull
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test __tests__/runner.test.mjs`
Expected: FAIL with module-not-found for `../lib/runner.mjs`.

- [ ] **Step 3: Write minimal implementation**

```javascript
// lib/runner.mjs
export async function runJob({ repoPath, promptFile, exec, log, autoPush }) {
  const steps = [
    ['git', ['pull', '--ff-only']],
    ['claude', ['-p', promptFile, '--permission-mode', 'acceptEdits']],
    ['git', ['add', '-A']],
    ['git', ['commit', '-m', `chore: automated ${promptFile} run`]],
  ];
  if (autoPush) steps.push(['git', ['push']]);

  const done = [];
  for (const [cmd, args] of steps) {
    const r = await exec(cmd, args, { cwd: repoPath });
    const line = [cmd, ...args].join(' ');
    done.push(line);
    log(`${line} -> code ${r.code}`);
    if (r.code !== 0) {
      log(`step failed: ${line}\n${r.stderr}`);
      return { ok: false, steps: done };
    }
  }
  return { ok: true, steps: done };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test __tests__/runner.test.mjs`
Expected: PASS (3 tests).

- [ ] **Step 5: Write the real wrapper entrypoints**

```javascript
// scripts/run-generate.mjs
import { spawn } from 'node:child_process';
import { appendFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { runJob } from '../lib/runner.mjs';
import { readJson } from '../lib/store.mjs';

const repoPath = dirname(dirname(fileURLToPath(import.meta.url)));

function exec(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const ps = spawn(cmd, args, { cwd: opts.cwd ?? repoPath, shell: false });
    let stdout = '', stderr = '';
    ps.stdout.on('data', (d) => (stdout += d));
    ps.stderr.on('data', (d) => (stderr += d));
    ps.on('close', (code) => resolve({ code: code ?? 1, stdout, stderr }));
    ps.on('error', (e) => resolve({ code: 1, stdout, stderr: String(e) }));
  });
}

async function main() {
  await mkdir(join(repoPath, 'state', 'logs'), { recursive: true });
  const logFile = join(repoPath, 'state', 'logs', 'generate.log');
  const log = (m) => appendFile(logFile, `[${process.env.CD_NOW ?? ''}] ${m}\n`).catch(() => {});
  const settings = await readJson(join(repoPath, 'config', 'settings.json'));
  const res = await runJob({
    repoPath,
    promptFile: join(repoPath, 'prompts', 'generate.md'),
    exec, log,
    autoPush: settings.git?.autoPush ?? true,
  });
  process.exit(res.ok ? 0 : 1);
}
main();
```

- [ ] **Step 6: Write `scripts/run-review.mjs`**

Identical to `run-generate.mjs` except: log file `review.log` and `promptFile` → `prompts/review.md`.

```javascript
// scripts/run-review.mjs
import { spawn } from 'node:child_process';
import { appendFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { runJob } from '../lib/runner.mjs';
import { readJson } from '../lib/store.mjs';

const repoPath = dirname(dirname(fileURLToPath(import.meta.url)));

function exec(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const ps = spawn(cmd, args, { cwd: opts.cwd ?? repoPath, shell: false });
    let stdout = '', stderr = '';
    ps.stdout.on('data', (d) => (stdout += d));
    ps.stderr.on('data', (d) => (stderr += d));
    ps.on('close', (code) => resolve({ code: code ?? 1, stdout, stderr }));
    ps.on('error', (e) => resolve({ code: 1, stdout, stderr: String(e) }));
  });
}

async function main() {
  await mkdir(join(repoPath, 'state', 'logs'), { recursive: true });
  const logFile = join(repoPath, 'state', 'logs', 'review.log');
  const log = (m) => appendFile(logFile, `[${process.env.CD_NOW ?? ''}] ${m}\n`).catch(() => {});
  const settings = await readJson(join(repoPath, 'config', 'settings.json'));
  const res = await runJob({
    repoPath,
    promptFile: join(repoPath, 'prompts', 'review.md'),
    exec, log,
    autoPush: settings.git?.autoPush ?? true,
  });
  process.exit(res.ok ? 0 : 1);
}
main();
```

- [ ] **Step 7: Commit**

```bash
git add lib/runner.mjs scripts/run-generate.mjs scripts/run-review.mjs __tests__/runner.test.mjs
git commit -m "feat: add job runner and generate/review wrapper entrypoints"
```

---

### Task 7: Preflight checks

**Files:**
- Create: `lib/preflight.mjs`
- Test: `__tests__/preflight.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: `checkPreflight({ which, nodeVersion })` → `{ ok: boolean, problems: string[] }`. `which(cmd)` returns boolean (injected so tests fake PATH). Verifies Node ≥18, `git` present, `claude` present.

- [ ] **Step 1: Write the failing test**

```javascript
// __tests__/preflight.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkPreflight } from '../lib/preflight.mjs';

test('passes when node>=18, git and claude present', () => {
  const r = checkPreflight({ which: () => true, nodeVersion: 'v20.10.0' });
  assert.equal(r.ok, true);
  assert.equal(r.problems.length, 0);
});

test('fails with messages when claude missing and node too old', () => {
  const r = checkPreflight({ which: (c) => c !== 'claude', nodeVersion: 'v16.0.0' });
  assert.equal(r.ok, false);
  assert.ok(r.problems.some((p) => /Node/.test(p)));
  assert.ok(r.problems.some((p) => /claude/.test(p)));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test __tests__/preflight.test.mjs`
Expected: FAIL with module-not-found for `../lib/preflight.mjs`.

- [ ] **Step 3: Write minimal implementation**

```javascript
// lib/preflight.mjs
export function checkPreflight({ which, nodeVersion }) {
  const problems = [];
  const major = Number((nodeVersion ?? '').replace(/^v/, '').split('.')[0]);
  if (!Number.isFinite(major) || major < 18) {
    problems.push(`Node >=18 required (found ${nodeVersion}). See https://nodejs.org`);
  }
  if (!which('git')) problems.push('git not found on PATH. Install from https://git-scm.com');
  if (!which('claude')) {
    problems.push('claude CLI not found. Install Claude Code and run `claude` once to authenticate.');
  }
  return { ok: problems.length === 0, problems };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test __tests__/preflight.test.mjs`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/preflight.mjs __tests__/preflight.test.mjs
git commit -m "feat: add installer preflight checks"
```

---

### Task 8: OS scheduler registration scripts

**Files:**
- Create: `scripts/schedule-windows.ps1`
- Create: `scripts/schedule-macos.sh`
- Create: `scripts/schedule-linux.sh`
- Create: `lib/install-os.mjs`
- Test: `__tests__/install-os.test.mjs`

**Interfaces:**
- Consumes: `windowsTasks`, `cronLines`, `launchdPlist` from Task 5.
- Produces: `registerSchedule({ platform, repoPath, generate, review, exec })` → dispatches to the correct OS path, idempotent (removes existing entries before adding). `exec(cmd, args)` injected. Returns `{ ok, actions: string[] }`. Unknown platform → `{ ok:false }`.

- [ ] **Step 1: Write the failing test**

```javascript
// __tests__/install-os.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerSchedule } from '../lib/install-os.mjs';

const base = { repoPath: '/r', generate: '21:00', review: '07:00' };

test('windows path deletes then creates both tasks', async () => {
  const calls = [];
  const exec = async (cmd, args) => { calls.push([cmd, ...args].join(' ')); return { code: 0, stdout: '', stderr: '' }; };
  const r = await registerSchedule({ ...base, platform: 'win32', exec });
  assert.equal(r.ok, true);
  assert.ok(calls.some((c) => /schtasks .*\/Delete .*CodingDrillsGenerate/.test(c)));
  assert.ok(calls.some((c) => /schtasks .*\/Create .*CodingDrillsGenerate.*21:00/.test(c)));
  assert.ok(calls.some((c) => /CodingDrillsReview.*07:00/.test(c)));
});

test('unknown platform returns ok:false', async () => {
  const r = await registerSchedule({ ...base, platform: 'sunos', exec: async () => ({ code: 0 }) });
  assert.equal(r.ok, false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test __tests__/install-os.test.mjs`
Expected: FAIL with module-not-found for `../lib/install-os.mjs`.

- [ ] **Step 3: Write minimal implementation**

```javascript
// lib/install-os.mjs
import { windowsTasks } from './schedule.mjs';

export async function registerSchedule({ platform, repoPath, generate, review, exec }) {
  if (platform === 'win32') return registerWindows({ repoPath, generate, review, exec });
  if (platform === 'darwin') return registerLaunchd({ repoPath, generate, review, exec });
  if (platform === 'linux') return registerCron({ repoPath, generate, review, exec });
  return { ok: false, actions: [`unsupported platform: ${platform}`] };
}

async function registerWindows({ repoPath, generate, review, exec }) {
  const tasks = windowsTasks({ repoPath, generate, review });
  const actions = [];
  for (const t of tasks) {
    await exec('schtasks', ['/Delete', '/F', '/TN', t.name]); // idempotent: ignore failure
    const r = await exec('schtasks', ['/Create', '/F', '/SC', 'DAILY', '/TN', t.name, '/ST', t.time, '/TR', t.command]);
    actions.push(`create ${t.name} @ ${t.time} -> ${r.code}`);
    if (r.code !== 0) return { ok: false, actions };
  }
  return { ok: true, actions };
}

async function registerLaunchd({ repoPath, generate, review, exec }) {
  // Delegates to scripts/schedule-macos.sh which writes plists and bootstraps them.
  const r = await exec('bash', ['scripts/schedule-macos.sh', repoPath, generate, review]);
  return { ok: r.code === 0, actions: [`launchd setup -> ${r.code}`] };
}

async function registerCron({ repoPath, generate, review, exec }) {
  const r = await exec('bash', ['scripts/schedule-linux.sh', repoPath, generate, review]);
  return { ok: r.code === 0, actions: [`cron setup -> ${r.code}`] };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test __tests__/install-os.test.mjs`
Expected: PASS (2 tests).

- [ ] **Step 5: Write `scripts/schedule-linux.sh`**

```bash
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
```

- [ ] **Step 6: Write `scripts/schedule-macos.sh`**

```bash
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
```

- [ ] **Step 7: Write `scripts/schedule-windows.ps1`**

```powershell
# Usage: schedule-windows.ps1 -RepoPath <path> -Generate HH:MM -Review HH:MM
param([string]$RepoPath, [string]$Generate = "21:00", [string]$Review = "07:00")
function Set-DrillTask($Name, $Time, $Script) {
  schtasks /Delete /F /TN $Name 2>$null | Out-Null
  $cmd = "node `"$RepoPath\scripts\$Script`""
  schtasks /Create /F /SC DAILY /TN $Name /ST $Time /TR $cmd | Out-Null
}
Set-DrillTask "CodingDrillsGenerate" $Generate "run-generate.mjs"
Set-DrillTask "CodingDrillsReview" $Review "run-review.mjs"
Write-Output "Scheduled tasks installed"
```

- [ ] **Step 8: Commit**

```bash
git add lib/install-os.mjs scripts/schedule-*.sh scripts/schedule-windows.ps1 __tests__/install-os.test.mjs
git commit -m "feat: add OS scheduler registration (windows/macos/linux)"
```

---

### Task 9: Installer wizard (`install.mjs`)

**Files:**
- Create: `install.mjs`
- Test: `__tests__/install-wizard.test.mjs`

**Interfaces:**
- Consumes: `checkPreflight` (Task 7), `defaultSettings`/`writeJson` (Task 4), `seedProgress` (Task 3), `registerSchedule` (Task 8).
- Produces:
  - `buildSettings(answers)` → merges wizard answers over `defaultSettings()`.
  - `runWizard({ ask, preflight, write, register, platform })` → orchestrates preflight → questions → write files → register; returns `{ ok, settings }`. `ask(question, def)` injected (tests pass scripted answers). Real `main()` wires readline + real deps but is not unit-tested.

- [ ] **Step 1: Write the failing test**

```javascript
// __tests__/install-wizard.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSettings, runWizard } from '../install.mjs';

test('buildSettings overlays answers on defaults', () => {
  const s = buildSettings({ generate: '20:00', level: 'advanced', exercisesPerDay: 8, remote: 'git@x:y.git' });
  assert.equal(s.schedule.generate, '20:00');
  assert.equal(s.schedule.review, '07:00'); // untouched default
  assert.equal(s.level, 'advanced');
  assert.equal(s.exercisesPerDay, 8);
  assert.equal(s.git.remote, 'git@x:y.git');
});

test('runWizard aborts when preflight fails and never writes', async () => {
  let wrote = false;
  const res = await runWizard({
    ask: async () => '',
    preflight: () => ({ ok: false, problems: ['claude missing'] }),
    write: async () => { wrote = true; },
    register: async () => ({ ok: true }),
    platform: 'linux',
  });
  assert.equal(res.ok, false);
  assert.equal(wrote, false);
});

test('runWizard writes settings+progress and registers schedule on success', async () => {
  const writes = [];
  const res = await runWizard({
    ask: async (q, def) => def, // accept all defaults
    preflight: () => ({ ok: true, problems: [] }),
    write: async (path, obj) => writes.push([path, obj]),
    register: async () => ({ ok: true, actions: [] }),
    platform: 'linux',
  });
  assert.equal(res.ok, true);
  assert.ok(writes.some(([p]) => p.includes('settings.json')));
  assert.ok(writes.some(([p]) => p.includes('progress.json')));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test __tests__/install-wizard.test.mjs`
Expected: FAIL with module-not-found / export missing for `../install.mjs`.

- [ ] **Step 3: Write minimal implementation**

```javascript
// install.mjs
import { createInterface } from 'node:readline/promises';
import { stdin, stdout, exit, version } from 'node:process';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { defaultSettings, writeJson } from './lib/store.mjs';
import { seedProgress } from './lib/adapt.mjs';
import { checkPreflight } from './lib/preflight.mjs';
import { registerSchedule } from './lib/install-os.mjs';

export function buildSettings(answers) {
  const d = defaultSettings();
  return {
    ...d,
    schedule: { ...d.schedule, generate: answers.generate ?? d.schedule.generate, review: answers.review ?? d.schedule.review },
    level: answers.level ?? d.level,
    exercisesPerDay: answers.exercisesPerDay ?? d.exercisesPerDay,
    languages: answers.languages ?? d.languages,
    git: { ...d.git, remote: answers.remote ?? d.git.remote },
  };
}

export async function runWizard({ ask, preflight, write, register, platform, repoPath = process.cwd() }) {
  const pf = preflight();
  if (!pf.ok) {
    console.error('Preflight failed:\n - ' + pf.problems.join('\n - '));
    return { ok: false, problems: pf.problems };
  }
  const answers = {
    generate: await ask('Generation time (HH:MM)', '21:00'),
    review: await ask('Review time (HH:MM)', '07:00'),
    level: await ask('Level (beginner/intermediate/advanced)', 'intermediate'),
    exercisesPerDay: Number(await ask('Exercises per day', '10')),
    remote: await ask('Git remote URL (blank to skip push)', ''),
  };
  const settings = buildSettings(answers);
  settings.git.autoPush = Boolean(settings.git.remote);
  await write(join(repoPath, 'config', 'settings.json'), settings);
  await write(join(repoPath, 'state', 'progress.json'), seedProgress(settings.level));
  const reg = await register({ platform, repoPath, generate: settings.schedule.generate, review: settings.schedule.review });
  return { ok: reg.ok, settings };
}

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });
  const ask = async (q, def) => (await rl.question(`${q} [${def}]: `)).trim() || def;
  const has = (c) => { try { execSync(process.platform === 'win32' ? `where ${c}` : `command -v ${c}`, { stdio: 'ignore' }); return true; } catch { return false; } };
  const res = await runWizard({
    ask,
    preflight: () => checkPreflight({ which: has, nodeVersion: version }),
    write: writeJson,
    register: (o) => registerSchedule({ ...o, exec: osExec }),
    platform: process.platform,
  });
  rl.close();
  console.log(res.ok ? 'Setup complete. Two daily jobs scheduled.' : 'Setup did not complete.');
  exit(res.ok ? 0 : 1);
}

function osExec(cmd, args) {
  return new Promise((resolve) => {
    import('node:child_process').then(({ spawn }) => {
      const ps = spawn(cmd, args, { shell: false });
      let stderr = '';
      ps.stderr.on('data', (d) => (stderr += d));
      ps.on('close', (code) => resolve({ code: code ?? 1, stdout: '', stderr }));
      ps.on('error', (e) => resolve({ code: 1, stdout: '', stderr: String(e) }));
    });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) main();
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test __tests__/install-wizard.test.mjs`
Expected: PASS (3 tests).

- [ ] **Step 5: Run the full suite**

Run: `npm test`
Expected: all tests across `__tests__/` PASS.

- [ ] **Step 6: Commit**

```bash
git add install.mjs __tests__/install-wizard.test.mjs
git commit -m "feat: add installer wizard orchestration"
```

---

### Task 10: Generation and review prompts

**Files:**
- Create: `prompts/generate.md`
- Create: `prompts/review.md`

**Interfaces:**
- Consumes (at runtime): `config/settings.json`, `state/progress.json`, `lib/adapt.mjs` behavior described as instructions to Claude.
- Produces (at runtime): `weeks/week-NN/day-NN/README.md`, updated `state/progress.json`, `FEEDBACK.md`.

There is no automated test for prompt content (it drives the LLM). Validation is the manual smoke test in Task 11.

- [ ] **Step 1: Write `prompts/generate.md`**

```markdown
# Daily Exercise Generation

You are generating today's coding drills. Work only inside this repository.

## Steps
1. Read `config/settings.json` and `state/progress.json`.
2. Compute today's plan of `exercisesPerDay` slots using the rules in `lib/adapt.mjs`
   (`planDay`): base mix ~4 logic / 3 algorithms / 3 dataStructures; on Friday swap one
   slot for a larger architecture challenge; redistribute disabled pillars; ~35% of
   slots target the user's top `weakSpots`.
3. For each slot, pick a programming language:
   - If `languages.mode` is `restricted`, choose only from `languages.allowed`.
   - Otherwise choose freely, matching the language to the concept, and avoid piling
     exercises onto languages listed in `languageFriction`.
4. Determine the target directory from `currentWeek`/`currentDay` after incrementing
   the day (day 0 means today is day 1; each 7 days rolls to the next week). Write
   `weeks/week-NN/day-NN/README.md` (zero-padded).
5. The README must contain, for each exercise: a number and title, the pillar, the
   required language, a clear problem statement, at least one input/output example,
   constraints, and a difficulty label derived from `difficulty` (0-1).
6. Update `state/progress.json`: set the new `currentWeek`/`currentDay`. Do not modify
   `weakSpots`/`history` here.
7. Print a one-line summary: week, day, languages used.

## Rules
- Output is markdown files only. Do not write solutions.
- Keep exercises self-contained and unambiguous.
- Do not touch git; the wrapper handles commit and push.
```

- [ ] **Step 2: Write `prompts/review.md`**

```markdown
# Daily Solution Review

You are reviewing yesterday's solution. Work only inside this repository.

## Steps
1. Read `config/settings.json` and `state/progress.json`.
2. The day to review is the most recently generated day (current `currentWeek`/`currentDay`).
   Compute the solution branch name `solve/week-NN/day-NN` (zero-padded).
3. If the branch does not exist or has no commits beyond the generation commit:
   append a note to `state/progress.json` history as `{ day, score: 0, solved: 0, total,
   skipped: true }` and stop. Do not write FEEDBACK.md.
4. Otherwise, diff the branch against that day's `README.md`. For each exercise evaluate
   correctness, time/space complexity, style, and edge cases.
5. Write `weeks/week-NN/day-NN/FEEDBACK.md`: per exercise — what passed, what was wrong
   plus the correction, one improvement tip, and an idiomatic alternative.
6. Update `state/progress.json` following `lib/adapt.mjs` `updateProgress`: compute
   `score = solved/total`, move `difficulty`, accrue `missedTopics` into `weakSpots`,
   record `frictionLangs` into `languageFriction`, append a `history` entry.
7. Print a one-line summary: day reviewed, score, new difficulty.

## Rules
- Be specific and actionable; reference the exercise number.
- Never modify the user's solution branch.
- Do not touch git; the wrapper handles commit and push.
```

- [ ] **Step 3: Commit**

```bash
git add prompts/generate.md prompts/review.md
git commit -m "feat: add generation and review prompts"
```

---

### Task 11: README, docs, and manual smoke test

**Files:**
- Create: `README.md`
- Create: `weeks/.gitkeep`

**Interfaces:**
- Consumes: everything above.
- Produces: user-facing setup docs; verified end-to-end generation.

- [ ] **Step 1: Write `README.md`**

Include: what the project does, prerequisites (Node ≥18, git, authenticated Claude Code
CLI, machine on at scheduled times), quick start (`node install.mjs`), how the daily flow
works, the `solve/week-NN/day-NN` branch convention, how to run a job manually
(`node scripts/run-generate.mjs`), how the adaptive state works, and how to uninstall the
schedule per OS (`schtasks /Delete`, `launchctl unload`, `crontab -e`). Note it is MIT
licensed and contributions welcome.

- [ ] **Step 2: Add `weeks/.gitkeep`**

```
# keeps the weeks/ directory tracked before the first generation
```

- [ ] **Step 3: Manual smoke test (generation)**

With a real authenticated `claude` CLI and `config/settings.json` present:
Run: `node scripts/run-generate.mjs`
Expected: `weeks/week-01/day-01/README.md` created with 10 exercises; `state/progress.json`
shows `currentDay: 1`; `state/logs/generate.log` has step lines; exit code 0.

- [ ] **Step 4: Manual smoke test (review skip path)**

With no `solve/...` branch present:
Run: `node scripts/run-review.mjs`
Expected: no `FEEDBACK.md` written; `state/progress.json` history shows a `skipped: true`
entry; exit code 0.

- [ ] **Step 5: Commit**

```bash
git add README.md weeks/.gitkeep
git commit -m "docs: add README and tracked weeks directory"
```

---

## Self-Review Notes

- **Spec coverage:** scaffold (T1), adaptive core/composition (T2), bias+progress (T3),
  config/state (T4), schedulers (T5,T8), wrappers (T6), preflight (T7), installer (T9),
  prompts (T10), README + smoke (T11). All spec sections map to a task.
- **Out of scope respected:** no code execution sandbox, no web UI, no cloud scheduling,
  single-user per repo.
- **Type consistency:** `planDay`/`seedProgress`/`updateProgress`/`readJson`/`writeJson`/
  `dayDir`/`branchName`/`windowsTasks`/`cronLines`/`launchdPlist`/`runJob`/`checkPreflight`/
  `registerSchedule`/`buildSettings`/`runWizard` are defined once and consumed with matching
  signatures. `review` object shape (`{day,solved,total,missedTopics,frictionLangs}`) is used
  consistently in T3 and T10.
```
