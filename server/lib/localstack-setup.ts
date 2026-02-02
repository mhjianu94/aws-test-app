/**
 * LocalStack Setup Script
 * Creates AWS resources for local development
 */

import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';
import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3';
import { SQSClient, CreateQueueCommand } from '@aws-sdk/client-sqs';
import { getAWSConfig } from './aws-config.js';

const config = getAWSConfig();

// DynamoDB Client
const dynamoClient = new DynamoDBClient(config);

// S3 Client
const s3Client = new S3Client(config);

// SQS Client
const sqsClient = new SQSClient(config);

/**
 * Initialize local AWS resources
 */
export async function setupLocalResources() {
  console.log('🚀 Setting up LocalStack resources...\n');

  try {
    // Example: Create a DynamoDB table
    // Uncomment and modify as needed
    /*
    await dynamoClient.send(new CreateTableCommand({
      TableName: 'my-table',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    }));
    console.log('✅ DynamoDB table created');
    */

    // Example: Create an S3 bucket
    // Uncomment and modify as needed
    /*
    await s3Client.send(new CreateBucketCommand({
      Bucket: 'my-bucket'
    }));
    console.log('✅ S3 bucket created');
    */

    // Example: Create an SQS queue
    // Uncomment and modify as needed
    /*
    await sqsClient.send(new CreateQueueCommand({
      QueueName: 'my-queue'
    }));
    console.log('✅ SQS queue created');
    */

    console.log('\n✨ LocalStack resources ready!');
  } catch (error: any) {
    if (error.name === 'ResourceInUseException') {
      console.log('ℹ️  Resources already exist');
    } else {
      console.error('❌ Error setting up resources:', error.message);
      throw error;
    }
  }
}

// Run setup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupLocalResources().catch(console.error);
}

