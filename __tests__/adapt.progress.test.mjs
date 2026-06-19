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
