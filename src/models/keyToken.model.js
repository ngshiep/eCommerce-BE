// save user_id, publickey, uesed refresh token
'use strict'

const mongoose = require("mongoose");
const { model, Schema, Types } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'Shop',
    },
    publicKey: {
      type: String,
      unique: true,
    },
    refreshTokens: {
      type: Array,
      default: [],
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);

