import { DailySolution, handlerBase } from '../../handler';

export class Solver extends DailySolution {
  // eslint-disable-next-line no-useless-constructor
  constructor(input: string) {
    super(input);
  }

  public get part1Solution(): number | undefined {
    return undefined;
  }

  public get part2Solution(): number | undefined {
    return undefined;
  }
}

export const handler = handlerBase(Solver);
