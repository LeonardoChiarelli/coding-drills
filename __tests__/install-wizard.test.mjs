// __tests__/install-wizard.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSettings, runWizard } from '../install.mjs';

test('buildSettings overlays answers on defaults', () => {
  const s = buildSettings({ generate: '20:00', level: 'advanced', exercisesPerDay: 8, remote: 'git@x:y.git' });
  assert.equal(s.schedule.generate, '20:00');
  assert.equal(s.schedule.review, '07:00'); // untouched default
  assert.equal(s.level, 'advanced');
  assert.equal(s.exercisesPerDay, 8);
  assert.equal(s.git.remote, 'git@x:y.git');
});

test('runWizard aborts when preflight fails and never writes', async () => {
  let wrote = false;
  const res = await runWizard({
    ask: async () => '',
    preflight: () => ({ ok: false, problems: ['claude missing'] }),
    write: async () => { wrote = true; },
    register: async () => ({ ok: true }),
    platform: 'linux',
  });
  assert.equal(res.ok, false);
  assert.equal(wrote, false);
});

test('runWizard writes settings+progress and registers schedule on success', async () => {
  const writes = [];
  const res = await runWizard({
    ask: async (q, def) => def, // accept all defaults
    preflight: () => ({ ok: true, problems: [] }),
    write: async (path, obj) => writes.push([path, obj]),
    register: async () => ({ ok: true, actions: [] }),
    platform: 'linux',
  });
  assert.equal(res.ok, true);
  assert.ok(writes.some(([p]) => p.includes('settings.json')));
  assert.ok(writes.some(([p]) => p.includes('progress.json')));
});
