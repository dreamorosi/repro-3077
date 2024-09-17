import { Stack, type StackProps, CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import { Runtime, Tracing } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';

export class ParsesqsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new Queue(this, 'MyQueue', {
      queueName: 'MyQueue',
    });

    const fnName = 'ParsesqsFn';
    const logGroup = new LogGroup(this, 'MyLogGroup', {
      logGroupName: `/aws/lambda/${fnName}`,
      removalPolicy: RemovalPolicy.DESTROY,
      retention: RetentionDays.ONE_DAY,
    });
    const fn = new NodejsFunction(this, 'MyFunction', {
      functionName: fnName,
      logGroup,
      runtime: Runtime.NODEJS_20_X,
      entry: './src/index.ts',
      handler: 'exportedHandler',
      tracing: Tracing.ACTIVE,
      bundling: {
        minify: false,
        mainFields: ['module', 'main'],
        sourceMap: true,
        format: OutputFormat.ESM,
        banner:
          "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
      },
    });

    // let the queue trigger the lambda function
    fn.addEventSource(new SqsEventSource(queue));

    new CfnOutput(this, 'FunctionArn', {
      value: fn.functionArn,
    });
  }
}
