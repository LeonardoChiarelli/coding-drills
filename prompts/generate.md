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
