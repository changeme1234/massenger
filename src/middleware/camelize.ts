import express, { Request, Response, NextFunction } from 'express'
const humps = require('humps')

module.exports = function camelizeKeys(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body = humps.camelizeKeys(req.body)
  req.query = humps.camelizeKeys(req.query)
  next()
}
