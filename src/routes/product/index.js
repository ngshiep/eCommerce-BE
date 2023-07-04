"use strict";

const express = require("express");
const productController = require("../../controllers/product.controller");
const {
  asyncHandlerError,
} = require("../../middleware/handleError.middleware");
const { authentication, authenticationV2 } = require("../../auth/auth.utils");
const router = express.Router();

// authentication
router.use(authenticationV2);
///////////////////////

router.post("", asyncHandlerError(productController.createProduct));

module.exports = router;
