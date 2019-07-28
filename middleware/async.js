// Wrap async functions into express middleware
module.exports = asyncFunc => async (req, res, next) => {
  try {
    return await asyncFunc(req, res);
  } catch (err) {
    next(err);
  }
};
