import { randomBytes } from 'crypto';
import fs from 'fs';
import { join } from 'path';

const filePath = join(__dirname, 'secret.key');
const opt = process.argv[2] ?? '--size';
const size = parseInt(process.argv[3]) ?? 100;

function generateSalt() {
  try {
    if (opt !== '--size' || isNaN(size)) {
      console.info('usage: --size 100');
      return;
    }

    if (fs.existsSync(filePath)) {
      console.warn('secret.key is exists, it is too dangerous!!');
      return;
    }
    const salt = randomBytes(Math.ceil(size / 2)).toString('hex');

    fs.writeFileSync(filePath, salt, {
      flag: 'w',
    });
  } catch (e) {
    console.error(e);
  }
}

generateSalt();
