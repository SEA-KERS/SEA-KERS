const PRIZE_PATTERN = /₹([\d,]+)/;

/** Parses a prize string like "₹35,000 Cash Prize" or "₹2 Lakh Grant" into a
 *  comparable numeric value. Non-cash prizes (swags,
 *  incubation, fellowships) rank at 0. */
export const parsePrizeValue = (prize: string | undefined): number => {
  if (!prize) return 0;
  const match = prize.match(PRIZE_PATTERN);
  if (!match) return 0;
  const amount = Number(match[1].replace(/,/g, ""));
  if (Number.isNaN(amount)) return 0;
  const multiplier = /lakh/i.test(prize) ? 100000 : 1;
  return amount * multiplier;
};

/** Returns the `count` records with the highest cash prize value, preserving
 *  original order on ties. */
export const topByPrize = <T extends { prize?: string }>(
  records: readonly T[],
  count: number,
): T[] =>
  [...records]
    .map((record, index) => ({ record, index }))
    .sort(
      (a, b) =>
        parsePrizeValue(b.record.prize) - parsePrizeValue(a.record.prize) ||
        a.index - b.index,
    )
    .slice(0, count)
    .map(({ record }) => record);
