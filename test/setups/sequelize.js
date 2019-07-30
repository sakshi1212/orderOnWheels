const setupSequelize = require('../../config/sequelize');

let sequelize;

const loadModels = () => {
  ({ sequelize } = setupSequelize());
  return sequelize.sync();
};

const teardown = () => {};

module.exports = {
  setup: loadModels,
  teardown,
};
