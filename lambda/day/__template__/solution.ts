import {
  Context,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { formatError, formatSolution } from "../../util";

export function solvePart1(input: string): string {
  return "";
}

export function solvePart2(input: string): string | undefined {
  return undefined;
}

export async function handler(
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResultV2> {
  const { body } = event;
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify(formatError("No input was provided")),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      formatSolution(body, solvePart1(body), solvePart2(body))
    ),
  };
}
