"use strict";

const STATUSCODE = {
  FORBIDDEN: 403,
  CONFLICT: 409,
};

const REASONSTATUSCODE = {
  FORBIDDEN: "Bad request error",
  CONFLICT: "Conflict error",
};

const { ReasonPhrases, StatusCodes } = require('../utils/httpStatusCode')

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

class AuthFailureError extends ErrorResponse {
  constructor( message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode)
  }
}

class NotFoundError extends ErrorResponse {
  constructor( message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
    super(message, statusCode)
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
  AuthFailureError,
  NotFoundError
};
