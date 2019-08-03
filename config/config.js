const { mysql } = require('../config/environment');

let config = {
  development: {
    username: "root",
    password: "123123123",
    database: "orderOnWheelsDev",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: mysql.username,
    password: mysql.password,
    database: mysql.name,
    host: mysql.host,
    dialect: "mysql"
  },
  production: {
    username: mysql.username,
    password: mysql.password,
    database: mysql.name,
    host: mysql.host,
    dialect: "mysql",
  }
};

// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  config = config.development;
} else if (process.env.NODE_ENV === 'test') {
  config = config.test;
} else if (process.env.NODE_ENV === 'production') {
  config = config.production;
} else {
  config = config.local;
}


console.log(`Running sequelize-cli on ${process.env.NODE_ENV} on host: ${config.host}`);

module.exports = {
  ...config,
};