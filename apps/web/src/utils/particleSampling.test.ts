import { describe, expect, it } from "vitest";
import {
  mapParticleSampleToCanvas,
  selectParticleSamples,
  type ParticleSample,
} from "./particleSampling";

const createGrid = (width: number, height: number): ParticleSample[] => {
  const points: ParticleSample[] = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      points.push({
        x,
        y,
        kind: x < width / 2 ? "caret" : "arc",
      });
    }
  }
  return points;
};

describe("selectParticleSamples", () => {
  it("covers the full source bounds without spatial islands", () => {
    const width = 180;
    const height = 160;
    const columns = 12;
    const rows = 10;
    const selected = selectParticleSamples(createGrid(width, height), 2200);
    const occupancy = Array<number>(columns * rows).fill(0);

    for (const point of selected) {
      const column = Math.min(
        columns - 1,
        Math.floor((point.x / width) * columns),
      );
      const row = Math.min(rows - 1, Math.floor((point.y / height) * rows));
      occupancy[row * columns + column] += 1;
    }

    expect(Math.min(...occupancy)).toBeGreaterThan(0);
  });

  it("is deterministic and preserves both shape regions", () => {
    const points = createGrid(80, 80);
    const first = selectParticleSamples(points, 1000);
    const second = selectParticleSamples(points, 1000);

    expect(first).toEqual(second);
    expect(first.some((point) => point.kind === "caret")).toBe(true);
    expect(first.some((point) => point.kind === "arc")).toBe(true);
  });
  it("preserves the SVG viewBox offset when mapping to the canvas", () => {
    const point: ParticleSample = { x: 36, y: 24, kind: "caret" };
    const mapped = mapParticleSampleToCanvas(point, 192, 512);

    expect(mapped.x).toBe(96);
    expect(mapped.y).toBe(64);
    expect(mapped.y / 512).toBe(point.y / 192);
  });
});