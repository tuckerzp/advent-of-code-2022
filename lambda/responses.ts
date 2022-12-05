type ErrorResponse = {
  type: "Error";
  message: string;
};

type SuccessResponse = {
  type: "Solution";
  input: string;
  solution: {
    part1: number;
    part2?: number;
  };
};

export type Response = ErrorResponse | SuccessResponse;

export const NOT_IMPLEMENTED: ErrorResponse = {
  type: "Error",
  message: "This challenge has not been implemented yet.",
};
export const INVALID_INPUT: ErrorResponse = {
  type: "Error",
  message: "The provided input is invalid or missing",
};
export const UNEXPECTED_ERROR: ErrorResponse = {
  type: "Error",
  message: "An unexpected error occurred while calculating the solution",
};

export function formatError(message: string): ErrorResponse {
  return { type: "Error", message };
}

export function formatSolution(
  input: string,
  part1: number,
  part2?: number
): SuccessResponse {
  return {
    type: "Solution",
    input,
    solution: {
      part1,
      part2,
    },
  };
}
