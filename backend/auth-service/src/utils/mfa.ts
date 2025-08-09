import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { logger } from './logger';

/**
 * Multi-Factor Authentication utilities for NeuroLearn
 * Required for teachers, therapists, and admin roles
 */

/**
 * Generate MFA secret for a user
 */
export function generateMFASecret(email: string): {
  secret: string;
  qrCodeUrl: string;
  manualEntryKey: string;
} {
  try {
    const secret = speakeasy.generateSecret({
      name: `NeuroLearn (${email})`,
      issuer: 'NeuroLearn',
      length: 32
    });

    return {
      secret: secret.base32!,
      qrCodeUrl: secret.otpauth_url!,
      manualEntryKey: secret.base32!
    };
  } catch (error) {
    logger.error('MFA secret generation failed', { error, email });
    throw new Error('Failed to generate MFA secret');
  }
}

/**
 * Generate QR code data URL for MFA setup
 */
export async function generateQRCode(otpauthUrl: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: 256
    });

    return qrCodeDataUrl;
  } catch (error) {
    logger.error('QR code generation failed', { error });
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Verify MFA token
 */
export function verifyMFAToken(secret: string, token: string): boolean {
  try {
    if (!secret || !token) {
      return false;
    }

    // Remove any spaces from token
    const cleanToken = token.replace(/\s+/g, '');

    // Verify the token with a window of ±1 (30 seconds before/after)
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: cleanToken,
      window: 1, // Allow 1 step before/after for clock drift
      step: 30 // 30-second time step
    });

    return verified;
  } catch (error) {
    logger.error('MFA token verification failed', { error });
    return false;
  }
}

/**
 * Generate backup codes for MFA recovery
 */
export function generateBackupCodes(count: number = 10): string[] {
  try {
    const backupCodes: string[] = [];
    
    for (let i = 0; i < count; i++) {
      // Generate 8-character alphanumeric codes
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      backupCodes.push(code);
    }

    return backupCodes;
  } catch (error) {
    logger.error('Backup codes generation failed', { error });
    throw new Error('Failed to generate backup codes');
  }
}

/**
 * Verify backup code
 */
export function verifyBackupCode(
  storedCodes: string[], 
  providedCode: string
): { isValid: boolean; remainingCodes: string[] } {
  try {
    const cleanProvidedCode = providedCode.replace(/\s+/g, '').toUpperCase();
    const codeIndex = storedCodes.findIndex(code => code === cleanProvidedCode);
    
    if (codeIndex === -1) {
      return { isValid: false, remainingCodes: storedCodes };
    }

    // Remove the used backup code
    const remainingCodes = storedCodes.filter((_, index) => index !== codeIndex);
    
    return { isValid: true, remainingCodes };
  } catch (error) {
    logger.error('Backup code verification failed', { error });
    return { isValid: false, remainingCodes: storedCodes };
  }
}

/**
 * Check if MFA is required for a given role
 */
export function isMFARequired(role: string): boolean {
  const mfaRequiredRoles = ['teacher', 'therapist', 'admin'];
  return mfaRequiredRoles.includes(role);
}

/**
 * Validate MFA setup requirements
 */
export function validateMFASetup(secret: string, verificationToken: string): boolean {
  if (!secret || !verificationToken) {
    return false;
  }

  // Verify that the user can generate valid tokens with their secret
  return verifyMFAToken(secret, verificationToken);
}

/**
 * Generate time-based token for testing (development only)
 */
export function generateCurrentToken(secret: string): string {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Token generation is not allowed in production');
  }

  try {
    const token = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
      step: 30
    });

    return token;
  } catch (error) {
    logger.error('Test token generation failed', { error });
    throw new Error('Failed to generate test token');
  }
}
