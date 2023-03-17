export interface User {
  _id: string
  name: string
  login: string
}

export interface EditUser {
  name: string
  login: string
  password?: string
}
