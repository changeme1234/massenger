interface user {
  id: number
  name: string
  username: string
  password: string
}

const users: user[] = [
  {
    id: 2,
    name: 'Juan Dela Cruz',
    username: 'juandelacruz',
    password: 'password'
  }
]

export default class User {
  static list() {
    return new Promise((resolve, reject) => {
      resolve(
        users.map(elem => {
          let { password: _password } = elem
          return elem
        })
      )
    })
  }

  static get(id: number): Promise<user> {
    return new Promise((resolve, reject) => {
      resolve(users.find(elem => elem.id === id))
    })
  }

  static getByUsername(username: string): Promise<user> {
    return new Promise((resolve, reject) => {
      resolve(users.find(elem => elem.username === username))
    })
  }

  static async authenticate(
    username: string,
    password: string
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const user = await User.getByUsername(username)
      if (user) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }
}
