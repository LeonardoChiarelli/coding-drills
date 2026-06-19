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
