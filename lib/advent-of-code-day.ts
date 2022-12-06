import * as apigw from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export interface AdventOfCodeDayProps {
  readonly day: number;
  readonly name: string;
  readonly api: apigw.HttpApi;
}

export class AdventOfCodeDay extends Construct {
  constructor(scope: Construct, id: string, props: AdventOfCodeDayProps) {
    super(scope, id);
    const codePath = `lambda/day/${props.day}/solution.ts`;
    const fn = new nodejs.NodejsFunction(this, `SolutionDay${props.day}`, {
      entry: codePath,
      runtime: lambda.Runtime.NODEJS_18_X,
      tracing: lambda.Tracing.ACTIVE,
    });
    props.api.addRoutes({
      methods: [apigw.HttpMethod.POST],
      path: `/day/${props.day}/solution`,
      integration: new HttpLambdaIntegration(`SolutionIntegrationDay${props.day}`, fn),
    });
  }
}
