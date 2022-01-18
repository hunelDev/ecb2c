import { Options } from 'sequelize';

const config: Options = {
  host: 'localhost',
  database: 'hunel',
  username: 'hunel',
  password: 'hunel',
  dialect: 'postgres',
  port: 5432,
  logging: false,
  dialectOptions: {
    dateString: true,
    typeCast: true,
  },
  timezone: '+03:00',
};

export default config;
