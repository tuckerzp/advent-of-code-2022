# Advent of Code 2022 Solutions

This repository will contain my solutions for Advent of Code 2022 until I get
bored with doing it. The solutions are built to be executed as a Lambda Function
behind API Gateway. The application is deployed using the AWS CDK.

Solutions are stored in the `lambda/day/{day}` directories, with the
implementation, tests, and inputs stored there.

The HTTP Endpoint for the API Gateway HTTP API is emitted as an output of the
CloudFormation stack and will be present in the `cdk deploy` output. The route
for each day is `/day/{day}/solution`. The output is structured as:

```json
{
  "type": "Solution"
  "input": "...",
  "solution": {
    "part1": "...",
    "part2": "...",
  }
}
```

The `solution.part2` field will be omitted if the second part of the challenge
has not been solved yet.

All solutions are implemented in TypeScript and the Lambda functions use the
NodeJS 18.X runtime.

## TODO

- Use CDK integration tests to check correctness after deployment
- Create some shared code for common patterns for return values
