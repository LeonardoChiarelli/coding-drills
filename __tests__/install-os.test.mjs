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
