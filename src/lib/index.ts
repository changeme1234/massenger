import Facebook from './Facebook'
import Boat, { IBoat } from '../models/boat'

export default class Massenger {
  facebook: Facebook

  constructor(PAGE_ACCESS_TOKEN: string) {
    this.facebook = new Facebook(PAGE_ACCESS_TOKEN)
  }

  async handleMessage(senderPsid: string, receivedMessage: any) {
    let response

    // Check if the message contains text
    if (receivedMessage.text) {
      // Create the payload for a basic text message
      switch (receivedMessage.text) {
        default:
          response = {
            text: `You sent the message: "${receivedMessage.text}"!`
          }
      }
    } else if (receivedMessage.attachments) {
      // Gets the URL of the message attachment
      let attachmentUrl = receivedMessage.attachments[0].payload.url
      let attachment_url = receivedMessage.attachments[0].payload.url
      response = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [
              {
                title: 'Is this the right picture?',
                subtitle: 'Tap a button to answer.',
                image_url: attachment_url,
                buttons: [
                  {
                    type: 'postback',
                    title: 'Yes!',
                    payload: 'yes'
                  },
                  {
                    type: 'postback',
                    title: 'No!',
                    payload: 'no'
                  }
                ]
              }
            ]
          }
        }
      }
    }

    // Sends the response message
    this.facebook.callSendAPI(senderPsid, response)
  }

  async handlePostback(sender_psid: string, received_postback: any) {
    let response

    // Get the payload for the postback
    let payload = ''
    try {
      payload = JSON.parse(received_postback.payload)
    } catch (_err) {
      payload = received_postback.payload
    }

    if (payload === 'yes') {
      response = { text: 'Thanks!' }
    } else if (payload === 'no') {
      response = { text: 'Oops, try sending another image.' }
    } else if (payload === 'GET_STARTED') {
      response = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: 'You are not login yet, Login now!',
            buttons: [
              {
                type: 'account_link',
                url: `${process.env.ROOT_URL}/login`
              }
            ]
          }
        }
      }
    } else if (payload === 'BOOK_BOAT') {
      const boats: IBoat[] = await Boat.list()

      response = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: boats.map((boat: IBoat) => {
              return {
                title: boat.name,
                image_url: boat.imageUrl,
                subtitle: `₱ ${boat.price} \n ${boat.capacity} persons`,
                buttons: [
                  {
                    type: 'web_url',
                    url: `${process.env.ROOT_URL}/boats/${boat.id}`,
                    webview_height_ratio: 'tall',
                    title: 'View Detail'
                  },
                  {
                    type: 'web_url',
                    url: `${process.env.ROOT_URL}/bookings/${boat.id}`,
                    webview_height_ratio: 'compact',
                    title: 'Book Now'
                  }
                ]
              }
            })
          }
        }
      }
    }
    console.log(received_postback)
    // Send the message to acknowledge the postback
    this.facebook.callSendAPI(sender_psid, response)
  }
}
