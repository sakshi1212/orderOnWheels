const sum = require('./sum');
const controller = require('./controller');
const mockHttp = require('../../test/utils/http/mock');


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
