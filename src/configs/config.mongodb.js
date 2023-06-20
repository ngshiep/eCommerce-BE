'use strict'

// level 01

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052
  },
  db : {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'shopDEV'
  }
}

const product = {
  app: {
    port: process.env.PRODUCT_APP_PORT || 3000
  },
  db : {
    host: process.env.PRODUCT_DB_HOST || 'localhost',
    port: process.env.PRODUCT_DB_PORT || 27017,
    name: process.env.PRODUCT_DB_NAME || 'shopPRO'
  }
}

const config = {dev, product}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]