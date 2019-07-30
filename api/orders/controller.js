const asyncMW = require('../../middleware/async');
const { formatCoordinates, getGoogleMapsDistance } = require('../../service/googleMapsApi');
const { getPagination } = require('../../utils/sequelize/query');
const { validateCoordinate, validateLimit, validatePage } = require('../../utils/validations');

exports.index = asyncMW(async (req, res) => {
  console.log('===== inside index');
  const { page, limit } = req.query;
  console.log(page, limit);
  await validatePage(page);
  await validateLimit(limit);

  const orders = await DB.Order.findAll({ 
    attributes: ['id', 'distance', 'status'],
    ...getPagination(page, limit),
  });
  console.log(orders);
  return res.status(200).send(orders);
});

exports.create = asyncMW(async (req, res) => {
  const { origin, destination } = req.body;
  await validateCoordinate(origin);
  await validateCoordinate(destination);
  const [startLatitude, startLongtitude] = origin;
  const [destLatitude, destLongtitude] = destination;
  const formattedStartCoordinates = formatCoordinates(startLatitude, startLongtitude);
  const formattedEndCoordinates = formatCoordinates(destLatitude, destLongtitude);
  const computedDistance = await getGoogleMapsDistance(formattedStartCoordinates, formattedEndCoordinates);
  if (!computedDistance) {
    throw new HttpError(404, 'Unable to calculate Distance');
  }
  try {
  const { id, distance, status } = await DB.Order.create({
    startLatitude,
    startLongtitude,
    destLatitude,
    destLongtitude,
    distance: computedDistance,
    status: 'UNASSIGNED',
  });
    return res.status(200).send({ id, distance, status });
  } catch (err) {
    throw new HttpError(500, err.message);
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
  if(order.status === 'TAKEN') {
    throw new HttpError(400, 'Order is already taken');
  }
  // TODO: race condition check -> transaction and lock
  try {
    const updatedOrder = await order.update({
      status,
    });
    return res.status(200).send({
      status: 'SUCCESS',
    });
  } catch (err) {
    throw new HttpError(500, err.message);
  }
});
