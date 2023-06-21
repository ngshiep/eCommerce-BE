"use strict";

const STATUSCODE = {
  FORBIDDEN: 403,
  CONFLICT: 409,
};

const REASONSTATUSCODE = {
  FORBIDDEN: "Bad request error",
  CONFLICT: "Conflict error",
};

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = REASONSTATUSCODE.CONFLICT,
    statusCode = STATUSCODE.CONFLICT
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = REASONSTATUSCODE.FORBIDDEN,
    statusCode = STATUSCODE.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
};
