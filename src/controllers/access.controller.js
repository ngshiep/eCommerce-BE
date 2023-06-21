'use strict'

const accessService = require("../services/access.service")

class AccessController {

  signUp = async (req, res, next) =>{
    try {
      console.log(`[P]::singUp::`, req.body)

      return res.status(200).json(await accessService.signUp(req.body))
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AccessController()