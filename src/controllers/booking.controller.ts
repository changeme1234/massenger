import { Request, Response, NextFunction } from 'express'

class BookingController {
  get(req: Request, res: Response, next: NextFunction) {
    res.send(`
    <html>
      <head>
        <title>Book a boat</title>
      </head>
      <body>
        <h1>Booking</h1>
        <span>Your account would be deducted 350 PHP</span>
        <button>Book Now</button>
        <script>
          ;(function(d, s, id) {
            var js,
              fjs = d.getElementsByTagName(s)[0]
            if (d.getElementById(id)) {
              return
            }
            js = d.createElement(s)
            js.id = id
            js.src = '//connect.facebook.net/en_US/messenger.Extensions.js'
            fjs.parentNode.insertBefore(js, fjs)
          })(document, 'script', 'Messenger')
          window.extAsyncInit = function() {
            // the Messenger Extensions JS SDK is done loading
          }
        </script>
      </body>
    </html>
    `)
  }

  post(req: Request, res: Response, next: NextFunction) {
    console.log(req)
    res.send('ok')
  }
}

export default new BookingController()
