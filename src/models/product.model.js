"use strict";

const { Schema, model } = require("mongoose");
const slugify = require("slugify");
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: String,
    product_slug: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothings", "Furniture"],
    },
    product_shop: { type: Schema.Types.ObjectId, required: true },
    product_attributes: { type: Schema.Types.Mixed, required: true },
    //more
    product_ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: { type: Array, default: [] },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//create index for search
productSchema.index({ product_name: 'text', product_description: 'text'})

// Document middleWare: runs before .save() and .create() ...
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

const clothingSchema = new Schema(
  {
    brand: { type: String, required: true },
    size: String,
    material: String,
  },
  {
    timestamps: true,
    collection: "clothes",
  }
);

const electronicSchema = new Schema(
  {
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
  },
  {
    timestamps: true,
    collection: "electronics",
  }
);

//Export the model
module.exports = {
  product: model(DOCUMENT_NAME, productSchema),
  clothing: model("Clothings", clothingSchema),
  electronic: model("Electronics", electronicSchema),
};

/**
 * product_name: "new jean",
    product_thumb: "high-quality denium jeans",
    product_description: "",
    product_price: 50,
    product_quantity: "",
    product_type: {
      type: "",
      required: "",
      enum: ["Electronics", "Clothing", "Furniture"],
    },
    product_shop: "",
    product_attributes: "",
 */
