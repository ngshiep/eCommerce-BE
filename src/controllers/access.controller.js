"use strict";

const accessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const KeyTokenService = require("../services/keyToken.service");
const { verifyJWT } = require("../auth/auth.utils");
const { ForbiddenError, AuthFailureError } = require("../core/error.response");
const { findByEmail } = require("../services/shop.service");

class AccessController {
  handlerRefreshToken = async (req, res, next) => {
    new SuccessResponse({
      message: "Get tokens success",
      metadata: await accessService.handlerRefreshToken(req.body.refreshToken),
    }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({
      message: "Login success",
      metadata: await accessService.login(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout success",
      metadata: await accessService.logout({ keyStore: req.keyStore }),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new CREATED({
      message: "Register success",
      metadata: await accessService.signUp(req.body),
      option: {
        limit: 10,
      },
    }).send(res);
  };
}

module.exports = new AccessController();
