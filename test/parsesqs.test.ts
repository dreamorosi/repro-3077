import { describe, it } from 'vitest';
import { handler } from '../src/index.js';
import { readFileSync } from 'node:fs';
import type { Context } from 'aws-lambda';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Get the current file URL
const __filename = fileURLToPath(import.meta.url);

// Get the current directory
const __dirname = dirname(__filename);

describe('handler', () => {
  const event = JSON.parse(
    readFileSync(join(__dirname, '../events/payload.json'), 'utf8')
  );

  it('does stuff', async () => {
    await handler(event, {} as Context);
  });
});
