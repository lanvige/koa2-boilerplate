// the db conn config
import Sequelize from 'sequelize';
import dbConfig from '../config/database.json';

const database = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
  },
  timezone: '+08:00',
});

export default database;
