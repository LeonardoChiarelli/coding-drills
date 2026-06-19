// lib/runner.mjs
export async function runJob({ repoPath, promptFile, exec, log, autoPush }) {
  const steps = [
    ['git', ['pull', '--ff-only']],
    ['claude', ['-p', promptFile, '--permission-mode', 'acceptEdits']],
    ['git', ['add', '-A']],
    ['git', ['commit', '-m', `chore: automated ${promptFile} run`]],
  ];
  if (autoPush) steps.push(['git', ['push']]);

  const done = [];
  for (const [cmd, args] of steps) {
    const r = await exec(cmd, args, { cwd: repoPath });
    const line = [cmd, ...args].join(' ');
    done.push(line);
    log(`${line} -> code ${r.code}`);
    if (r.code !== 0) {
      log(`step failed: ${line}\n${r.stderr}`);
      return { ok: false, steps: done };
    }
  }
  return { ok: true, steps: done };
}
