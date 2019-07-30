class Response {
  constructor({ status = 200, payload } = {}) {
    this._status = status;
    this._payload = payload;
  }

  send(payload) {
    this._payload = payload;
    return this;
  }

  status(newStatus) {
    this._status = newStatus;
    return this;
  }
}

module.exports = Response;
