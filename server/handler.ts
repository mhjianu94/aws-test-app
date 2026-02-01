import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const path = event.path;
  const method = event.httpMethod;

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle OPTIONS for CORS preflight
  if (method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Health check endpoint
  if (path === '/health' && method === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        status: 'ok', 
        message: 'Server is running' 
      }),
    };
  }

  // API endpoint
  if (path === '/api/hello' && method === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Hello from backend!' 
      }),
    };
  }

  // Default 404
  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ 
      message: 'Not found',
      path: path 
    }),
  };
};