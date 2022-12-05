import type { Context, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import { NOT_IMPLEMENTED } from './responses';
import { middlewares } from './handler';
import middy from '@middy/core';

const logger = new Logger();

async function baseHandler(
  event: APIGatewayProxyEventV2, context: Context
): Promise<APIGatewayProxyResultV2> {
  const body = JSON.stringify(NOT_IMPLEMENTED);
  logger.info('Solution is not implemented', { path: event.rawPath });

  return {
    statusCode: 404,
    body,
  };
}

export const handler = middy(baseHandler).use(middlewares);
