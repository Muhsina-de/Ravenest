import dotenv from 'dotenv';
import path from 'path';

// Define interface for database configuration
interface DatabaseConfig {
  DB_NAME?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_HOST?: string;
  DB_PORT?: number;
}

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: path.resolve(__dirname, '../../', envFile) });

// Initialize dbConfig with default values
const dbConfig: DatabaseConfig = {
  DB_NAME: undefined,
  DB_USER: undefined,
  DB_PASSWORD: undefined,
  DB_HOST: undefined,
  DB_PORT: undefined
};

// Parse DATABASE_URL if it exists (Render provides this)
if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  dbConfig.DB_NAME = url.pathname.slice(1);
  dbConfig.DB_USER = url.username;
  dbConfig.DB_PASSWORD = url.password;
  dbConfig.DB_HOST = url.hostname;
  dbConfig.DB_PORT = parseInt(url.port || '5432');
}

const config = {
  // Server configuration
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database configuration (use DATABASE_URL values if available)
  DB_NAME: dbConfig.DB_NAME || process.env.DB_NAME,
  DB_USER: dbConfig.DB_USER || process.env.DB_USER,
  DB_PASSWORD: dbConfig.DB_PASSWORD || process.env.DB_PASSWORD,
  DB_HOST: dbConfig.DB_HOST || process.env.DB_HOST,
  DB_PORT: dbConfig.DB_PORT || parseInt(process.env.DB_PORT || '5432'),
  
  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-default-secret-key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '24h',
  
  // CORS configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3001',
  
  // API Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  
  // Client URL (for CORS and redirects)
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3001',
};

// Validate required environment variables
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !config[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
    'Please check your .env file or environment configuration.'
  );
}

// Warn about default JWT secret in production
if (process.env.NODE_ENV === 'production' && config.JWT_SECRET === 'your-default-secret-key') {
  console.warn(
    'WARNING: Using default JWT secret in production environment.\n' +
    'Please set a secure JWT_SECRET environment variable.'
  );
}

export default config; 