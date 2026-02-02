/**
 * AWS SDK Configuration
 * Automatically uses LocalStack in development, real AWS in production
 */

export interface AWSConfig {
  endpoint?: string;
  region: string;
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export function getAWSConfig(): AWSConfig {
  const isLocal = process.env.AWS_ENDPOINT_URL || process.env.NODE_ENV === 'development';
  
  if (isLocal && process.env.AWS_ENDPOINT_URL) {
    // LocalStack configuration
    return {
      endpoint: process.env.AWS_ENDPOINT_URL,
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
      },
    };
  }
  
  // Production - use default AWS config (from environment or IAM role)
  return {
    region: process.env.AWS_REGION || 'us-east-1',
  };
}

/**
 * Helper to create AWS clients with proper configuration
 */
export function createAWSClient<T>(
  ClientClass: new (config: any) => T
): T {
  const config = getAWSConfig();
  return new ClientClass(config);
}

