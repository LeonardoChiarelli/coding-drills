// lib/install-os.mjs
import { windowsTasks } from './schedule.mjs';

export async function registerSchedule({ platform, repoPath, generate, review, exec }) {
  if (platform === 'win32') return registerWindows({ repoPath, generate, review, exec });
  if (platform === 'darwin') return registerLaunchd({ repoPath, generate, review, exec });
  if (platform === 'linux') return registerCron({ repoPath, generate, review, exec });
  return { ok: false, actions: [`unsupported platform: ${platform}`] };
}

async function registerWindows({ repoPath, generate, review, exec }) {
  const tasks = windowsTasks({ repoPath, generate, review });
  const actions = [];
  for (const t of tasks) {
    await exec('schtasks', ['/Delete', '/F', '/TN', t.name]); // idempotent: ignore failure
    const r = await exec('schtasks', ['/Create', '/F', '/SC', 'DAILY', '/TN', t.name, '/ST', t.time, '/TR', t.command]);
    actions.push(`create ${t.name} @ ${t.time} -> ${r.code}`);
    if (r.code !== 0) return { ok: false, actions };
  }
  return { ok: true, actions };
}

async function registerLaunchd({ repoPath, generate, review, exec }) {
  // Delegates to scripts/schedule-macos.sh which writes plists and bootstraps them.
  const r = await exec('bash', ['scripts/schedule-macos.sh', repoPath, generate, review]);
  return { ok: r.code === 0, actions: [`launchd setup -> ${r.code}`] };
}

async function registerCron({ repoPath, generate, review, exec }) {
  const r = await exec('bash', ['scripts/schedule-linux.sh', repoPath, generate, review]);
  return { ok: r.code === 0, actions: [`cron setup -> ${r.code}`] };
}
