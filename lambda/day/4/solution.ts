import type {
  Context,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { formatError, formatSolution } from "../../util";

class Assignment {
  public readonly start: number;
  public readonly end: number;
  constructor(input: string) {
    [this.start, this.end] = input.split("-").map((item) => Number(item));
  }

  public contains(other: Assignment) {
    return this.start <= other.start && this.end >= other.end;
  }

  public containedBy(other: Assignment) {
    return other.contains(this);
  }

  public overlaps(other: Assignment) {
    return (
      (this.start < other.start && this.start >= other.end) ||
      (other.start < this.start && other.start >= this.end) ||
      (this.end > other.end && this.start <= other.end) ||
      (other.end > this.end && other.start <= this.end) ||
      this.start === other.start ||
      this.end === other.end
    );
  }
}

function parseInput(input: string): Assignment[][] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length)
    .map((line) => line.split(","))
    .map(([assignment1, assignment2]) => [
      new Assignment(assignment1),
      new Assignment(assignment2),
    ]);
}

export function solvePart1(input: string): string {
  return parseInput(input)
    .filter((pair) => pair[0].contains(pair[1]) || pair[1].contains(pair[0]))
    .length.toString();
}

export function solvePart2(input: string): string | undefined {
  return parseInput(input)
    .filter((pair) => pair[0].overlaps(pair[1]))
    .length.toString();
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
