import { DailySolution, handlerBase } from '../../handler';
import { splitToLines } from '../../util';

class Instruction {
  public readonly from: number;
  public readonly to: number;
  public readonly count: number;

  public static readonly format = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/;

  constructor(text: string) {
    const match = text.match(Instruction.format);
    const { from, to, count } = match?.groups ?? {};
    if (!from || !to || !count) {
      throw new Error(`Invalid instruction: ${text}`);
    }
    this.from = Number(from);
    this.to = Number(to);
    this.count = Number(count);
  }

  toString() {
    return `move ${this.count} from ${this.from} to ${this.to}`;
  }
}

// eslint-disable-next-line no-use-before-define
type Crane = (state: State, instruction: Instruction) => void;

/**
 * The Crate Mover 9000 moves one crate at a time.
 */
function crateMover9000(state: State, instruction: Instruction) {
  for (let i = 0; i < instruction.count; i++) {
    const value = state.crates[instruction.from - 1].pop();
    if (!value) {
      throw new Error(`Invalid state to execute: ${instruction}\n${state.toString()}`);
    }
    state.crates[instruction.to - 1].push(value);
  }
}

/**
 * The Crate Mover 9001 is able to move multiple crates at a time.
 */
function crateMover9001(state: State, instruction: Instruction): void {
  const values = state.crates[instruction.from - 1].splice(-instruction.count, instruction.count);
  if (values.filter((val) => val).length !== instruction.count) {
    throw new Error(`Invalid state to execute: ${instruction}\n${state.toString()}`);
  }
  state.crates[instruction.to - 1].push(...values);
}

class State {
  public readonly crates: string[][];

  constructor(stacks: number, initial: readonly string[]) {
    this.crates = [];
    for (let i = 0; i < stacks; i++) { this.crates.push([]); }
    for (const line of initial) {
      for (let i = 0; i < stacks; i++) {
        const value = line[2 + (4 * i) - 1];
        if (value !== ' ') this.crates[i].unshift(value);
      }
    }
  }

  public apply(crane: Crane, instruction: Instruction) {
    crane(this, instruction);
  }

  public applyAll(crane: Crane, ...instructions: Instruction[]) {
    instructions.forEach((instruction) => this.apply(crane, instruction));
  }

  public topValues(): string {
    return this.crates.map(stack => stack.at(-1)).join('');
  }

  public toString(): string {
    const singleCrate = (crate: string | undefined) => crate ? `[${crate}]` : '   ';
    const countLine = () => [...Array(this.crates.length)]
      .map((_, idx) => ` ${idx + 1} `)
      .join(' ');
    const eachLine = () => {
      let any = true;
      let idx = 0;
      const lines = [];
      while (any) {
        const line = this.crates.map((stack) => singleCrate(stack[idx])).join(' ');
        if (line.trim().length) {
          any = true;
          lines.push(line);
        } else {
          any = false;
        }
        idx += 1;
      }
      return lines;
    };
    const outputLines: string[] = [countLine(), ...eachLine()];
    return outputLines.reverse().join('\n');
  }
}

export class Day5 extends DailySolution {
  // eslint-disable-next-line no-useless-constructor
  public readonly instructions: ReadonlyArray<Instruction>;
  public readonly stackCount: number;
  public readonly stateLines: ReadonlyArray<string>;

  constructor(input: string) {
    super(input);
    const [initialState, instructions] = input.split('\n\n');
    this.instructions = splitToLines(instructions).map((instr) => new Instruction(instr));

    const stateLines = splitToLines(
      initialState,
      { keepWhitespaceAtEnd: true, keepEmptyLines: true }
    );
    const stackCount = stateLines
      .at(-1)
      ?.split(' ')
      ?.map((it) => it.trim())
      ?.filter((it) => it.length)
      ?.map((it) => Number(it))
      ?.at(-1);
    if (!stackCount) {
      throw new Error(`Invalid data: ${stateLines}`);
    }
    this.stackCount = stackCount;
    this.stateLines = stateLines.slice(0, -1);
  }

  public get part1Solution(): string | undefined {
    const state = new State(this.stackCount, this.stateLines);
    state.applyAll(crateMover9000, ...this.instructions);
    return state.topValues();
  }

  public get part2Solution(): string | undefined {
    const state = new State(this.stackCount, this.stateLines);
    state.applyAll(crateMover9001, ...this.instructions);
    return state.topValues();
  }
}

export const Solver = Day5;
export const handler = handlerBase(Solver);
