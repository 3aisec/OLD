// src/server.ts
import express from 'express';
import cors from 'cors';
import fingerprintRouter from './api/routes/fingerprint';

// Import pool first to ensure dotenv.config() runs at the top of pool.ts
import pool from './db/pool';

const app = express();
const PORT = 8082;

// CORS Configuration - allow your frontend (both HTTP and HTTPS)
app.use(cors({
  origin: [
    'http://localhost:8081',
    'https://localhost:8081',
    'http://192.168.29.80:8081',
    'https://192.168.29.80:8081', // ✅ ADD THIS LINE
    'https://conduit-dining-deodorant.ngrok-free.dev'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/fingerprints', fingerprintRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Server Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Backend running on http://localhost:${PORT}`);
  console.log(`✓ CORS enabled for:`);
  console.log(`  - https://192.168.29.80:8081`);
  console.log(`  - https://localhost:8081`);
  console.log(`  - https://conduit-dining-deodorant.ngrok-free.dev`);
});