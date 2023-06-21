"use strict";

const accessService = require("../services/access.service");
const { OK, CREATED } = require("../core/success.response");

class AccessController {
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
