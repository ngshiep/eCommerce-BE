"use strict";

const mongoose = require("mongoose");
const { db } = require("../configs/config.mongodb");
const { countConnect } = require("../helper/check.connect");


const connectString = `mongodb://${db.host}:${db.port}/${db.name}`;

console.log("connectString", connectString)

class Database {
  constructor() {
    this.connect();
  }
  //connect db
  connect(type = "mongodb") {
    if (1 == 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => console.log("connected mongodb success", countConnect()))
      .catch((err) => {console.log("Error Connect!", err)});
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
