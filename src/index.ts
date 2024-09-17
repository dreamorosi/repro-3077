import { z } from 'zod';
import type { Context, SQSBatchResponse, SQSBatchItemFailure } from 'aws-lambda';
import middy from '@middy/core';
import { parser } from '@aws-lambda-powertools/parser/middleware';
import { SqsRecordSchema, SqsSchema } from '@aws-lambda-powertools/parser/schemas';
import { JSONStringified } from '@aws-lambda-powertools/parser/helpers';

const messageBodySchema = z.object({
  property1: z.number(),
  property2: z.string(),
  property3: z.string().optional(),
});

const extendedSqsSchema = SqsSchema.extend({
  Records: z.array(
    SqsRecordSchema.extend({
      body: JSONStringified(messageBodySchema),
    }),
  ),
});

type ExtendedType = z.infer<typeof extendedSqsSchema>;

export const handler = async (event: ExtendedType, _context: Context): Promise<SQSBatchResponse> => {
  const batchItemFailures: SQSBatchItemFailure[] = [];
  for (const record of event.Records) {
    try {

      const { property1, property2, property3 } = record.body;

      console.log('property1', property1); //return undefined
      console.log('property2', property2); //return undefined
      console.log('property3', property3); //return undefined
    } finally {}
  }

  return { batchItemFailures };
}

export const exportedHandler = middy(handler).use(
  parser({ schema: extendedSqsSchema }),
);