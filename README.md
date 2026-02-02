# AWS Test App - Monorepo

A monorepo containing both frontend (Next.js) and backend (Amplify Gen 2) applications.

## Structure

```
aws-test-app/
├── web-app/          # Next.js frontend application
├── server/           # Amplify Gen 2 backend (Lambda functions)
└── amplify.yml       # Amplify deployment configuration
```

## Local Development

### Quick Start (Recommended)

Run frontend, backend, and LocalStack (AWS emulation) with hot reload:

```bash
# Install all dependencies (first time only)
npm run install:all

# Start LocalStack, backend, and frontend with hot reload
npm run dev
```

This will start:
- **LocalStack**: http://localhost:4566 (AWS services emulation - DynamoDB, S3, SQS, etc.)
- **Backend**: http://localhost:3001 (with hot reload, uses LocalStack)
- **Frontend**: http://localhost:3000 (with hot reload)

### Setup Local AWS Resources

After LocalStack starts, initialize your resources:

```bash
npm run setup:local
```

See [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) for detailed instructions on using AWS services locally.

## Deployment

The app is configured to deploy both frontend and backend via AWS Amplify.

### Backend Deployment

The backend uses Amplify Gen 2 and will be deployed using:
```bash
npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
```

### Frontend Deployment

The frontend is built as a static export and deployed to Amplify Hosting.

## Environment Variables

For the frontend to connect to the backend, you'll need to set:
- `NEXT_PUBLIC_API_URL` - The backend API endpoint URL (provided by Amplify backend outputs)

## Testing API Endpoints

Visit `/api-test` page in your frontend to test the backend endpoints:
- `/health` - Health check endpoint
- `/api/hello` - Hello endpoint
