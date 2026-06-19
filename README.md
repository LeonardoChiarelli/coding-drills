# coding-drills

An open-source template repo that generates 10 adaptive coding exercises daily and reviews
your solution the next morning, driven by two OS-scheduled local Claude Code headless jobs.

## What it does

- Every evening (default 21:00) a scheduled job invokes `claude -p` with `prompts/generate.md`,
  which writes `weeks/week-NN/day-NN/README.md` containing 10 exercises tailored to your
  current difficulty and weak spots.
- Every morning (default 07:00) a second job invokes `claude -p` with `prompts/review.md`,
  which reads your solution branch, writes `weeks/week-NN/day-NN/FEEDBACK.md`, and updates
  `state/progress.json` (difficulty, weak spots, history).
- The adaptive core (`lib/adapt.mjs`) adjusts difficulty and exercise mix based on your
  review scores and accumulated weak spots.

## Prerequisites

- **Node ≥18** (ESM, built-in `node --test`)
- **git** installed and on PATH
- **Claude Code CLI** installed and authenticated (`claude` must be on PATH; run `claude` once
  to complete auth)
- Your machine must be **on and awake** at the scheduled times

## Quick start

```bash
git clone <this-repo> coding-drills
cd coding-drills
node install.mjs
```

The installer:
1. Verifies Node, git, and the Claude CLI are present.
2. Asks for your preferred schedule times, difficulty level, exercises per day, and git remote.
3. Writes `config/settings.json` and `state/progress.json`.
4. Registers two OS scheduled jobs (Windows Task Scheduler, macOS launchd, or Linux cron).

## Daily flow

```
21:00  run-generate.mjs  →  git pull  →  claude -p prompts/generate.md  →  git add/commit/push
       writes: weeks/week-NN/day-NN/README.md
               state/progress.json (currentWeek, currentDay updated)

-- you solve exercises on branch solve/week-NN/day-NN --

07:00  run-review.mjs    →  git pull  →  claude -p prompts/review.md    →  git add/commit/push
       writes: weeks/week-NN/day-NN/FEEDBACK.md
               state/progress.json (difficulty, weakSpots, history updated)
```

## Solution branch convention

Create your solution branch before solving:

```bash
git checkout -b solve/week-01/day-01
```

Branch name format: `solve/week-NN/day-NN` (zero-padded, 2 digits).
The review prompt reads this branch; if it is absent, the session is recorded as `skipped`.

## Running a job manually

```bash
# Generate today's exercises
node scripts/run-generate.mjs

# Review yesterday's solutions
node scripts/run-review.mjs
```

Logs are written to `state/logs/generate.log` and `state/logs/review.log`.

## Adaptive state

`state/progress.json` tracks:

| Field | Purpose |
|---|---|
| `difficulty` | Float 0-1; raised when score > 70%, lowered when score < 70% |
| `weakSpots` | Topics missed in review; top items get ~35% of exercise slots biased toward them |
| `languageFriction` | Languages the reviewer flags as struggling; avoided in free-mode generation |
| `history` | Per-day score record |
| `currentWeek`, `currentDay` | Pointer to the latest generated day |

Edit `config/settings.json` to change schedule, pillars, languages, or exercises per day.

## Exercise mix (default)

| Weekday | Logic | Algorithms | Data Structures | Architecture |
|---|---|---|---|---|
| Mon-Thu, Sat-Sun | 4 | 3 | 3 | 0 |
| Friday | 3 | 3 | 3 | 1 |

Disabled pillars are redistributed proportionally among the remaining enabled ones.

## Uninstalling the schedule

**Windows (Task Scheduler):**
```powershell
schtasks /Delete /F /TN CodingDrillsGenerate
schtasks /Delete /F /TN CodingDrillsReview
```

**macOS (launchd):**
```bash
launchctl unload ~/Library/LaunchAgents/com.codingdrills.generate.plist
launchctl unload ~/Library/LaunchAgents/com.codingdrills.review.plist
rm ~/Library/LaunchAgents/com.codingdrills.*.plist
```

**Linux (cron):**
```bash
crontab -e
# Remove the two lines marked "# coding-drills"
```

## Project structure

```
coding-drills/
  config/
    settings.example.json   # copy to settings.json and edit
  lib/
    adapt.mjs               # adaptive core: planDay, seedProgress, updateProgress
    store.mjs               # readJson, writeJson, defaultSettings, dayDir, branchName
    schedule.mjs            # pure builders: windowsTasks, cronLines, launchdPlist
    runner.mjs              # runJob: pull → claude → add → commit → push
    preflight.mjs           # checkPreflight: node/git/claude version checks
    install-os.mjs          # registerSchedule: dispatches to Windows/macOS/Linux
  prompts/
    generate.md             # instructions for the generation job
    review.md               # instructions for the review job
  scripts/
    run-generate.mjs        # entrypoint for the generation scheduled job
    run-review.mjs          # entrypoint for the review scheduled job
    schedule-windows.ps1    # PowerShell helper (called by install-os.mjs)
    schedule-macos.sh       # bash helper for launchd
    schedule-linux.sh       # bash helper for crontab
  state/
    progress.json           # created by installer (gitignored logs/)
  weeks/                    # generated exercises and feedback land here
  install.mjs               # interactive setup wizard
```

## Running tests

```bash
npm test
# or
node --test
```

Tests use Node's built-in test runner (`node:test`), zero dependencies.

## License

MIT. Contributions welcome — open an issue or pull request.
