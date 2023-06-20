"use strict";
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5000;

//count connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;

  console.log(`Number of connections:: ${numConnection}`);
};

// check over load
const checkOverload = () => {
  const id =  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    //Example maxium number of connection based on number of cores

    const maxConnection = numCores * 5;
    console.log(`Active connections:: ${numConnection}`)
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024}`);

    if (numConnection > maxConnection) {
      console.log(`Connection overload detected!`);
      //notify.send(...)
    }
  }, _SECONDS); // monitor every 5  seconds

  //exit interval
  process.on("SIGINT", () => {
    clearInterval(id);
  });
};

module.exports = {
  countConnect,
  checkOverload,
};
