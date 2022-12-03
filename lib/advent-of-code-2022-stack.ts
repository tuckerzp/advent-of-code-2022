import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigw from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { AdventOfCodeDay } from "./advent-of-code-day";

export class AdventOfCode2022Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const defaultNotImplemented = new nodejs.NodejsFunction(
      this,
      "NotImplemented",
      {
        entry: "lambda/not-implemented.ts",
        runtime: lambda.Runtime.NODEJS_18_X,
      }
    );
    const defaultIntegration = new HttpLambdaIntegration(
      "NotImplementedIntegration",
      defaultNotImplemented
    );
    const httpApi = new apigw.HttpApi(this, "Api", {
      defaultIntegration,
    });
    new AdventOfCodeDay(this, "Day1", {
      day: 1,
      api: httpApi,
      name: "Calorie Counting",
    });
    new AdventOfCodeDay(this, "Day2", {
      day: 2,
      api: httpApi,
      name: "Rock Paper Scissors",
    });

    new cdk.CfnOutput(this, "ApiUrl", { value: httpApi.apiEndpoint });
  }
}
