import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../providers/database';

interface CategoryAttributes {
  id?: number;
  uuid?: string;
  parentId?: number;
  name: string;
  slug: string;
  image?: string;
  showAtHome?: boolean;
  explanation?: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  declare id: number;
  declare uuid: string;
  declare parentId: number;
  declare name: string;
  declare slug: string;
  declare image: string;
  declare showAtHome: boolean;
  declare explanation: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Category.init(
  {
    parentId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    showAtHome: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    indexes: [{ unique: true, fields: ['id'] }],
  }
);

export default Category;
