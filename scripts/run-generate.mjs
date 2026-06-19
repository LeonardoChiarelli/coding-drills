// scripts/run-generate.mjs
import { spawn } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { runJob } from '../lib/runner.mjs';
import { readJson } from '../lib/store.mjs';

const repoPath = dirname(dirname(fileURLToPath(import.meta.url)));

function exec(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const ps = spawn(cmd, args, { cwd: opts.cwd ?? repoPath, shell: false });
    let stdout = '', stderr = '';
    ps.stdout.on('data', (d) => (stdout += d));
    ps.stderr.on('data', (d) => (stderr += d));
    ps.on('close', (code) => resolve({ code: code ?? 1, stdout, stderr }));
    ps.on('error', (e) => resolve({ code: 1, stdout, stderr: String(e) }));
  });
}

async function main() {
  await mkdir(join(repoPath, 'state', 'logs'), { recursive: true });
  const logFile = join(repoPath, 'state', 'logs', 'generate.log');
  const log = (m) => { try { appendFileSync(logFile, `[${new Date().toISOString()}] ${m}\n`); } catch {} };
  const settings = await readJson(join(repoPath, 'config', 'settings.json'));
  const res = await runJob({
    repoPath,
    promptFile: join(repoPath, 'prompts', 'generate.md'),
    exec, log,
    autoPush: settings.git?.autoPush ?? true,
  });
  process.exit(res.ok ? 0 : 1);
}
main();
