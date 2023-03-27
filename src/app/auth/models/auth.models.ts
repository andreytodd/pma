export interface User {
  _id: string
  name: string
  login: string
}

export interface UserSignUp {
  name: string
  login: string
  password: string
}

export interface UserLogin {
  login: string
  password: string
}

export interface TokenResponse {
  token: string
}
