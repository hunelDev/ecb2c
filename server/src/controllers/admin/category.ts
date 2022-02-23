import { RequestHandler } from 'express';
import { Op } from 'sequelize';
import Category from '../../models/admin/Category';
import { slug } from '../../utils/general';

const create: RequestHandler = async (req, res) => {
  try {
    if (!res.locals.admin) throw new Error('No Authentication');
    const { name, parentId, showAtHome } = req.body;
    const category = await Category.create({
      name,
      parentId,
      showAtHome,
      slug: slug(name),
    });

    res.send({
      error: 0,
      result: category,
    });
  } catch (e: any) {
    res.send({
      error: 1,
      message: e.message,
    });
  }
};

const getAll: RequestHandler = async (req, res) => {
  try {
    const { id: cid } = req.params;
    let categories;
    if (cid) {
      categories = await Category.findAll({
        where: {
          id: {
            [Op.not]: cid as string,
          },
        },
        raw: true,
      });
    } else {
      categories = await Category.findAll({
        raw: true,
      });
    }
    res.send({
      error: 0,
      result: categories,
    });
  } catch (e: any) {
    res.send({
      error: 1,
      message: e.message,
    });
  }
};

const category = { getAll, create };

export { category };
