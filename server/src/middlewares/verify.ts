import { RequestHandler } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { veryToken } from '../utils/general';

const verify: RequestHandler = (req, res, next) => {
  const Authentication = req.get('Authentication');
  if (!Authentication) throw new Error('No Authentication');

  const token = Authentication!.slice(7);
  if (!token) throw new Error('token empty');

  const result = veryToken(token);
  if (!result) {
    res.clearCookie('token');
    res.locals.user = null;
    throw new Error('invalid token');
  }

  const { id, email } = result as JwtPayload;
  res.locals.user = { id, email };

  next();
};

export default verify;
