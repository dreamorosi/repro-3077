# Repro #3077

> [!Note]
> This repository is used to triage the issue aws-powertools/aws-lambda-powertools-typescript#3077.

## Instructions

1. Clone this repository.
2. Run `npm ci`.
3. Run `npm run cdk deploy` and follow the prompts to deploy the stack.
4. Send two messages to the SQS queue created by the stack.
   1. run `aws sqs send-message --queue-url https://sqs.eu-west-1.amazonaws.com/123456789012/MyQueue --message-body '{"property1":1,"property2":"foo2"}'` (replace the Account ID in the queue url with your own)
   2. run `aws sqs send-message --queue-url https://sqs.eu-west-1.amazonaws.com/123456789012/MyQueue --message-body '{"property1":1,"property2":"foo2","property3":"foo3"}'` (replace the Account ID in the queue url with your own)
5. Observe the logs in CloudWatch Logs.
6. Send a message directly to the Lambda function.
   1. run `aws lambda invoke --function-name ParsesqsFn --invocation-type RequestResponse --log-type Tail --payload fileb://events/payload.json t.txt | jq -r .LogResult | base64 --decode`
7. Observe the logs in CloudWatch Logs.
8. Run `npm run cdk destroy` to clean up the stack.
