const { Request, Response } = require('../../mocks/http');

module.exports = ({ request } = {}) => ({
  req: new Request(request),
  res: new Response(),
  next: jest.fn(),
});
