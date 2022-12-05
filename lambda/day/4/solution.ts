import { DailySolution, handlerBase } from "../../handler";
import { splitToLines } from "../../util";

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

class Day4 extends DailySolution {
  private readonly assignments: [Assignment, Assignment][];

  constructor(input: string) {
    super(input);
    this.assignments = splitToLines(input)
      .map((line) => line.split(","))
      .map(([assignment1, assignment2]) => [
        new Assignment(assignment1),
        new Assignment(assignment2),
      ]);
  }

  public get part1Solution(): number {
    return this.assignments.filter(
      (pair) => pair[0].contains(pair[1]) || pair[1].contains(pair[0])
    ).length;
  }

  public get part2Solution(): number {
    return this.assignments.filter((pair) => pair[0].overlaps(pair[1])).length;
  }
}

export const Solver = Day4;
export const handler = handlerBase(Solver);
