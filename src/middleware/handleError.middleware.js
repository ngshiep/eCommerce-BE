'use strict'

const asyncHandlerError = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

module.exports = {
  asyncHandlerError
}