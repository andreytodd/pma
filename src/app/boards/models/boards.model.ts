export interface BoardsDB {
  _id: string
  title: string
  owner: string
  users: string[]
}

export interface createBoard {
  title: string
  owner: string
  users: string[]
}
