'use strict'

class AccessController {

  signUp = async (req, res, next) =>{
    try {
      console.log(`[P]::singUp::`, req.body)

      return res.status(200).json({
        code: '201',
        metadata: {user_id : 1}
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AccessController()