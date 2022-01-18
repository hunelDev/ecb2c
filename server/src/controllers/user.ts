import { RequestHandler } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import { createHash, veryToken } from '../utils/general';

const create: RequestHandler = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    if (name == '' || lastname == '' || password == '' || email == '') {
      throw new Error('empty input');
    }

    const userCount = await User.count({
      where: {
        email,
      },
    });

    if (userCount > 0) {
      throw new Error('this email address is already exists');
    }

    const fullName = `${name} ${lastname}`;

    const user = await User.create(
      {
        name: fullName,
        email,
        password: createHash(password),
      },
      {
        raw: true,
        validate: true,
      }
    );

    res.send(user);
  } catch (e: any) {
    res.send({
      error: 1,
      message: e.message,
    });
  }
};

const getShallow: RequestHandler = async (req, res) => {
  const { id, email } = veryToken(req.cookies.token) as JwtPayload;

  const user = await User.findOne({
    where: {
      email,
      id,
    },
    attributes: ['id', 'name', 'email'],
  });
  return res.send(user);
};

const user = { create, getShallow };

export { user };
