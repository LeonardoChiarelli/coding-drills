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

const LEVEL_DIFFICULTY = { beginner: 0.25, intermediate: 0.5, advanced: 0.75 };

export function seedProgress(level) {
  return {
    currentWeek: 1,
    currentDay: 0,
    difficulty: LEVEL_DIFFICULTY[level] ?? 0.5,
    weakSpots: [],
    languageFriction: [],
    history: [],
  };
}

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

export function updateProgress(progress, review) {
  const score = review.total > 0 ? review.solved / review.total : 0;
  const delta = clamp((score - 0.7) * 0.15, -0.1, 0.1);
  const difficulty = clamp(progress.difficulty + delta, 0, 1);

  const weakSpots = (progress.weakSpots ?? []).map((w) => ({ ...w }));
  for (const topic of review.missedTopics ?? []) {
    const hit = weakSpots.find((w) => w.topic === topic);
    if (hit) { hit.misses += 1; hit.lastSeen = review.day; }
    else weakSpots.push({ topic, misses: 1, lastSeen: review.day });
  }

  const languageFriction = (progress.languageFriction ?? []).map((l) => ({ ...l }));
  for (const lang of review.frictionLangs ?? []) {
    const hit = languageFriction.find((l) => l.lang === lang);
    if (hit) hit.struggles += 1;
    else languageFriction.push({ lang, struggles: 1 });
  }

  const history = [...(progress.history ?? []), { day: review.day, score, solved: review.solved, total: review.total }];
  return { ...progress, difficulty, weakSpots, languageFriction, history };
}
