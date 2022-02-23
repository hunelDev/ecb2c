import { Model, DataTypes } from 'sequelize';
import sequelize from '../../providers/database';
import Category from './Category';

enum CurrencyType {
  tl,
  dolar,
  euro,
}

interface ProductAttributes {
  id?: number;
  uuid?: string;
  title: string;
  categoryId: number;
  price: number;
  discountPrice?: number;
  currencyType?: CurrencyType;
  isOpportunity?: boolean;
  OpportunityExpAt?: Date;
  slug: string;
  images?: string;
  explanation?: string;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  declare id?: number;
  declare uuid?: string;
  declare title: string;
  declare categoryId: number;
  declare price: number;
  declare discountPrice?: number;
  declare currencyType?: CurrencyType;
  declare isOpportunity?: boolean;
  declare OpportunityExpAt?: Date;
  declare slug: string;
  declare images?: string;
  declare explanation?: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Product.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'id',
      },
    },
    price: {
      type: DataTypes.REAL,
      validate: {
        isFloat: true,
      },
    },
    discountPrice: {
      type: DataTypes.REAL,
      allowNull: true,
      validate: {
        isFloat: true,
      },
    },
    currencyType: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
    isOpportunity: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    OpportunityExpAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    indexes: [{ unique: true, fields: ['id'] }],
  }
);

export default Product;
