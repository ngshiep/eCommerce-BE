"use strict";

const express = require("express");
const productController = require("../../controllers/product.controller");
const {
  asyncHandlerError,
} = require("../../middleware/handleError.middleware");
const { authentication } = require("../../auth/auth.utils");
const router = express.Router();

// authentication
router.use(authentication);
///////////////////////

router.post("", asyncHandlerError(productController.createProduct));

module.exports = router;
