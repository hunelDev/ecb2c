import { Model, DataTypes } from 'sequelize';
import sequelize from '../../providers/database';

interface Image_ImageableAttributes {
  id?: number;
  imageId?: number;
  imageableId?: number;
  imageableType?: string;
}

class Image_Imageable
  extends Model<Image_ImageableAttributes>
  implements Image_ImageableAttributes
{
  declare id: number;
  declare imageId: number;
  declare imageableId: number;
  declare imageableType: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Image_Imageable.init(
  {
    imageId: {
      type: DataTypes.INTEGER,
      unique: 'tt_unique_constraint',
    },
    imageableId: {
      type: DataTypes.INTEGER,
      unique: 'tt_unique_constraint',
      references: null!,
    },
    imageableType: {
      type: DataTypes.STRING,
      unique: 'tt_unique_constraint',
    },
  },
  {
    sequelize,
    modelName: 'Image_imageable',
    tableName: 'image_imageables',
    indexes: [{ unique: true, fields: ['id'] }],
  }
);

export default Image_Imageable;
