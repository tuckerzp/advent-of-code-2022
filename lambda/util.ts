/**
 * Options for the {@link splitToLines} function.
 */
export type SplitToLinesOpts = {
  /**
   * The character (or string) that acts as a line separator.
   *
   * Functionally, this is really just a "record separator". It can be any valid
   * string or regular expression that can be used with `String.prototype.split`.
   *
   * @default "\n"
   */
  separator?: string | RegExp;

  /**
   * Whether empty lines should be kept in the output.
   *
   * @default false
   */
  keepEmptyLines?: boolean;

  /**
   * Whether whitespace should be kept at the end of each line.
   *
   * @default false
   */
  keepWhitespaceAtEnd?: boolean;
};

/**
 * Split the given string into separate lines using the given separator. All lines
 * are trimmed. Any blank lines are removed by default.
 *
 * @param input the string to split into lines
 * @param opts the options to change function behavior
 */
export function splitToLines(input: string, opts?: SplitToLinesOpts): string[] {
  return input
    .split(opts?.separator ?? '\n')
    .map((line) => opts?.keepEmptyLines ? line : line.trim())
    .filter((line) => line.length > 0 || opts?.keepEmptyLines);
}
