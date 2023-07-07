"use strict";

const express = require("express");
const productController = require("../../controllers/product.controller");
const {
  asyncHandlerError,
} = require("../../middleware/handleError.middleware");
const { authenticationV2 } = require("../../auth/auth.utils");
const router = express.Router();

//search thì không cần au nên bỏ nên trên đây
router.get('/search/:keySearch', asyncHandlerError( productController.getListSearchProducts))

// authentication
router.use(authenticationV2);
///////////////////////

router.post("", asyncHandlerError(productController.createProduct));
router.post("/published/:id", asyncHandlerError(productController.publishProductByShop));
router.post("/unpublished/:id", asyncHandlerError(productController.unpublishProductByShop));

// QUERY 
router.get('/drafts/all', asyncHandlerError( productController.getAllDraftForShop))

router.get('/published/all', asyncHandlerError( productController.getAllPublishedForShop))

module.exports = router;
