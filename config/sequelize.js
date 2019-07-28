const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const memoize = require('lodash/memoize');

const { Op } = Sequelize;
const initSequelize = () =>
  new Sequelize(
    'orderOnWheelsDev',
    'root',
    '123123123',
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      logging: false, 
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      operatorAlias: {
        $eq: Op.eq,
        $ne: Op.ne,
        $gte: Op.gte,
        $gt: Op.gt,
        $lte: Op.lte,
        $lt: Op.lt,
        $not: Op.not,
        $in: Op.in,
        $notIn: Op.notIn,
        $is: Op.is,
        $like: Op.like,
        $notLike: Op.notLike,
        $iLike: Op.iLike,
        $notILike: Op.notILike,
        $regexp: Op.regexp,
        $notRegexp: Op.notRegexp,
        $iRegexp: Op.iRegexp,
        $notIRegexp: Op.notIRegexp,
        $between: Op.between,
        $notBetween: Op.notBetween,
        $overlap: Op.overlap,
        $contains: Op.contains,
        $contained: Op.contained,
        $adjacent: Op.adjacent,
        $strictLeft: Op.strictLeft,
        $strictRight: Op.strictRight,
        $noExtendRight: Op.noExtendRight,
        $noExtendLeft: Op.noExtendLeft,
        $and: Op.and,
        $or: Op.or,
        $any: Op.any,
        $all: Op.all,
        $values: Op.values,
        $col: Op.col,
      },
    }
  );

const loadModels = (sequelize, modelsPath) => {
  const models = {};
  fs.readdirSync(modelsPath)
    .filter(file => file !== 'index.js')
    .forEach((file) => {
      const model = require(path.join(modelsPath, file));

      if (model && model.init && typeof model.init === 'function') {
        models[model.name] = model.init(sequelize, Sequelize);
      }
    });

  return models;
};

const associateModels = (models) => {
  Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));
};

module.exports = memoize(() => {
  console.log('Start sequelize sync...');
  const sequelize = initSequelize();

  // Load all models
  console.log('Loading sequelize models...');
  const models = loadModels(sequelize, path.join(__dirname, '../models'));

  // Associate models
  associateModels(models);
  console.log('Loaded sequelize models successfully!');

  return { models, sequelize };
});
