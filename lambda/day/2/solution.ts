import type {
  Context,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { formatError, formatSolution } from "../../util";

enum Outcome {
  WIN = 6,
  DRAW = 3,
  LOSS = 0,
}

enum Choice {
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

export function solvePart1(input: string): string {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length);
  const turns = lines.map((line) => {
    const [opponentKey, playerKey] = line.split(" ");
    if (!isOpponentChoice(opponentKey) || !isPlayerChoice(playerKey)) {
      throw new Error(`Invalid line: ${opponentKey} ${playerKey}`);
    }
    return part1Lookup[opponentKey][playerKey];
  });
  return turns.reduce((prev, curr) => prev + curr).toString();
}

export function solvePart2(input: string): string | undefined {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length);
  const turns = lines.map((line) => {
    const [opponentKey, playerKey] = line.split(" ");
    if (!isOpponentChoice(opponentKey) || !isPlayerChoice(playerKey)) {
      throw new Error(`Invalid line: ${opponentKey} ${playerKey}`);
    }
    return part2Lookup[opponentKey][playerKey];
  });
  return turns.reduce((prev, curr) => prev + curr).toString();
}

export async function handler(
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResultV2> {
  const { body } = event;
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify(formatError("No input was provided")),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      formatSolution(body, solvePart1(body), solvePart2(body))
    ),
  };
}
