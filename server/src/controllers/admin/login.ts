import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { join } from 'path';
import ms from 'ms';
import { createHash } from '../../utils/general';
import Admin from '../../models/admin/Admin';

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == '' || password == '') throw new Error('empty input');

    const admin = await Admin.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (!admin) throw new Error('this email adress is not exists');

    if (admin.password !== createHash(password))
      throw new Error('password is not correct');

    const { SESSION_COOKIE_EXP_TIME } = process.env;
    const exp = SESSION_COOKIE_EXP_TIME ?? '1d';

    const privateKey = fs.readFileSync(
      join(__dirname, '..', '..', 'rsa', 'private.key')
    );

    const token = jwt.sign(
      {
        id: admin.id,
        email,
      },
      privateKey,
      {
        expiresIn: exp,
        algorithm: 'RS256',
        issuer: 'HunelGame',
      }
    );

    res.cookie('hToken', token, {
      secure: true,
      sameSite: true,
      maxAge: ms(exp),
    });

    const { id, name, lastname, email: adminEmail } = admin;

    res.send({
      error: 0,
      token,
      admin: {
        id,
        name,
        lastname,
        email: adminEmail,
      },
    });
  } catch (e: any) {
    res.send({
      error: 1,
      message: e.message,
    });
  }
};
