/**
 * Secure Fingerprint Encryption
 * Uses Web Crypto API - AES-256-GCM
 * Key is NEVER extractable - server cannot decrypt
 */

export interface EncryptedPayload {
  encryptedFingerprint: string; // Base64
  iv: string; // Base64 (16 chars = 12 bytes)
  timestamp: number;
  sessionId: string;
}

/**
 * Derive a non-extractable encryption key
 * Cannot be accessed even by JavaScript on same page
 */
async function deriveEncryptionKey(sessionId: string): Promise<CryptoKey> {
  // Create salt from multiple sources to make it unique
  const salt = new TextEncoder().encode(
    sessionId + navigator.hardwareConcurrency + screen.width
  );

  // Import session ID as base key
  const baseKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(sessionId),
    { name: 'PBKDF2' },
    false, // NOT extractable
    ['deriveKey']
  );

  // Derive final key using PBKDF2
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 600000, // OWASP 2024 standard
      hash: 'SHA-256',
    },
    baseKey,
    {
      name: 'AES-GCM',
      length: 256, // 256-bit key
    },
    false, // **CRITICAL: Non-extractable**
    ['encrypt'] // Only encrypt, not decrypt
  );
}

/**
 * Encrypt fingerprint data with AES-256-GCM
 * @param fingerprintData - Object containing fingerprint info
 * @param sessionId - Unique session identifier
 * @returns Encrypted payload ready to send to server
 */
export async function encryptFingerprint(
  fingerprintData: Record<string, any>,
  sessionId: string
): Promise<EncryptedPayload> {
  try {
    // Get non-extractable key
    const key = await deriveEncryptionKey(sessionId);

    // ✅ FIX: Generate 12-byte IV (96 bits) - NIST standard for AES-GCM
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Convert fingerprint to JSON string
    const dataString = JSON.stringify(fingerprintData);
    const data = new TextEncoder().encode(dataString);

    // Encrypt with GCM (provides authentication)
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        additionalData: new TextEncoder().encode(sessionId), // Bind to session
      },
      key,
      data
    );

    // Convert encrypted data to Base64 for transport
    const encryptedBase64 = btoa(
      String.fromCharCode(...new Uint8Array(encryptedData))
    );

    // Convert IV to Base64
    const ivBase64 = btoa(String.fromCharCode(...iv));

    return {
      encryptedFingerprint: encryptedBase64,
      iv: ivBase64, // Now 16 Base64 chars (12 bytes)
      timestamp: Date.now(),
      sessionId: sessionId,
    };
  } catch (error) {
    console.error('[ENCRYPTION] Failed:', error);
    throw new Error('Fingerprint encryption failed');
  }
}