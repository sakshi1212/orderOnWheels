const fs = require('fs');
const express = require('express');

function createApiRouter() {
  const apiRouter = express.Router();
  let moduleRouter;

  // synchronous to ensure all route registration before returning the router
  fs.readdirSync(__dirname).forEach((file) => {
    if (file.indexOf('.') === -1) {
      // extension does not exist, that means it's a folder
      moduleRouter = require(`./${file}`).router;

      if (typeof moduleRouter === 'function') {
        apiRouter.use(`/${file}`, moduleRouter);
      }
    }
  });

  return apiRouter;
}

module.exports = (app) => {
  app.use(
    createApiRouter(),
  );
};
