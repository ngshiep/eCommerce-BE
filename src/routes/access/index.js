"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const {
  asyncHandlerError,
} = require("../../middleware/handleError.middleware");
const { authentication, authenticationV2 } = require("../../auth/auth.utils");
const router = express.Router();

//sign up
router.post("/shop/signup", asyncHandlerError(accessController.signUp));
router.post("/shop/login", asyncHandlerError(accessController.login));

// authentication
router.use(authenticationV2);
///////////////////////
router.post("/shop/logout", asyncHandlerError(accessController.logout));
router.post(
  "/shop/handlerRefreshToken",
  asyncHandlerError(accessController.handlerRefreshToken)
);

module.exports = router;
