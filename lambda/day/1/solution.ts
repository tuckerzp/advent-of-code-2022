import {
  Context,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { formatError, formatSolution } from "../../util";

class Elf {
  public readonly index: number;
  private readonly foods: number[] = [];

  public static fromInput(input: string): Elf[] {
    const lines = input.split("\n").map((line) => line.trim());
    const elves: Elf[] = [new Elf(1)];
    for (const line of lines) {
      if (!line) {
        elves.push(new Elf(elves.length + 1));
        continue;
      }
      elves.at(-1)?.addFood(Number(line));
    }
    return elves.filter((elf) => elf.foods.length);
  }

  constructor(index: number) {
    this.index = index;
  }

  addFood(calories: number) {
    this.foods.push(calories);
  }

  get totalCalories(): number {
    return this.foods.reduce((acc, curr) => acc + curr);
  }
}

export function solvePart1(input: string): string {
  const elves = Elf.fromInput(input);
  return elves
    .reduce((prev, curr) =>
      prev.totalCalories > curr.totalCalories ? prev : curr
    )
    .totalCalories.toString();
}

export function solvePart2(input: string): string {
  const elves = Elf.fromInput(input);
  return elves
    .map((elf) => elf.totalCalories)
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr)
    .toString();
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
