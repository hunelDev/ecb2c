import User from './models/User';
import Address from './models/Address';
import Admin from './models/admin/Admin';
import Category from './models/admin/Category';
import Image from './models/admin/Category';
import Product from './models/admin/Category';
import Image_Imageable from './models/admin/Image_Imageable';

//sequelize.sync()

const migrateListe = [
  User,
  Address,
  Admin,
  Category,
  Image,
  Product,
  Image_Imageable,
];

const migrate = (force: boolean, index = 0) => {
  return new Promise<boolean>((res, rej) => {
    if (migrateListe.length > index) {
      const model = migrateListe[index];
      model.sync({ force }).then((_) => {
        console.log(`${model.name} was migrated..`);
        migrate(force, ++index);
      });
      return;
    }
    if (index > 0) res(true);
    if (!index) rej('error');
  });
};

migrate(process.argv[2] !== undefined && process.argv[2] === '--force')
  .then((_) => {
    console.log('all tasks have done');
  })
  .catch((_) => {
    console.error('an error has occurred');
  });
