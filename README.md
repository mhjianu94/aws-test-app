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

### Backend (Server)

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the Amplify sandbox:
```bash
npm run sandbox
```

This will deploy your backend to a temporary AWS environment and provide you with API endpoints.

### Frontend (Web App)

1. Navigate to web-app directory:
```bash
cd web-app
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000)

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
