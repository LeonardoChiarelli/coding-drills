// lib/preflight.mjs
export function checkPreflight({ which, nodeVersion }) {
  const problems = [];
  const major = Number((nodeVersion ?? '').replace(/^v/, '').split('.')[0]);
  if (!Number.isFinite(major) || major < 18) {
    problems.push(`Node >=18 required (found ${nodeVersion}). See https://nodejs.org`);
  }
  if (!which('git')) problems.push('git not found on PATH. Install from https://git-scm.com');
  if (!which('claude')) {
    problems.push('claude CLI not found. Install Claude Code and run `claude` once to authenticate.');
  }
  return { ok: problems.length === 0, problems };
}
