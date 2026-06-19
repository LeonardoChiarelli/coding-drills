// lib/store.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function readJson(path) {
  let raw;
  try {
    raw = await readFile(path, 'utf8');
  } catch {
    throw new Error(`Cannot read settings or state file: ${path}`);
  }
  return JSON.parse(raw);
}

export async function writeJson(path, obj) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

export function defaultSettings() {
  return {
    schedule: { generate: '21:00', review: '07:00', timezone: 'America/Sao_Paulo' },
    level: 'intermediate',
    pillars: { logic: true, algorithms: true, dataStructures: true, architecture: true },
    exercisesPerDay: 10,
    languages: { mode: 'free', allowed: [] },
    git: { remote: '', autoPush: true },
  };
}

const pad = (n) => String(n).padStart(2, '0');
export function dayDir(progress) {
  return `weeks/week-${pad(progress.currentWeek)}/day-${pad(progress.currentDay)}`;
}
export function branchName(week, day) {
  return `solve/week-${pad(week)}/day-${pad(day)}`;
}
