import { describe, expect, it } from "vitest";
import { formatPrizeHeadline, parsePrizeValue, topByPrize } from "./prize";

describe("parsePrizeValue", () => {
  it("parses plain cash prizes", () => {
    expect(parsePrizeValue("₹35,000 Cash Prize")).toBe(35000);
    expect(parsePrizeValue("₹2,000 Cash Prize")).toBe(2000);
  });

  it("parses lakh-scaled grants", () => {
    expect(parsePrizeValue("₹15 Lakh Grant to Develop Idea")).toBe(1500000);
  });

  it("ranks non-cash prizes at zero", () => {
    expect(parsePrizeValue("Swags & Goodies")).toBe(0);
    expect(parsePrizeValue("Offered Incubation")).toBe(0);
    expect(parsePrizeValue("AICTE National Fellowship")).toBe(0);
    expect(parsePrizeValue(undefined)).toBe(0);
  });
});

describe("formatPrizeHeadline", () => {
  it("formats cash and lakh prizes compactly", () => {
    expect(formatPrizeHeadline("₹35,000 Cash Prize")).toBe("₹35,000");
    expect(formatPrizeHeadline("₹15 Lakh Grant to Develop Idea")).toBe(
      "₹15 Lakh",
    );
  });

  it("returns null for non-cash prizes", () => {
    expect(formatPrizeHeadline("Swags & Goodies")).toBeNull();
    expect(formatPrizeHeadline(undefined)).toBeNull();
  });
});

describe("topByPrize", () => {
  const records = [
    { id: "a", prize: "₹2,000 Cash Prize" },
    { id: "b", prize: "₹75,000 Cash Prize" },
    { id: "c", prize: "₹15 Lakh Grant to Develop Idea" },
    { id: "d", prize: "Swags & Goodies" },
  ] as const;

  it("returns the highest-value records in value order", () => {
    expect(topByPrize(records, 3).map((record) => record.id)).toEqual([
      "c",
      "b",
      "a",
    ]);
  });

  it("never exceeds the requested count", () => {
    expect(topByPrize(records, 2).map((record) => record.id)).toEqual(["c", "b"]);
  });
});
