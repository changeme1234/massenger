require('dotenv').config()
import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import webhookController from './controllers/webhook.controller'
import authController from './controllers/auth.controller'
import bookingController from './controllers/booking.controller'
import boatController from './controllers/boat.controller'

const app = express()

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(`Hello World`)
})

app.use(bodyParser.json())
app.post('/webhook', webhookController.post)
app.get('/webhook', webhookController.get)
app.get('/login', authController.get)
app.get('/bookings/:id', bookingController.get)
app.get('/boats/:id', boatController.get)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
