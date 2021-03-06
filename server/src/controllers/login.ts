import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { join } from 'path';
import ms from 'ms';
import { createHash } from '../utils/general';
import User from '../models/User';

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == '' || password == '') throw new Error('empty input');

    const user = await User.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (!user) throw new Error('this email adress is not exists');

    if (user.password !== createHash(password))
      throw new Error('password is not correct');

    const { SESSION_COOKIE_EXP_TIME } = process.env;
    const exp = SESSION_COOKIE_EXP_TIME ?? '1d';

    const privateKey = fs.readFileSync(
      join(__dirname, '..', 'rsa', 'private.key')
    );

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      privateKey,
      {
        expiresIn: exp,
        algorithm: 'RS256',
        issuer: 'HunelGame',
      }
    );

    res.cookie('token', token, {
      secure: true,
      sameSite: true,
      maxAge: ms(exp),
    });

    const { id, name, lastname, email: userEmail } = user;

    res.send({
      error: 0,
      token,
      user: {
        id,
        name,
        lastname,
        email: userEmail,
      },
    });
  } catch (e: any) {
    res.send({
      error: 1,
      message: e.message,
    });
  }
};
