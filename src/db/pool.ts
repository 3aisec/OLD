import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

// Ensure env vars are loaded
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'fingerprint_db',
};

// ✅ Validate that password exists
if (!dbConfig.password) {
  console.error('❌ [CRITICAL] DB_PASSWORD not set in .env file');
  process.exit(1);
}

const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log(
    `✓ PostgreSQL connected to ${dbConfig.database}@${dbConfig.host}:${dbConfig.port}`
  );
});

pool.on('error', (err) => {
  console.error('✗ Pool error:', err);
});

export default pool;