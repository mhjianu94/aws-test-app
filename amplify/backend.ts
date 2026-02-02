import { defineBackend } from '@aws-amplify/backend';
import { apiFunction } from './resources';

// Define the Lambda function
export const backend = defineBackend({
    apiFunction,
  });

