const asyncMW = require('../../middleware/async');

exports.index = asyncMW(async (req, res) => {
  console.log('inside orders')
  return res.status(200).send({
    data: 'okay',
  });
});

exports.create = asyncMW(async (req, res) => {
  const { origin, destination } = req.body;
  const [startLatitude, startLongtitude] = origin;
  const [destLatitude, destLongtitude] = destination;
  // TODO: validations
  // TODO: errors
  // TODO: map api to calculate distance
  const { id, distance, status } = await DB.Order.create({
    startLatitude,
    startLongtitude,
    destLatitude,
    destLongtitude,
    distance: '6586788',
    status: 'UNASSIGNED',
  });
  try {
    return res.status(200).send({ id, distance, status });
  } catch (err) {
    throw err;
  }
});

exports.update = asyncMW(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await DB.Order
    .findOne({
      where: {
        id,
      },
      rejectOnEmpty: new Error(400, `Order with id ${id} not found`),
    });
  // TODO validate status
  // TODO handle race condition
  // TODO error message
  try {
    const updatedOrder = await order.update({
      status,
    });
    return res.status(200).send({
      status: 'SUCCESS',
    });
  } catch (err) {
    throw err;
  }
});



// test cases 
// docker !!!