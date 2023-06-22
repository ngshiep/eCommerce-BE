"use strict";

const accessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse } = require("../core/success.response");

class AccessController {
  login = async (req, res, next) => {
    new SuccessResponse({
      message: "Login success",
      metadata: await accessService.login(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout success",
      metadata: await accessService.logout({keyStore: req.keyStore}),
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
