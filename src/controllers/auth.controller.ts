import { Request, Response, NextFunction } from 'express'

class AuthController {
  get(req: Request, res: Response, next: NextFunction) {
    res.send(`
    <html>
      <head></head>
      <body>
        <h1>Login</h1>
        <script></script>
      </body>
    </html>  
    `)
  }

  post(req: Request, res: Response, next: NextFunction) {
    console.log(req)
    res.send('ok')
  }
}

export default new AuthController()
