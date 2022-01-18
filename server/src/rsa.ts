import { generateKeyPairSync } from 'crypto';
import fs from 'fs';
import path from 'path';

function generateRSA(dir = 'rsa') {
  const dirname = path.join(__dirname, dir);
  if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);

  const pair = generateKeyPairSync('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  fs.writeFile(
    path.join(dirname, 'public.pem'),
    pair.publicKey,
    {
      flag: 'w',
    },
    (err) => {
      if (err) console.log(err.message);
    }
  );

  fs.writeFile(
    path.join(dirname, 'private.key'),
    pair.privateKey,
    {
      flag: 'w',
    },
    (err) => {
      if (err) console.log(err.message);
    }
  );
}

generateRSA();
