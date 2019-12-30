interface sender {
  id: string
}

interface messageType {
  mid: string
  text: string
}

interface postbackType {
  title: String
  payload: String
}
export interface eventType {
  message?: messageType
  postback?: any
  sender: sender
}
export interface messengerEntryType {
  messaging: [eventType]
}
