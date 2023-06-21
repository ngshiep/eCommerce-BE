"use strict";

const STATUSCODE = {
  OK: 200,
  CREATE: 201,
};

const REASONSTATUSCODE = {
  OK: "Success",
  CREATE: "Create!",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = STATUSCODE.OK,
    reasonStatusCode = REASONSTATUSCODE.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, header = {}) {
    return res.status( this.status ).json( this )
  }
}

class OK extends SuccessResponse {
  constructor({ message, statusCode = STATUSCODE.OK, metadata }) {
    super({ message, metadata })
  }
}

class CREATED extends SuccessResponse {
  constructor({ message, statusCode = STATUSCODE.CREATE, reasonStatusCode = REASONSTATUSCODE.CREATE,  metadata, option={} }) {
    super({ message, statusCode, reasonStatusCode, metadata })
    this.option = option;
  }
}

module.exports = {
  OK,
  CREATED,
  SuccessResponse
};
