import { defineFunction } from '@aws-amplify/backend';

// Define the Lambda function
export const apiFunction = defineFunction({
    name: 'api-handler',
    entry: '../handler.ts',
  });

