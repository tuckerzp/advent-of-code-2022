import { solvePart1, solvePart2 } from "./solution";
import path from "path";
import fs from "fs";

function readTestData(name: string): string {
  return fs
    .readFileSync(path.join(__dirname, "__inputs__", `${name}.txt`))
    .toString("utf8");
}
const sample = readTestData("sample");
const input = readTestData("personal");

describe("Day 2, Part 1", () => {
  it("returns the correct result for sample input", () => {
    expect(solvePart1(sample)).toBe("15");
  });

  it("returns the correct result for personal input", () => {
    expect(solvePart1(input)).toBe("10816");
  });
});

describe("Day 2, Part 2", () => {
  it("returns the correct result for sample input", () => {
    expect(solvePart2(sample)).toBe("12");
  });

  it("return the correct result for personal input", () => {
    expect(solvePart2(input)).toBe("");
  });
});
