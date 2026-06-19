// install.mjs
import { createInterface } from 'node:readline/promises';
import { stdin, stdout, exit, version } from 'node:process';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { defaultSettings, writeJson } from './lib/store.mjs';
import { seedProgress } from './lib/adapt.mjs';
import { checkPreflight } from './lib/preflight.mjs';
import { registerSchedule } from './lib/install-os.mjs';

export function buildSettings(answers) {
  const d = defaultSettings();
  return {
    ...d,
    schedule: { ...d.schedule, generate: answers.generate ?? d.schedule.generate, review: answers.review ?? d.schedule.review },
    level: answers.level ?? d.level,
    exercisesPerDay: answers.exercisesPerDay ?? d.exercisesPerDay,
    languages: answers.languages ?? d.languages,
    git: { ...d.git, remote: answers.remote ?? d.git.remote },
  };
}

export async function runWizard({ ask, preflight, write, register, platform, repoPath = process.cwd() }) {
  const pf = preflight();
  if (!pf.ok) {
    console.error('Preflight failed:\n - ' + pf.problems.join('\n - '));
    return { ok: false, problems: pf.problems };
  }
  const answers = {
    generate: await ask('Generation time (HH:MM)', '21:00'),
    review: await ask('Review time (HH:MM)', '07:00'),
    level: await ask('Level (beginner/intermediate/advanced)', 'intermediate'),
    exercisesPerDay: Number(await ask('Exercises per day', '10')),
    remote: await ask('Git remote URL (blank to skip push)', ''),
  };
  const settings = buildSettings(answers);
  settings.git.autoPush = Boolean(settings.git.remote);
  await write(join(repoPath, 'config', 'settings.json'), settings);
  await write(join(repoPath, 'state', 'progress.json'), seedProgress(settings.level));
  const reg = await register({ platform, repoPath, generate: settings.schedule.generate, review: settings.schedule.review });
  return { ok: reg.ok, settings };
}

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });
  const ask = async (q, def) => (await rl.question(`${q} [${def}]: `)).trim() || def;
  const has = (c) => { try { execSync(process.platform === 'win32' ? `where ${c}` : `command -v ${c}`, { stdio: 'ignore' }); return true; } catch { return false; } };
  const res = await runWizard({
    ask,
    preflight: () => checkPreflight({ which: has, nodeVersion: version }),
    write: writeJson,
    register: (o) => registerSchedule({ ...o, exec: osExec }),
    platform: process.platform,
  });
  rl.close();
  console.log(res.ok ? 'Setup complete. Two daily jobs scheduled.' : 'Setup did not complete.');
  exit(res.ok ? 0 : 1);
}

function osExec(cmd, args) {
  return new Promise((resolve) => {
    import('node:child_process').then(({ spawn }) => {
      const ps = spawn(cmd, args, { shell: false });
      let stderr = '';
      ps.stderr.on('data', (d) => (stderr += d));
      ps.on('close', (code) => resolve({ code: code ?? 1, stdout: '', stderr }));
      ps.on('error', (e) => resolve({ code: 1, stdout: '', stderr: String(e) }));
    });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) main();
