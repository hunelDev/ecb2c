import { Sequelize } from 'sequelize';
import config from '../configs/database';

const sequelize = new Sequelize(config);

export default sequelize;
