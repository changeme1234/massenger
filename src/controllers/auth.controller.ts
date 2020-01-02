import { Request, Response, NextFunction } from 'express'

class AuthController {
  get(req: Request, res: Response, next: NextFunction) {
    res.send(`
    <html>
      <head></head>
      <body>
        <h1>Login</h1>
        <span>Demo username is "user", password is "1234" </span>
        <input type="text" name="username" value="user" />
        <input type="password" name="password" value="1234" />
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
