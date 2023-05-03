require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_DIALECT} = process.env;
const sqlizeConfig = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: DB_DIALECT
};

// sequelize-cli only understands module.exports
module.exports = {
  development: sqlizeConfig,
  test: sqlizeConfig,
  production: sqlizeConfig,
};
