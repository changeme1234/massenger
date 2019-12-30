const request = require('request')

export default class Facebook {
  PAGE_ACCESS_TOKEN: String
  constructor(PAGE_ACCESS_TOKEN: string) {
    this.PAGE_ACCESS_TOKEN = PAGE_ACCESS_TOKEN
  }
  callSendAPI(sender_psid: string, response: any) {
    // Construct the message body
    let request_body = {
      recipient: {
        id: sender_psid
      },
      message: response
    }
    console.log(this.PAGE_ACCESS_TOKEN)
    // Send the HTTP request to the Messenger Platform
    request(
      {
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: this.PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: request_body
      },
      (err: any, res: any, body: any) => {
        if (!err) {
          console.log('message sent!')
        } else {
          console.error('Unable to send message:' + err)
        }
      }
    )
  }
}
