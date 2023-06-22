'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandlerError } = require('../../middleware/handleError.middleware')
const { authentication } = require('../../auth/auth.utils')
const router = express.Router()

//sign up
router.post('/shop/signup', asyncHandlerError(accessController.signUp))
router.post('/shop/login', asyncHandlerError(accessController.login))

// authentication
router.use(authentication)
///////////////////////
router.post('/shop/logout', asyncHandlerError(accessController.logout))

module.exports = router