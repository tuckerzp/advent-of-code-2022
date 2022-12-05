import { DailySolution, handlerBase } from "../../handler";
import { splitToLines } from "../../util";

const enum Outcome {
  WIN = 6,
  DRAW = 3,
  LOSS = 0,
}

const enum Choice {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

type OpponentChoice = "A" | "B" | "C";
type PlayerChoice = "X" | "Y" | "Z";
type DesiredOutcome = "X" | "Y" | "Z";
type SolutionLookup = Record<
  OpponentChoice,
  Record<PlayerChoice | DesiredOutcome, number>
>;

const part1Lookup: SolutionLookup = {
  // ROCK
  A: {
    X: Outcome.DRAW + Choice.ROCK,
    Y: Outcome.WIN + Choice.PAPER,
    Z: Outcome.LOSS + Choice.SCISSORS,
  },
  // PAPER
  B: {
    X: Outcome.LOSS + Choice.ROCK,
    Y: Outcome.DRAW + Choice.PAPER,
    Z: Outcome.WIN + Choice.SCISSORS,
  },
  // SCISSORS
  C: {
    X: Outcome.WIN + Choice.ROCK,
    Y: Outcome.LOSS + Choice.PAPER,
    Z: Outcome.DRAW + Choice.SCISSORS,
  },
};

const part2Lookup: SolutionLookup = {
  A: {
    // Rock beats scissors
    X: Outcome.LOSS + Choice.SCISSORS,
    Y: Outcome.DRAW + Choice.ROCK,
    // Paper beats rock
    Z: Outcome.WIN + Choice.PAPER,
  },
  B: {
    // Paper beats rock
    X: Outcome.LOSS + Choice.ROCK,
    Y: Outcome.DRAW + Choice.PAPER,
    // Scissors beats paper
    Z: Outcome.WIN + Choice.SCISSORS,
  },
  C: {
    // Scissors beats paper
    X: Outcome.LOSS + Choice.PAPER,
    Y: Outcome.DRAW + Choice.SCISSORS,
    // Rock beats scissors
    Z: Outcome.WIN + Choice.ROCK,
  },
};

function isOpponentChoice(str: string): str is OpponentChoice {
  return ["A", "B", "C"].includes(str);
}
function isPlayerChoice(str: string): str is PlayerChoice & DesiredOutcome {
  return ["X", "Y", "Z"].includes(str);
}

class Day2 extends DailySolution {
  private readonly lines: string[];
  constructor(input: string) {
    super(input);
    this.lines = splitToLines(input);
  }

  public get part1Solution(): number {
    const turns = this.lines.map((line) => {
      const [opponentKey, playerKey] = line.split(" ");
      if (!isOpponentChoice(opponentKey) || !isPlayerChoice(playerKey)) {
        throw new Error(`Invalid line: ${opponentKey} ${playerKey}`);
      }
      return part1Lookup[opponentKey][playerKey];
    });
    return turns.reduce((prev, curr) => prev + curr);
  }

  public get part2Solution(): number {
    const turns = this.lines.map((line) => {
      const [opponentKey, playerKey] = line.split(" ");
      if (!isOpponentChoice(opponentKey) || !isPlayerChoice(playerKey)) {
        throw new Error(`Invalid line: ${opponentKey} ${playerKey}`);
      }
      return part2Lookup[opponentKey][playerKey];
    });
    return turns.reduce((prev, curr) => prev + curr);
  }
}

export const Solver = Day2;
export const handler = handlerBase(Solver);
