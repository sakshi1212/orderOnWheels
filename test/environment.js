const NodeEnvironment = require('jest-environment-node');

// Run root path setup before requiring any files
require('./setups/appModulePath').setup();
const setupGlobal = require('./setups/global');
const sequelize = require('./setups/sequelize');

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    await sequelize.setup();
    const globalVars = await setupGlobal.setup();
    for (const [key, value] of Object.entries(globalVars)) {
      this.global[key] = value;
    }
  }

  async teardown() {
    await sequelize.teardown();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;