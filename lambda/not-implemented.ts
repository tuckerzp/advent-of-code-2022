import {
  Context,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";
import { NOT_IMPLEMENTED } from "./util";

const logger = new Logger();

export async function handler(
  event: APIGatewayProxyEventV2,
  context: Context
): Promise<APIGatewayProxyResultV2> {
  const body = JSON.stringify(NOT_IMPLEMENTED);
  logger.info("Solution is not implemented", { path: event.rawPath });

  return {
    statusCode: 404,
    body,
  };
}
