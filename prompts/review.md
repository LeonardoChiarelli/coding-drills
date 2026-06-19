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
