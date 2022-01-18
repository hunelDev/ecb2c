import { createHmac } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export function createHash(softData: string) {
  const filePath = join(__dirname, '..', 'secret.key');
  if (!existsSync(filePath)) throw Error('you must generate a secret.key');

  const secretKey = readFileSync(filePath);
  const hmac = createHmac('SHA256', secretKey);
  hmac.update(softData);
  const result = hmac.digest();

  return result.toString('hex');
}

export function veryToken(token: string) {
  try {
    const publicKey = fs.readFileSync(
      join(__dirname, '..', 'rsa', 'public.pem')
    );
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    return decoded;
  } catch (e) {
    return false;
  }
}
