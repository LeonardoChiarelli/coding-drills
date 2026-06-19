// lib/adapt.mjs
const BASE_RATIO = { logic: 4, algorithms: 3, dataStructures: 3 };

function enabledPillars(settings) {
  return Object.entries(settings.pillars)
    .filter(([k, v]) => v && k !== 'architecture')
    .map(([k]) => k);
}

function composition(settings) {
  const n = settings.exercisesPerDay;
  const enabled = enabledPillars(settings);
  const weights = enabled.map((p) => BASE_RATIO[p] ?? 1);
  const total = weights.reduce((a, b) => a + b, 0);
  // Largest-remainder allocation so counts sum exactly to n.
  const raw = enabled.map((p, i) => ({ pillar: p, exact: (weights[i] / total) * n }));
  const counts = raw.map((r) => ({ pillar: r.pillar, count: Math.floor(r.exact), rem: r.exact % 1 }));
  let assigned = counts.reduce((a, c) => a + c.count, 0);
  counts.sort((a, b) => b.rem - a.rem);
  for (let i = 0; assigned < n; i++, assigned++) counts[i % counts.length].count++;
  const slots = [];
  for (const c of counts) for (let i = 0; i < c.count; i++) slots.push(c.pillar);
  return slots;
}

export function planDay(settings, progress, { weekday }) {
  let pillars = composition(settings);
  if (weekday === 5 && settings.pillars.architecture) {
    pillars[pillars.length - 1] = 'architecture';
  }
  const biased = biasedTopics(progress, pillars.length);
  return pillars.map((pillar, i) => ({
    pillar,
    biasedTopic: biased[i] ?? null,
    difficulty: progress.difficulty,
  }));
}

function biasedTopics(progress, slotCount) {
  const want = Math.round(slotCount * 0.35);
  const sorted = [...(progress.weakSpots ?? [])].sort(
    (a, b) => b.misses - a.misses || (b.lastSeen > a.lastSeen ? 1 : -1),
  );
  const out = new Array(slotCount).fill(null);
  for (let i = 0; i < want && i < sorted.length; i++) out[i] = sorted[i].topic;
  return out;
}
