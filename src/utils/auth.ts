import jwt, { JwtPayload } from 'jsonwebtoken';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';

import { destroyCookie, parseCookies } from './cookies';

export const KEYCLOAK_PUBLIC_CONFIG = {
  realm: String(process.env.NEXT_PUBLIC_KEYCLOAK_REALM),
  url: String(process.env.NEXT_PUBLIC_KEYCLOAK_URL),
  clientId: String(process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID),
};

export type Payload = KeycloakTokenParsed &
  KeycloakProfile & { subdomain: string };

export type Token = { token: string; payload: Payload };

type Request = { headers: { cookie?: any } };

export function validateAuth(req?: Request): Token | boolean {
  const cookies = parseCookies(req);
  if (!cookies.kcToken) {
    return false;
  }
  const token = Buffer.from(cookies.kcToken, 'base64').toString('utf8');
  const payloadOrFalse = verifyToken(token, process.env.JWT_SECRET as string);
  return payloadOrFalse
    ? ({ token, payload: payloadOrFalse } as any)
    : payloadOrFalse;
}

export function verifyToken(token: string, key: string): JwtPayload | false {
  try {
    return jwt.verify(token, key, { ignoreExpiration: false }) as JwtPayload;
  } catch (e) {
    console.error(e, token, key);
    return false;
  }
}

export function createAuthCookies() {
  destroyCookie('kcToken');
  destroyCookie('kcIdToken');
}
