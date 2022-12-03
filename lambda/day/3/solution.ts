import type {
  Context,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { formatError, formatSolution } from "../../util";

function itemPriority(item: string): number {
  if (item.length !== 1) {
    throw new Error(`Invalid item: ${item}`);
  }
  const code = item.charCodeAt(0);
  if (item >= "a" && item <= "z") {
    return code - "a".charCodeAt(0) + 1;
  }
  if (item >= "A" && item <= "Z") {
    return code - "A".charCodeAt(0) + 27;
  }
  throw new Error(`Invalid item: ${item}`);
}

class ElfGroup {
  private readonly first: Set<string>;
  private readonly second: Set<string>;
  private readonly third: Set<string>;
  constructor(rucksacks: string[]) {
    this.first = new Set(rucksacks[0]);
    this.second = new Set(rucksacks[1]);
    this.third = new Set(rucksacks[2]);
  }

  get commonItem(): string {
    for (const item of this.first) {
      if (this.second.has(item) && this.third.has(item)) {
        return item;
      }
    }
    throw new Error("There is not a common item in the group");
  }
}

class Rucksack {
  public readonly firstCompartment: Set<string>;
  public readonly secondCompartment: Set<string>;
  constructor(fullSack: string) {
    const { length } = fullSack;
    this.firstCompartment = new Set(fullSack.slice(0, length / 2));
    this.secondCompartment = new Set(fullSack.slice(length / 2));
    console.log(this.firstCompartment, this.secondCompartment);
  }

  get commonItem() {
    for (const item of this.firstCompartment) {
      if (this.secondCompartment.has(item)) {
        return item;
      }
    }
    throw new Error("There are not any common items");
  }
}

export function solvePart1(input: string): string {
  const rucksacks = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length);
  return rucksacks
    .map((line) => new Rucksack(line))
    .map((sack) => sack.commonItem)
    .map((item) => itemPriority(item))
    .reduce((prev, curr) => prev + curr)
    .toString();
}

export function solvePart2(input: string): string | undefined {
  const rucksacks = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length);
  const elfGroups: string[][] = [];
  while (rucksacks.length) {
    elfGroups.push(rucksacks.splice(0, 3));
  }
  return elfGroups
    .map((group) => new ElfGroup(group))
    .map((group) => group.commonItem)
    .map((item) => itemPriority(item))
    .reduce((prev, curr) => prev + curr)
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
