const fs = require('fs');
const express = require('express');

function createApiRouter() {
  const apiRouter = express.Router();
  let moduleRouter;

  // synchronous to ensure all route registration before returning the router
  fs.readdirSync(__dirname).forEach((file) => {
    if (file.indexOf('.') === -1) {
      // extension does not exist -> it's a folder
      moduleRouter = require(`./${file}`).router; // eslint-disable-line global-require

      if (typeof moduleRouter === 'function') {
        // register all module router under its name
        apiRouter.use(`/${file}`, moduleRouter);
      }
    }
  });

  return apiRouter;
}

module.exports = (app) => {
  // Connect to database
  app.use(
    // All route goes under /api
    '/api',
    createApiRouter(),
  );
};
