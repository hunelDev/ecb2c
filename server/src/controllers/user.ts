import { RequestHandler } from 'express';
import User from '../models/User';
import { createHash } from '../utils/general';

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

    const user = await User.create(
      {
        name,
        lastname,
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

const update: RequestHandler = async (req, res) => {
  try {
    const { name, lastname, birthday, phone, email } = req.body;

    if (
      name == '' ||
      lastname == '' ||
      birthday == '' ||
      email == '' ||
      phone == ''
    ) {
      throw new Error('empty input');
    }

    const user = await User.findOne({
      where: {
        id: res.locals.user.id,
        email: res.locals.user.email,
      },
    });

    if (!user) throw new Error('User No Authentication');

    const updatedUser = await user.update({
      name,
      lastname,
      birthday,
      email,
      phone,
    });

    return res.send({
      error: 0,
      result: updatedUser,
    });
  } catch (e: any) {
    res.send({
      error: 1,
      message: e.message,
    });
  }
};

const getShallow: RequestHandler = async (_, res) => {
  if (!res.locals.user) throw new Error('No Authentication');

  const { email, id } = res.locals.user;
  const user = await User.findOne({
    where: {
      email,
      id,
    },
    attributes: ['id', 'lastname', 'name', 'email'],
  });

  if (!user) throw new Error('No Authentication');

  return res.send({
    error: 0,
    result: user,
  });
};

const get: RequestHandler = async (_, res) => {
  if (!res.locals.user) throw new Error('No Authentication');

  const { email, id } = res.locals.user;
  const user = await User.findOne({
    where: {
      email,
      id,
    },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!user) throw new Error('No Authentication');

  return res.send({
    error: 0,
    result: user,
  });
};

const user = { create, getShallow, get, update };

export { user };
