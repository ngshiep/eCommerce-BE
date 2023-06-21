"use strict";

const _ = require("lodash");

const getInfoDate = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

module.exports = {
  getInfoDate,
};
