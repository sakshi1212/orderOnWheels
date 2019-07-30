class Request {
  constructor({
    headers = {},
    query = {},
    params = {},
    body = {},
    ...rest
  } = {}) {
    this.headers = headers;
    this.query = query;
    this.params = params;
    this.body = body;

    Object.assign(this, rest);
  }
}

module.exports = Request;
