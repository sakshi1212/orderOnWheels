const isObject = require('lodash/isObject');
const isInteger = require('lodash/isInteger');
const controller = require('./controller');
const mockHttp = require('../../test/utils/http/mock');

let newOrderId;

describe('API: Order: Create', () => {
  test('create a order in DB', async (done) => {
    const { req, res, next } = mockHttp({
      request: {
        body: {
          "origin": ["22.279800", "114.183940"],
          "destination": ["22.279680", "114.171690"]
        }
      },
    });
    const { _status, _payload } = await controller.create(req, res, next);
    const { id, distance, status } = _payload;

    newOrderId = id;

    expect(_status).toBe(200);
    expect(isObject(_payload)).toBe(true);
    expect(isInteger(id)).toBe(true);
    expect(distance).toBe(2051);
    expect(status).toBe('UNASSIGNED');

    done();
  });

  test('create a order in DB with no missing origin', async (done) => {
    const { req, res, next } = mockHttp({
      request: {
        body: {
          "destination": ["22.279680", "114.171690"]
        }
      },
    });
    await controller.create(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0].status).toBe(400);

    done();
  });

  test('create a order in DB with no values in parameter', async (done) => {
    const { req, res, next } = mockHttp({
      request: {
        body: {
          "origin": [],
          "destination": ["22.279680", "114.171690"]
        }
      },
    });
    await controller.create(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0].status).toBe(400);

    done();
  });

  test('create a order in DB with wrong origin array length', async (done) => {
    const { req, res, next } = mockHttp({
      request: {
        body: {
          "origin": ["22.279800"],
          "destination": ["22.279680", "114.171690"]
        }
      },
    });
    await controller.create(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0].status).toBe(400);

    done();
  });

  test('create a order in DB with wrong parameter type', async (done) => {
    const { req, res, next } = mockHttp({
      request: {
        body: {
          "origin": [22.2, 114.1],
          "destination": ["22.279680", "114.171690"]
        }
      },
    });
    await controller.create(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0].status).toBe(400);

    done();
  });
});

describe('API: Order: List', () => {
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
    const [firstOrder] = _payload;
    expect(isObject(firstOrder)).toBe(true);
    const { id, status, distance } = firstOrder;
    expect(id).toBeDefined();
    expect(status).toBeDefined();
    expect(distance).toBeDefined();
    done();
  });
});

describe('API: Order: Update', () => {
  test('updates order in DB', async (done) => {
    const { req, res, next } = mockHttp({
      request: {
        params: {
          id: newOrderId,
        },
        body: {
          status: "TAKEN",
        },
      },
    });
    const { _payload, _status } = await controller.update(req, res, next);
    expect(_status).toBe(200);
    expect(isObject(_payload)).toBe(true);
    const { status: payloadStatus } = _payload;
    expect(payloadStatus).toBe("SUCCESS");
    done();
  });

  test('updates same order in DB', async (done) => {
    const { req, res, next } = mockHttp({
      request: {
        params: {
          id: newOrderId,
        },
        body: {
          status: "TAKEN",
        },
      },
    });
    await controller.update(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls[0][0].status).toBe(400);
    done();
  });
});
