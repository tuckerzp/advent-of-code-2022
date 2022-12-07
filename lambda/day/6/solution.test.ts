import { Solver } from './solution';
import path from 'path';
import fs from 'fs';

function readTestData(name: string): string {
  return fs.readFileSync(path.join(__dirname, '__inputs__', `${name}.txt`)).toString('utf8');
}
const sample = new Solver(readTestData('sample'));
const input = new Solver(readTestData('personal'));

describe('Day 6, Part 1', () => {
  it('returns the correct result for sample input', () => {
    expect(sample.part1Solution).toBe(7);
  });

  it('returns the correct result for personal input', () => {
    expect(input.part1Solution).toBe(1480);
  });
});

describe('Day 6, Part 2', () => {
  it('returns the correct result for sample input', () => {
    expect(sample.part2Solution).toBe(19);
  });

  it('return the correct result for personal input', () => {
    expect(input.part2Solution).toBe(2746);
  });
});

describe('Day 6, Additional examples', () => {
  it.each([
    {
      input: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
      part1: 5,
      part2: 23,
    },
    {
      input: 'nppdvjthqldpwncqszvftbrmjlhg',
      part1: 6,
      part2: 23,
    },
    {
      input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
      part1: 10,
      part2: 29,
    },
    {
      input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
      part1: 11,
      part2: 26,
    },
  ])('Sample ($input) = ($part1, $part2)', ({ input, part1, part2 }) => {
    const solver = new Solver(input);
    expect(solver.part1Solution).toBe(part1);
    expect(solver.part2Solution).toBe(part2);
  });
});
