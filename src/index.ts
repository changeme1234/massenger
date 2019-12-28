console.log('hi there')
import express, { Request, Response, NextFunction } from 'express'

const app = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(`
    <div>
      <h1>hello World</h1>
    </div>
  `)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
