const path = require('path');

const init = () => {
  require('app-module-path').addPath(path.join(__dirname, '../../'));
};

module.exports = init;
