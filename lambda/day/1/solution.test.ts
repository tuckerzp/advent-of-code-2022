import { Solver } from './solution';
import path from 'path';
import fs from 'fs';

function readTestData(name: string): string {
  return fs.readFileSync(path.join(__dirname, '__inputs__', `${name}.txt`)).toString('utf8');
}
const sample = new Solver(readTestData('sample'));
const input = new Solver(readTestData('personal'));

describe('Day 1, Part 1', () => {
  it('returns the correct result for sample input', () => {
    expect(sample.part1Solution).toBe(undefined);
  });

  it('returns the correct result for personal input', () => {
    expect(input.part1Solution).toBe(undefined);
  });
});

describe('Day 1, Part 2', () => {
  it('returns the correct result for sample input', () => {
    expect(sample.part2Solution).toBe(undefined);
  });

  it('return the correct result for personal input', () => {
    expect(input.part2Solution).toBe(undefined);
  });
});
