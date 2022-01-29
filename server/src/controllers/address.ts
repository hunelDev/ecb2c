import { RequestHandler } from 'express';
import User from '../models/User';
import Address from '../models/Address';

User.hasMany(Address, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

const create: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      lastname,
      areaCode,
      phone,
      country,
      city,
      district,
      address,
    } = req.body;
    if (
      name == '' ||
      lastname == '' ||
      areaCode == '' ||
      phone == '' ||
      country == '' ||
      address == ''
    )
      throw new Error('empty input');

    const { id, email } = res.locals.user;
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (user == null) throw new Error('token error');

    const fullName = `${name} ${lastname}`;
    const phoneNumber = areaCode + phone;

    const createdAddress = await user.createAddress({
      address,
      country,
      name: fullName,
      phone: phoneNumber,
      city,
      district,
    });

    res.send({
      error: 0,
      result: createdAddress,
    });
  } catch (e: any) {
    res.send({
      error: 1,
      message: e.message,
    });
  }
};

const address = { create };

export { address };
