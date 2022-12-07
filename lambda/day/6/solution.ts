import { DailySolution, handlerBase } from '../../handler';

/**
 * Get the index of the start of the last pair of duplicate characters.
 *
 * A value may appear more than once within the window that we are currently scanning.
 * When that happens, everything up to the second-to-last occurrence of that value can
 * be skipped (because for any index before that, the next window would include both
 * values again).
 *
 * @param str the string to scan for duplicates
 * @returns the last index where a pair of duplicate values starts (or -1 if no item appears
 *          two or more times).
 */
function startOfLastDuplicatePair(str: string): number {
  const indices: Record<string, number[]> = {};
  for (let i = 0; i < str.length; i++) {
    indices[str.charAt(i)] ??= [];
    indices[str.charAt(i)].push(i);
  }
  return Object.values(indices)
    .reduce((last, duplicates) => Math.max(last, duplicates.at(-2) ?? -1), -1);
}

function firstUniqueRun(datastream: string, count: number): number {
  for (let i = 0; i < datastream.length - count;) {
    const window = datastream.slice(i, i + count);
    const lastDup = startOfLastDuplicatePair(window);
    if (lastDup === -1) {
      return i + count;
    }
    // Skip to after the start of duplicate pair
    i += lastDup + 1;
  }
  throw new Error(`Every window of ${count} characters contains duplicates`);
}

export class Day6 extends DailySolution {
  private readonly datastream: string;

  constructor(input: string) {
    super(input);
    this.datastream = this.rawInput.trim();
  }

  public get part1Solution(): number | undefined {
    // The start-of-packet occurs after 4 unique characters have been processed in a row
    return firstUniqueRun(this.datastream, 4);
  }

  public get part2Solution(): number | undefined {
    // The start-of-message occurs after 14 unique characters have been processed in a row
    return firstUniqueRun(this.datastream, 14);
  }
}

export const Solver = Day6;
export const handler = handlerBase(Solver);
