# Local Development with AWS Resources

This guide shows how to run your application locally with AWS services (DynamoDB, S3, SQS, etc.) using LocalStack.

## 🚀 Quick Start

### 1. Start LocalStack

```bash
# Start LocalStack (Docker required)
npm run dev:localstack
```

This starts LocalStack on `http://localhost:4566` with:
- DynamoDB
- S3
- SQS
- SNS
- Lambda
- API Gateway
- IAM
- STS
- CloudFormation

### 2. Setup Local Resources (Optional)

After LocalStack is running, initialize your resources:

```bash
npm run setup:local
```

This creates tables, buckets, queues, etc. defined in `amplify/lib/localstack-setup.ts`.

### 3. Start Backend

In a new terminal:

```bash
npm run dev:backend
```

The backend will automatically:
- Use LocalStack at `http://localhost:4566`
- Connect to local AWS services
- Hot reload on code changes

### 4. Start Frontend

In another terminal:

```bash
npm run dev:frontend
```

### 5. Run Everything Together

Or run all services at once:

```bash
npm run dev
```

## 📁 Project Structure

```
aws-test-app/
├── docker-compose.yml          # LocalStack configuration
├── amplify/
│   ├── handler.ts              # Your Lambda handler
│   ├── backend.ts              # Amplify Gen 2 backend definition
│   ├── resources.ts            # Lambda function definition
│   └── lib/
│       ├── aws-config.ts      # AWS SDK configuration (LocalStack/production)
│       └── localstack-setup.ts # Resource initialization
├── server/
│   └── lambda-http-server.ts  # Local HTTP server for Lambda (dev only)
```

## 🔧 How It Works

### AWS SDK Configuration

The `amplify/lib/aws-config.ts` file automatically:
- **Development**: Uses LocalStack at `http://localhost:4566`
- **Production**: Uses real AWS (from environment/IAM role)

### Using AWS Services in Your Handler

```typescript
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { createAWSClient } from './lib/aws-config.js';

// Create client (automatically uses LocalStack in dev)
const dynamoClient = createAWSClient(DynamoDBClient);

// Use it normally - works with both LocalStack and real AWS
const result = await dynamoClient.send(new GetItemCommand({
  TableName: 'my-table',
  Key: { id: { S: '123' } }
}));
```

## 📝 Available Services

LocalStack supports:
- ✅ DynamoDB
- ✅ S3
- ✅ SQS
- ✅ SNS
- ✅ Lambda
- ✅ API Gateway
- ✅ IAM
- ✅ STS
- ✅ CloudFormation
- ✅ And many more...

## 🛠️ LocalStack Management

```bash
# Start LocalStack
npm run dev:localstack

# Stop LocalStack
npm run dev:localstack:down

# View LocalStack logs
docker logs aws-test-app-localstack -f

# Access LocalStack Web UI (if enabled)
open http://localhost:4566/_localstack/health
```

## 🔍 Testing

Your Lambda handler code works the same in:
- **Local development** (LocalStack)
- **Amplify sandbox** (real AWS, temporary)
- **Production** (real AWS)

No code changes needed!

## 📚 Resources

- [LocalStack Documentation](https://docs.localstack.cloud/)
- [AWS SDK v3 Documentation](https://docs.aws.amazon.com/sdk-for-javascript/v3/)
- See `amplify/handler.ts` for Lambda handler examples

