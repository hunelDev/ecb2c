import { createHash } from 'crypto';
import { RequestHandler } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import Admin from '../../models/admin/Admin';
import Image from '../../models/admin/Image';
import { admin } from './admin';

Admin.hasMany(Image, {
  foreignKey: 'adminId',
  sourceKey: 'id',
});

const verify: RequestHandler = async (req, res, next) => {
  try {
    if (!res.locals.admin) throw new Error('No Authentication');

    const {
      CLOUNDINARY_IMAGE_EAGER: eager,
      CLOUNDINARY_API_KEY: api_key,
      CLOUNDINARY_NAME: name,
    } = process.env;
    const timestamp = Date.now();
    const api_secret = readFileSync(
      join(__dirname, '..', '..', 'secret_cloudinary.key')
    );

    let data: string;
    if (req.body.public_id) {
      data = `public_id=${
        req.body.public_id
      }&timestamp=${timestamp}${api_secret.toString('utf-8')}`;
    } else {
      data = `eager=${eager}&timestamp=${timestamp}${api_secret.toString(
        'utf-8'
      )}`;
    }

    const sha1 = createHash('sha1');
    sha1.update(data);
    const signature = sha1.digest('hex');

    res.send({
      error: 0,
      result: {
        api_key,
        name,
        eager,
        signature,
        timestamp,
      },
    });
  } catch (e: any) {
    next(e.message);
  }
};

const create: RequestHandler = async (req, res, next) => {
  try {
    if (!res.locals.admin) throw new Error('No Authentication');
    const { id, email } = res.locals.admin;

    const admin = await Admin.findOne({
      where: {
        id,
        email,
      },
    });

    if (!admin) {
      res.locals.admin = null;
      throw new Error('No Authentication');
    }
    const { id: imageId, src } = req.body;

    const image = await admin.createImage(
      {
        src,
        id: imageId,
      },
      {
        raw: true,
      }
    );
    res.send({
      error: 0,
      result: image,
    });
  } catch (e: any) {
    next(e.message);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    if (!res.locals.admin) throw new Error('No Authentication');
    if (!req.query.id) throw new Error('parameter error');

    const admin = await Admin.findOne({
      where: {
        id: res.locals.admin.id,
        email: res.locals.admin.email,
      },
    });

    if (!admin) {
      res.locals.admin = null;
      throw new Error('No Authentication');
    }

    const imagesCount = await Image.destroy({
      where: {
        id: req.query.id,
      },
    });

    if (imagesCount < 1) throw new Error('Image not exists');

    res.send({
      error: 0,
      result: imagesCount,
    });
  } catch (e: any) {
    next(e.message);
  }
};

const image = { verify, create, destroy };

export { image };
