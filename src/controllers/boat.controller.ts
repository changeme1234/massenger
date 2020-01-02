import { Request, Response, NextFunction } from 'express'

class BoatController {
  get(req: Request, res: Response, next: NextFunction) {
    res.send(`
    <html>
      <head>
        <title>Book a boat</title>
      </head>
      <body>
        <h1>Boat Name</h1>
    </html>
    `)
  }

  post(req: Request, res: Response, next: NextFunction) {
    console.log(req)
    res.send('ok')
  }
}

export default new BoatController()
