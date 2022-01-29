import { RequestHandler } from 'express';
import Admin from '../../models/admin/Admin';
import { createHash } from '../../utils/general';

const create: RequestHandler = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    if (name == '' || lastname == '' || password == '' || email == '') {
      throw new Error('empty input');
    }

    const adminCount = await Admin.count({
      where: {
        email,
      },
    });

    if (adminCount > 0) {
      throw new Error('this email address is already exists');
    }

    const admin = await Admin.create(
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

    res.send(admin);
  } catch (e: any) {
    res.send({
      error: 1,
      message: e.message,
    });
  }
};

const admin = { create };

export { admin };
