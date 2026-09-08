// src/routes/fingerprints.ts
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../../db/pool';

const router = express.Router();

// ============================================
// RATE LIMITING
// ============================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const rateLimit = (req: Request, res: Response, next: Function) => {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (limit && limit.resetTime > now) {
    if (limit.count > 50) {
      console.warn(`[RATE-LIMIT] Blocked IP: ${ip}`);
      return res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: Math.ceil((limit.resetTime - now) / 1000),
      });
    }
    limit.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
  }
  next();
};

// ============================================
// HTTPS ENFORCEMENT
// ============================================
const requireHTTPS = (req: Request, res: Response, next: Function) => {
  if (req.protocol !== 'https' && process.env.NODE_ENV === 'production') {
    console.warn(`[SECURITY] Non-HTTPS request from ${req.ip}`);
    return res.status(403).json({ error: 'HTTPS required' });
  }
  next();
};

// ============================================
// TYPES
// ============================================
interface FingerprintPayload {
  encryptedFingerprint: string;
  iv: string;
  timestamp: number;
  sessionId: string;
}

// ============================================
// VALIDATION HELPERS
// ============================================
function isValidBase64(str: string): boolean {
  try {
    Buffer.from(str, 'base64');
    return true;
  } catch {
    return false;
  }
}

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

// ============================================
// MAIN ENDPOINT: POST /api/fingerprints
// ============================================
router.post(
  '/',
  requireHTTPS,
  rateLimit,
  express.json({ limit: '10kb' }),
  async (req: Request, res: Response) => {
    let requestId = uuidv4();

    try {
      const payload: FingerprintPayload = req.body;

      // ===== DEBUG: Log incoming payload =====
      console.log('[FP-PAYLOAD] Received:', {
        hasEncrypted: !!payload.encryptedFingerprint,
        encryptedLength: payload.encryptedFingerprint?.length,
        hasIv: !!payload.iv,
        ivLength: payload.iv?.length,
        hasSessionId: !!payload.sessionId,
        sessionIdFormat: payload.sessionId,
      });

      // ===== VALIDATION CHECKS =====
      if (!payload.encryptedFingerprint) {
        console.warn(`[VALIDATION] Missing encryptedFingerprint - Request ${requestId}`);
        return res.status(400).json({
          error: 'Missing encryptedFingerprint field',
          requestId,
        });
      }

      if (!payload.iv) {
        console.warn(`[VALIDATION] Missing IV - Request ${requestId}`);
        return res.status(400).json({
          error: 'Missing IV field',
          requestId,
        });
      }

      if (!payload.sessionId) {
        console.warn(`[VALIDATION] Missing sessionId - Request ${requestId}`);
        return res.status(400).json({
          error: 'Missing sessionId field',
          requestId,
        });
      }

      // ===== IV LENGTH CHECK (12 bytes = 16 Base64 chars) =====
      if (payload.iv.length !== 16) {
        console.warn(`[VALIDATION] Invalid IV length: ${payload.iv.length} (expected 16) - Request ${requestId}`);
        return res.status(400).json({
          error: `Invalid IV length: ${payload.iv.length} chars (expected 16). IV must be 12 bytes.`,
          requestId,
        });
      }

      // ===== BASE64 VALIDATION =====
      if (!isValidBase64(payload.encryptedFingerprint)) {
        console.warn(`[VALIDATION] Invalid Base64 in encryptedFingerprint - Request ${requestId}`);
        return res.status(400).json({
          error: 'encryptedFingerprint is not valid Base64',
          requestId,
        });
      }

      if (!isValidBase64(payload.iv)) {
        console.warn(`[VALIDATION] Invalid Base64 in IV - Request ${requestId}`);
        return res.status(400).json({
          error: 'IV is not valid Base64',
          requestId,
        });
      }

      // ===== SESSION ID FORMAT (UUID) =====
      if (!isValidUUID(payload.sessionId)) {
        console.warn(`[VALIDATION] Invalid session ID format: "${payload.sessionId}" - Request ${requestId}`);
        return res.status(400).json({
          error: `Invalid sessionId format. Must be UUID v4. Got: "${payload.sessionId}"`,
          requestId,
        });
      }

      // ===== STORE OR UPDATE IN DATABASE =====
const recordId = uuidv4();
const clientIp = req.ip || null;

const encryptedBuffer = Buffer.from(payload.encryptedFingerprint, 'base64');
const ivBuffer = Buffer.from(payload.iv, 'base64');

// ✅ UPSERT: Insert new or update existing session_id
const query = `
  INSERT INTO browser_fingerprints 
  (id, session_id, encrypted_blob, iv, client_ip, stored_at, status)
  VALUES ($1, $2, $3, $4, $5, NOW(), 'active')
  ON CONFLICT (session_id) 
  DO UPDATE SET
    encrypted_blob = $3,
    iv = $4,
    client_ip = $5,
    stored_at = NOW(),
    status = 'active'
  RETURNING id, stored_at;
`;

const result = await pool.query(query, [
  recordId,
  payload.sessionId,
  encryptedBuffer,
  ivBuffer,
  clientIp,
]);

console.log(
  `[FP-STORED] ✓ ID: ${recordId} | Session: ${payload.sessionId} | IP: ${clientIp} | Stored: ${result.rows[0].stored_at}`
);

return res.status(201).json({
  success: true,
  id: recordId,
  message: 'Fingerprint stored securely',
});

      // ===== SUCCESS LOG =====
      console.log(
        `[FP-STORED] ✓ ID: ${recordId} | Session: ${payload.sessionId} | IP: ${clientIp} | Stored: ${result.rows[0].stored_at}`
      );

      return res.status(201).json({
        success: true,
        id: recordId,
        message: 'Fingerprint stored securely',
      });
    } catch (error) {
      console.error('[FP-ERROR] Full error:', error);

      if (error instanceof Error) {
        console.error('[FP-ERROR] Message:', error.message);
        console.error('[FP-ERROR] Stack:', error.stack);
      }

      return res.status(500).json({
        success: false,
        error: 'Storage failed',
        requestId,
      });
    }
  }
);

// ============================================
// HEALTH CHECK: GET /api/fingerprints/health
// ============================================
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Fingerprint API is running',
  });
});

export default router;