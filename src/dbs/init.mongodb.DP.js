const mongoose = require("mongoose");
const connectString = "mongodb://localhost:27017/shopDEV";

class MongoStrategy {
  connect() {
    throw new Error("connect method must be implemented");
  }
}

class LocalMongoStrategy extends MongoStrategy {
  connect() {
    if (1 == 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => console.log("connected mongodb success"))
      .catch((err) => console.log("Error Connect!"));
  }
}

class MongoDBConnector {
  constructor() {
    MongoDBConnector.strategy.connect()
  }

  static getInstance(strategy) {
    if (!MongoDBConnector.instance) {
      MongoDBConnector.strategy = strategy;
      MongoDBConnector.instance = new MongoDBConnector();
    }
    return MongoDBConnector.instance;
  }
}

const localStrategy = new LocalMongoStrategy();
const instanceMongodb = MongoDBConnector.getInstance(localStrategy);

module.exports = instanceMongodb;
