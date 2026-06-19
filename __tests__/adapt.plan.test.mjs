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
