import { Request, Response, NextFunction } from 'express'

import Massenger from '../lib/'
import { messengerEntryType } from '../lib/types'

const massenger = new Massenger(process.env.PAGE_ACCESS_TOKEN)

class WebhookController {
  post(req: Request, res: Response, next: NextFunction): void {
    let body = req.body

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(async (entry: messengerEntryType) => {
        // Gets the message. entry.messaging is an array, but
        // will only ever contain one message, so we get index 0
        let webhookEvent = entry.messaging[0]
        let senderPsid = webhookEvent.sender.id

        if (webhookEvent.message) {
          await massenger.handleMessage(senderPsid, webhookEvent.message)
        } else if (webhookEvent.postback) {
          await massenger.handlePostback(senderPsid, webhookEvent.postback)
        }
      })

      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED')
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404)
    }
  }

  get(req: Request, res: Response, next: NextFunction): void {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = '<YOUR_VERIFY_TOKEN>'

    // Parse the query params
    let mode = req.query['hub.mode']
    let token = req.query['hub.verify_token']
    let challenge = req.query['hub.challenge']

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED')
        res.status(200).send(challenge)
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403)
      }
    }
  }
}

export default new WebhookController()
