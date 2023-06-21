'use strict'

const { findApiById } = require("../services/apikey.service");

const HEADER = {
  API_KEY : 'x-api-key',
  AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
  try {
    // check api key in header
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error'
      })
    }

    // check obj key in db

    const objKey = await findApiById(key)

    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden Error'
      })
    }
    req.objKey = objKey
    return next()
  } catch (error) {

  }
}


const permission = ( permission ) => {
  return ( req, res, next ) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: 'permission denied'
      })
    }
    
    const validPermission = req.objKey.permissions.includes(permission)

    if (!validPermission) {
      return res.status(403).json({
        message: 'permission denied'
      })
    }
    return next()
  }
}
module.exports = {
  apiKey,
  permission
}