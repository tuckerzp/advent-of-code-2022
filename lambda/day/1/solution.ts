import { DailySolution, handlerBase } from '../../handler';
import { splitToLines } from '../../util';

export class Solver extends DailySolution {
  // eslint-disable-next-line no-useless-constructor
  constructor(input: string) {
    super(input);
  }

  public get part1Solution(): number | undefined {
    const input = splitToLines(this.rawInput, { keepEmptyLines: true });

    return input.reduce((acc, cur) => {
      if (!cur) {
        return [...acc, 0];
      }
      const b = [...acc];
      b[acc.length - 1] += Number(cur);
      return b;
    }, [0] as number[]).reduce((acc, curr) => Math.max(acc, curr));
  }

  public get part2Solution(): number | undefined {
    const input = splitToLines(this.rawInput, { keepEmptyLines: true });

    return input.reduce((acc, cur) => {
      if (!cur) {
        return [...acc, 0];
      }
      const b = [...acc];
      b[acc.length - 1] += Number(cur);
      return b;
    }, [0] as number[]).sort((n1, n2) => n1 - n2).slice(-3).reduce((acc, curr) => acc + curr);
  }
}

export const handler = handlerBase(Solver);
