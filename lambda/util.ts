type ErrorResponse = {
  type: "Error";
  message: string;
};

type SuccessResponse = {
  type: "Solution";
  input: string;
  solution: {
    part1: string;
    part2: string;
  };
};

export type Response = ErrorResponse | SuccessResponse;

export const NOT_IMPLEMENTED: ErrorResponse = {
  type: "Error",
  message: "This challenge has not been implemented yet.",
};

export function formatError(message: string): ErrorResponse {
  return { type: "Error", message };
}

export function formatSolution(
  input: string,
  part1: string,
  part2?: string
): SuccessResponse {
  return {
    type: "Solution",
    input,
    solution: {
      part1,
      part2: part2 ?? "",
    },
  };
}
