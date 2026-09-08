// src/hooks/useSessionFingerprint.ts
import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { encryptFingerprint } from '@/utils/secureFingerprint';

interface FingerprintData {
  userAgent: string;
  platform: string;
  language: string;
  screenDimensions: string;
  timezone: string;
  hardwareConcurrency: number;
  cookieEnabled: boolean;
  publicIp: string;
  timestamp: number;
}

export function useSessionFingerprint(enableDebug = false) {
  const [sessionId] = useState(() => {
    const existing = sessionStorage.getItem('__fp_sid');
    if (existing) return existing;
    const newId = uuidv4();
    sessionStorage.setItem('__fp_sid', newId);
    return newId;
  });

  const [sent, setSent] = useState(false);
  const hasAttempted = useRef(false);

  useEffect(() => {
    if (hasAttempted.current || sent) return;
    hasAttempted.current = true;

    const sendFP = async () => {
      try {
        const ip = await getPublicIp();
    console.log("Public IP:", ip);
        const fp: FingerprintData = {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language,
          screenDimensions: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          hardwareConcurrency: navigator.hardwareConcurrency,
          cookieEnabled: navigator.cookieEnabled,
          publicIp: await getPublicIp(),
          timestamp: Date.now(),
        };

        if (enableDebug) console.log('[FP-DATA]', fp);

        const encrypted = await encryptFingerprint(fp, sessionId);

        
        const apiUrl = import.meta.env.VITE_API_URL || 'https://conduit-dining-deodorant.ngrok-free.dev';

        const res = await fetch(`${apiUrl}/api/fingerprints`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(encrypted),
          credentials: 'same-origin',
        });

        if (res.ok) {
          setSent(true);
          if (enableDebug) console.log('[FP-SENT] ✓');
        } else {
          const errorData = await res.json().catch(() => ({}));
          handleFPError(res.status, errorData);
        }
      } catch (error) {
        handleFPError(0, error);
      }
    };

    const timer = setTimeout(sendFP, 150);
    return () => clearTimeout(timer);
  }, [sessionId, sent, enableDebug]);

  return { sessionId, sent };
}

async function getPublicIp(): Promise<string> {
  try {
    const res = await Promise.race<Response>([
      fetch('https://api.ipify.org?format=json'),
      new Promise<Response>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 3000)
      ),
    ]);

    const data = await res.json();
    return data.ip || 'unknown';
  } catch {
    return 'unavailable';
  }
}

function handleFPError(status: number, errorData?: any) {
  const messages: Record<number, string> = {
    0: 'Network error',
    400: 'Invalid data',
    429: 'Rate limited',
    500: 'Server error',
  };

  const errorMsg = errorData?.error || messages[status] || `Status ${status}`;
  console.warn(`[FP-ERROR] ${errorMsg}`, errorData);

  if (status === 0) {
    sessionStorage.setItem('__fp_api_down', 'true');
  }
}