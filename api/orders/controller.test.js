const sum = require('./sum');
const controller = require('./controller');
const mockHttp = require('../../test/utils/http/mock');


describe('API: Order: controller', () => {
  describe('create()', () => {
    test('create a order in DB', async (done) => {
      const { req, res, next } = mockHttp({
        request: {
          body: {
            "origin": ["22.279800", "114.183940"],
            "destination": ["22.279680", "114.171690"]
          }
        },
      });
      const data = await controller.create(req, res, next);
      console.log('==================', data);
      expect(Array.isArray(_payload)).toBe(true);
      done();
    });
  });
});


describe('API: Order: controller', () => {
  describe('index()', () => {
    test('returns all orders before any order exists in DB', async (done) => {
      const { req, res, next } = mockHttp({
        request: {
          query: {
            page: 1,
            limit: 5,
          },
        },
      });
      const { _payload } = await controller.index(req, res, next);
      expect(Array.isArray(_payload)).toBe(true);
      done();
    });
  });
});
