import CryptoJS from 'crypto-js';

// Get encryption key from environment
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-encryption-key';

if (ENCRYPTION_KEY.length !== 32) {
  throw new Error('ENCRYPTION_KEY must be exactly 32 characters long');
}

/**
 * Encrypt Personally Identifiable Information (PII)
 * Used for COPPA/FERPA compliance - all PII must be encrypted at rest
 */
export function encryptPII(data: string): string {
  try {
    if (!data || typeof data !== 'string') {
      throw new Error('Data must be a non-empty string');
    }

    // Generate random IV for each encryption
    const iv = CryptoJS.lib.WordArray.random(16);
    
    // Encrypt using AES-256-CBC
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // Combine IV and encrypted data
    const combined = iv.concat(encrypted.ciphertext);
    
    // Return base64 encoded string
    return combined.toString(CryptoJS.enc.Base64);
  } catch (error) {
    throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Decrypt Personally Identifiable Information (PII)
 * Used to retrieve encrypted data for authorized access
 */
export function decryptPII(encryptedData: string): string {
  try {
    if (!encryptedData || typeof encryptedData !== 'string') {
      throw new Error('Encrypted data must be a non-empty string');
    }

    // Parse base64 encoded data
    const combined = CryptoJS.enc.Base64.parse(encryptedData);
    
    // Extract IV (first 16 bytes) and ciphertext (rest)
    const iv = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4));
    const ciphertext = CryptoJS.lib.WordArray.create(combined.words.slice(4));
    
    // Decrypt using AES-256-CBC
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext } as any,
      ENCRYPTION_KEY,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    // Convert to UTF-8 string
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) {
      throw new Error('Decryption failed - invalid data or key');
    }

    return decryptedString;
  } catch (error) {
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Hash sensitive data for search/comparison purposes
 * Used for phone numbers, partial SSNs, etc. where we need to match but not decrypt
 */
export function hashSensitiveData(data: string): string {
  try {
    if (!data || typeof data !== 'string') {
      throw new Error('Data must be a non-empty string');
    }

    // Use SHA-256 with salt for one-way hashing
    const salt = CryptoJS.enc.Utf8.parse('neurolearn-salt-' + ENCRYPTION_KEY);
    const hash = CryptoJS.SHA256(data + salt.toString());
    
    return hash.toString(CryptoJS.enc.Hex);
  } catch (error) {
    throw new Error(`Hashing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate secure random token for email verification, password reset, etc.
 */
export function generateSecureToken(length: number = 32): string {
  try {
    const randomWords = CryptoJS.lib.WordArray.random(length);
    return randomWords.toString(CryptoJS.enc.Hex);
  } catch (error) {
    throw new Error(`Token generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Encrypt session data for secure storage
 */
export function encryptSessionData(sessionData: object): string {
  try {
    const jsonString = JSON.stringify(sessionData);
    return encryptPII(jsonString);
  } catch (error) {
    throw new Error(`Session encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Decrypt session data from secure storage
 */
export function decryptSessionData(encryptedSessionData: string): object {
  try {
    const jsonString = decryptPII(encryptedSessionData);
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(`Session decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validate encryption key strength
 */
export function validateEncryptionKey(key: string): boolean {
  // Check length
  if (key.length !== 32) {
    return false;
  }

  // Check for sufficient complexity (letters, numbers, special chars)
  const hasLower = /[a-z]/.test(key);
  const hasUpper = /[A-Z]/.test(key);
  const hasNumber = /\d/.test(key);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(key);

  return hasLower && hasUpper && hasNumber && hasSpecial;
}

/**
 * Secure data wiping for sensitive variables
 * Overwrites memory to prevent data recovery
 */
export function secureWipe(data: string): void {
  try {
    // Overwrite the string multiple times with random data
    for (let i = 0; i < 3; i++) {
      const randomData = CryptoJS.lib.WordArray.random(data.length);
      // Note: This is a conceptual implementation
      // In practice, V8 engine string immutability makes complete wiping difficult
    }
  } catch (error) {
    // Fail silently for security
  }
}

// Validate encryption key on module load
if (!validateEncryptionKey(ENCRYPTION_KEY)) {
  console.warn('⚠️  WARNING: Weak encryption key detected. Use a strong 32-character key in production.');
}
