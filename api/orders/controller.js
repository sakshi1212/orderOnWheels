const asyncMW = require('../../middleware/async');

exports.getCartItems = asyncMW(async (req, res) => {
  console.log('inside get cart items')
  console.log(DB);
  return res.status(200).send({
    data: 'okay',
  });
});

exports.checkout = asyncMW(async (req, res) => {
  console.log('inside checkout')
  try {
    return res.status(200).send({ data: 'ok' });
  } catch (err) {
    throw err;
  }
});
