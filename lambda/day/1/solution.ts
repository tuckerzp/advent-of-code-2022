import { DailySolution, handlerBase } from "../../handler";

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

class Day1 extends DailySolution {
  private readonly elves: Elf[];
  constructor(input: string) {
    super(input);
    this.elves = Elf.fromInput(input);
  }

  public get part1Solution(): number {
    return this.elves.reduce((prev, curr) =>
      prev.totalCalories > curr.totalCalories ? prev : curr
    ).totalCalories;
  }

  public get part2Solution(): number | undefined {
    return this.elves
      .map((elf) => elf.totalCalories)
      .sort((a, b) => a - b)
      .reverse()
      .slice(0, 3)
      .reduce((acc, curr) => acc + curr);
  }
}

export const Solver = Day1;
export const handler = handlerBase(Solver);
