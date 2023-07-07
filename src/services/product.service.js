"use strict";

const { product, clothing, electronic } = require("../models/product.model");
const { BadRequestError } = require("../core/error.response");
const {
  findAllDraftForShop,
  findAllPublishedForShop,
  publishProductByShop,
  searchProductsByUser,
} = require("../models/repositories/product.repo");

// define Factory class to create product

class ProductFactory {
  /**
   * type: 'Clothing'
   * payload: info
   */
  //LV1
  // static async createProduct(type, payload) {
  //   switch (type) {
  //     case "Electronics":
  //       return new Electronics(payload).createProduct();
  //     case "Clothings":
  //       return new Clothing(payload).createProduct();
  //     default:
  //       throw new BadRequestError(`Invalid product type ${type}`);
  //   }
  // }

  //  LV2

  static productRegistry = {};

  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }

  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass)
      throw new BadRequestError(`Invalid Product Types ${type}`);

    return new productClass(payload).createProduct();
  }

  //PUT
  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id });
  }

  static async unpublishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id });
  }

  //QUERY
  static async findAllDraftForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true };
    return await findAllDraftForShop({ query, limit, skip });
  }

  static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: false };
    return await findAllPublishedForShop({ query, limit, skip });
  }

  static async searchProducts({ keySearch }) {
    return await searchProductsByUser({ keySearch });
  }
}

//define base product class
class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
  }

  //create new product
  async createProduct(product_id) {
    return await product.create({
      ...this,
      _id: product_id,
    });
  }
}

// Define sub class for different product types clothing

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newClothing) throw new BadRequestError("Create new clothing error");

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequestError("Create new product error");

    return newProduct;
  }
}

// Define sub class for different product types Electronics
class Electronics extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic)
      throw new BadRequestError("Create new electronic error");

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError("Create new product error");

    return newProduct;
  }
}

// Register product types
ProductFactory.registerProductType("Electronics", Electronics);
ProductFactory.registerProductType("Clothings", Clothing);

module.exports = ProductFactory;
