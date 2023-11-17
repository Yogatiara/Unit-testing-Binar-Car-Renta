const {
  DB_USER = '',
  DB_PASSWORD = '',
  DB_NAME = 'bcr',
  DB_HOST = '127.0.0.1',
  DB_PORT = '5432',
  RAILWAY_DB_USER,
  RAILWAY_DB_PASSWORD,
  RAILWAY_DB_HOST,
  RAILWAY_DB_PORT,
  RAILWAY_DB_NAME
} = process.env;

// process.env.development = local
// process.env.test = local (tp utk test => jadi DB nya khusus test)
// process.env.production = server => setelah di deploy

module.exports = {
  development: {
    username: RAILWAY_DB_USER,
    password: RAILWAY_DB_PASSWORD,
    database: RAILWAY_DB_NAME,
    host: RAILWAY_DB_HOST,
    port: RAILWAY_DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_production`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
  },
};
