const sum = require('./sum');
const controller = require('./controller');
const mockHttp = require('../../test/utils/http/mock');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('API: Order: controller', () => {
  // let userFromFactory;
  // let partnerFromFactory;
  // let productFromFactory;

  // beforeEach(async done => {
  //   await sequelize.sync({ force: true });
  //   partnerFromFactory = await PartnerFactory.create();
  //   userFromFactory = await UserFactory.create({
  //     partnerId: partnerFromFactory.id,
  //   });
  //   productFromFactory = await ProductFactory.create({
  //     partnerId: partnerFromFactory.id,
  //   });

  //   done();
  // });

  describe('index()', () => {
    test('returns all orders', async () => {
      const { req, res, next } = mockHttp({
        request: {
          query: {
            page: 1,
            limit: 5,
          },
        },
      });
      const response = await controller.index(req, res, next);
      console.log(response);
      expect(response).toHaveLength(1);
      // expect(products[0]).toEqual(productFromFactory.toJSON());
    });
  });
});
