import Facebook from './Facebook'

export default class Massenger {
  facebook: Facebook

  constructor(PAGE_ACCESS_TOKEN: string) {
    this.facebook = new Facebook(PAGE_ACCESS_TOKEN)
  }

  handleMessage(senderPsid: string, receivedMessage: any) {
    let response

    // Check if the message contains text
    if (receivedMessage.text) {
      // Create the payload for a basic text message
      response = {
        text: `You sent the message: "${receivedMessage.text}". Now send me an image!`
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

  handlePostback(sender_psid: string, received_postback: any) {
    let response

    // Get the payload for the postback
    let payload = received_postback.payload
    switch (payload) {
      case 'yes': {
        response = { text: 'Thanks!' }
      }
      case 'no':
        response = { text: 'Oops, try sending another image.' }
      case 'GET_STARTED': {
        response = {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: 'Try the log in button!',
              buttons: [
                {
                  type: 'account_link',
                  url: 'https://eb513246.ngrok.io/login'
                }
              ]
            }
          }
        }
      }
    }
    // Send the message to acknowledge the postback
    this.facebook.callSendAPI(sender_psid, response)
  }
}
