import { DailySolution, handlerBase } from "../../handler";
import { splitToLines } from "../../util";

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

export class Day3 extends DailySolution {
  private readonly rucksackData: string[];
  constructor(input: string) {
    super(input);
    this.rucksackData = splitToLines(input);
  }

  public get part1Solution(): number {
    return this.rucksackData
      .map((line) => new Rucksack(line))
      .map((sack) => sack.commonItem)
      .map((item) => itemPriority(item))
      .reduce((prev, curr) => prev + curr);
  }

  public get part2Solution(): number {
    const elfGroups: string[][] = [];
    for (let i = 0; i < this.rucksackData.length; i += 3) {
      elfGroups.push(this.rucksackData.slice(i, i + 3));
    }
    return elfGroups
      .map((group) => new ElfGroup(group))
      .map((group) => group.commonItem)
      .map((item) => itemPriority(item))
      .reduce((prev, curr) => prev + curr);
  }
}

export const Solver = Day3;
export const handler = handlerBase(Solver);
