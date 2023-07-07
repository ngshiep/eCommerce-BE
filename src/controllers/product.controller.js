"use strict";

const productService = require("../services/product.service");
const { CREATED, SuccessResponse } = require("../core/success.response");

class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new product success",
      metadata: await productService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  publishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: "publish product success",
      metadata: await productService.publishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  unpublishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: "unpublish product success",
      metadata: await productService.unpublishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  //QUERY
  /**
   * @desc Get all drafts for shop
   * @param {Number} limit
   * @param {Number} skip
   * @return {JSON}
   */
  getAllDraftForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list Draft success!",
      metadata: await productService.findAllDraftForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getAllPublishedForShop = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list Published success!",
      metadata: await productService.findAllPublishedForShop({
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  getListSearchProducts = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list search success!",
      metadata: await productService.searchProducts(req.params),
    }).send(res);
  };
  //END QUERY
}

module.exports = new ProductController();
