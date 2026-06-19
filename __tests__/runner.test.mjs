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
