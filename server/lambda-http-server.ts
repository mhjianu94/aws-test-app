import http from 'http';
import { handler } from './handler.js';

const PORT = process.env.PORT || 3001;

// Configure for LocalStack if AWS_ENDPOINT_URL is set
if (process.env.AWS_ENDPOINT_URL) {
  console.log(`🔧 Using LocalStack at ${process.env.AWS_ENDPOINT_URL}`);
}

// Convert HTTP request to API Gateway event
const httpToLambdaEvent = (req: http.IncomingMessage, body: string): any => {
  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  
  return {
    path: url.pathname,
    httpMethod: req.method || 'GET',
    headers: req.headers as Record<string, string>,
    body: body || null,
    queryStringParameters: Object.fromEntries(url.searchParams),
    pathParameters: null,
    requestContext: {
      requestId: `local-${Date.now()}`,
      stage: 'local',
    },
  };
};

// Convert Lambda response to HTTP response
const lambdaToHttp = (res: http.ServerResponse, lambdaResponse: any) => {
  if (lambdaResponse.headers) {
    Object.entries(lambdaResponse.headers).forEach(([key, value]) => {
      res.setHeader(key, value as string);
    });
  }
  
  res.statusCode = lambdaResponse.statusCode || 200;
  res.end(lambdaResponse.body || '');
};

const server = http.createServer(async (req, res) => {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', async () => {
    try {
      const event = httpToLambdaEvent(req, body);
      const response = await handler(event);
      lambdaToHttp(res, response);
    } catch (error: any) {
      console.error('Handler error:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Lambda local server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`👋 Hello endpoint: http://localhost:${PORT}/api/hello`);
  
  if (process.env.AWS_ENDPOINT_URL) {
    console.log(`\n🔧 AWS Endpoint: ${process.env.AWS_ENDPOINT_URL} (LocalStack)`);
  } else {
    console.log(`\n🔧 Using real AWS resources (configure AWS credentials)`);
  }
  console.log(`\n✨ Hot reload enabled - changes will auto-restart\n`);
});

