/**
 * Google authentication utilities for service account authentication
 */

import * as crypto from 'crypto';

export interface GoogleCredentials {
  private_key: string;
  client_email: string;
  private_key_id: string;
  [key: string]: any;
}

/**
 * Generate a signed JWT for Google service account authentication
 */
export async function generateJWT(credentials: GoogleCredentials, scope: string): Promise<string> {
  if (!credentials.private_key || !credentials.client_email) {
    throw new Error('Invalid credentials: missing private_key or client_email');
  }

  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600; // 1 hour

  const header = {
    alg: 'RS256',
    typ: 'JWT',
    kid: credentials.private_key_id
  };

  const payload = {
    iss: credentials.client_email,
    scope: scope,
    aud: 'https://oauth2.googleapis.com/token',
    exp: expiry,
    iat: now
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  // Sign with the private key using RS256
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  signer.end();
  
  // Need to replace newlines in private key if they're literal '\n'
  const privateKey = credentials.private_key.replace(/\\n/g, '\n');
  const signature = signer.sign(privateKey, 'base64url');

  // Return the complete JWT
  return `${signatureInput}.${signature}`;
}

/**
 * Get an access token using service account credentials
 */
export async function getGoogleAccessToken(credentials: GoogleCredentials, scope: string): Promise<string> {
  try {
    const jwt = await generateJWT(credentials, scope);
    
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Google access token:', error);
    throw error;
  }
} 