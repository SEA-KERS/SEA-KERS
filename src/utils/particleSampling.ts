export type ParticleSampleKind = "caret" | "arc";

export interface ParticleSample {
  x: number;
  y: number;
  kind: ParticleSampleKind;
}

export interface ParticleCanvasPoint {
  x: number;
  y: number;
  scale: number;
}

export const mapParticleSampleToCanvas = (
  sample: ParticleSample,
  sampleSize: number,
  canvasSize: number,
): ParticleCanvasPoint => {
  if (sampleSize <= 0) {
    throw new RangeError("sampleSize must be greater than zero");
  }

  const scale = canvasSize / sampleSize;
  return {
    x: sample.x * scale,
    y: sample.y * scale,
    scale,
  };
};

const DEFAULT_SEED = 0x53_45_41;

const createSeededRandom = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d_2b_79_f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
};

const seededShuffle = <Item>(items: readonly Item[], seed: number) => {
  const shuffled = [...items];
  const random = createSeededRandom(seed);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

export const selectParticleSamples = (
  samples: readonly ParticleSample[],
  requestedBudget: number,
  seed = DEFAULT_SEED,
): ParticleSample[] => {
  const budget = Math.min(
    samples.length,
    Math.max(0, Math.floor(requestedBudget)),
  );
  if (budget === 0) return [];

  const caretSamples = samples.filter((sample) => sample.kind === "caret");
  const arcSamples = samples.filter((sample) => sample.kind === "arc");

  if (caretSamples.length === 0 || arcSamples.length === 0 || budget === 1) {
    return seededShuffle(samples, seed).slice(0, budget);
  }

  let caretBudget = Math.round(
    budget * (caretSamples.length / samples.length),
  );
  caretBudget = Math.min(
    caretSamples.length,
    Math.max(1, Math.min(budget - 1, caretBudget)),
  );
  let arcBudget = Math.min(arcSamples.length, budget - caretBudget);

  let remaining = budget - caretBudget - arcBudget;
  if (remaining > 0) {
    const caretExtra = Math.min(
      remaining,
      caretSamples.length - caretBudget,
    );
    caretBudget += caretExtra;
    remaining -= caretExtra;
  }
  if (remaining > 0) {
    arcBudget += Math.min(remaining, arcSamples.length - arcBudget);
  }

  const selectedCaret = seededShuffle(
    caretSamples,
    seed ^ 0x43_41_52_45,
  ).slice(0, caretBudget);
  const selectedArc = seededShuffle(arcSamples, seed ^ 0x41_52_43).slice(
    0,
    arcBudget,
  );

  return seededShuffle(
    [...selectedCaret, ...selectedArc],
    seed ^ 0x4d_49_58,
  );
};