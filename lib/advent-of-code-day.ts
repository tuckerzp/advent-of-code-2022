import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigw from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";

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
      integration: new HttpLambdaIntegration(
        `SolutionIntegrationDay${props.day}`,
        fn
      ),
    });
  }
}
