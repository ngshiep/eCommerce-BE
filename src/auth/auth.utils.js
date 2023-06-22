'use strict'
const JWT = require('jsonwebtoken')
const { asyncHandlerError } = require('../middleware/handleError.middleware')
const HEADER = require('../constants/header.constants')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { findByUserId } = require('../services/keyToken.service')


const createTokenPair = async ( payload, publicKey, privateKey) => {
  try {
    // access token
    const accessToken = await JWT.sign( payload, publicKey, {
      expiresIn: '2 days'
    })

    // refresh token
    const refreshToken = await JWT.sign( payload, privateKey, {
      expiresIn: '7 days'
    })

    return {
      accessToken,
      refreshToken
    }
  } catch (error) {
    
  }
}

const authentication = asyncHandlerError( async ( req, res, next) => {
  /*
    1 - check userid missing?
    2 - get access token
    3 - verify token
    4 - check user in dbs
    5 - check keyStore with this userId.
    6 - OK all => return next ()
  */

  const userId = req.headers[HEADER.CLIENT_ID]
  if(!userId) throw new AuthFailureError('Invalid Request')

  //2
  const keyStore =await findByUserId( userId )
  if(!keyStore) throw new NotFoundError('Not found key store')

  //3
  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if(!accessToken) throw new AuthFailureError('Invalid Request')

  try {

    const decodeUser = JWT.verify( accessToken, keyStore.publicKey )
    if (userId !== decodeUser.userId) new AuthFailureError('Invalid Request')
    req.keyStore = keyStore
    return next()

  } catch (error) {
    throw error
  }
})

module.exports = {
  createTokenPair,
  authentication
}