import middy from "@middy/core";
import { Tracer, captureLambdaHandler } from "@aws-lambda-powertools/tracer";
import { Logger, injectLambdaContext } from "@aws-lambda-powertools/logger";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { INVALID_INPUT, Response, UNEXPECTED_ERROR } from "./responses";
const tracer = new Tracer();
const logger = new Logger();

export const middlewares = [
  injectLambdaContext(logger, { logEvent: true }),
  captureLambdaHandler(tracer),
];

export interface DailySolutionConstructor {
  // eslint-disable-next-line no-use-before-define
  new (input: string): DailySolution;
}

export abstract class DailySolution {
  public readonly rawInput: string;

  constructor(input: string) {
    this.rawInput = input;
  }

  public get part1Solution(): number | undefined {
    return undefined;
  }

  public get part2Solution(): number | undefined {
    return undefined;
  }
}

export function handlerBase(
  Solver: DailySolutionConstructor
): APIGatewayProxyHandlerV2<Response> {
  const fn: APIGatewayProxyHandlerV2<Response> = async (event, context) => {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify(INVALID_INPUT),
      };
    }
    try {
      const solver = new Solver(event.body);
      return {
        statusCode: 200,
        body: JSON.stringify({
          input: solver.rawInput,
          solution: {
            part1: solver.part1Solution,
            part2: solver.part2Solution,
          },
        }),
      };
    } catch (err) {
      logger.error("Unexpected error in solution", err as Error);
      return {
        statusCode: 500,
        body: JSON.stringify(UNEXPECTED_ERROR),
      };
    }
  };
  return middy(fn).use(middlewares);
}
