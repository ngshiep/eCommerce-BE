'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandlerError } = require('../../middleware/handleError.middleware')
const router = express.Router()

//sign up
router.post('/shop/signup', asyncHandlerError(accessController.signUp))
router.post('/shop/login', asyncHandlerError(accessController.login))

module.exports = router