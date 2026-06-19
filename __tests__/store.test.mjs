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
