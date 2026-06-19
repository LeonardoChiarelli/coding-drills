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
