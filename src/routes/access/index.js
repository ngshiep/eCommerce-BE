'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandlerError } = require('../../middleware/handleError.middleware')
const router = express.Router()

//sign up
router.post('/shop/signup', asyncHandlerError(accessController.signUp))

module.exports = router