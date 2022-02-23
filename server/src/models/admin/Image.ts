import {
  Optional,
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
} from 'sequelize';
import sequelize from '../../providers/database';
import Admin from './Admin';

interface ImageAttributes {
  id?: string;
  src: string;
  adminId: number;
}

interface ImageCreationAttributes
  extends Optional<ImageAttributes, 'adminId'> {}

class Image
  extends Model<ImageAttributes, ImageCreationAttributes>
  implements ImageAttributes
{
  declare id: string;
  declare src: string;
  declare adminId: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare getAdmin: BelongsToGetAssociationMixin<Admin>;

  declare admin?: Admin;
  declare static associations: {
    admin: Association<Image, Admin>;
  };
}

Image.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
      },
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
    indexes: [{ unique: true, fields: ['id'] }],
  }
);

export default Image;
