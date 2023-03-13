export interface BoardsDB {
  _id: string
  title: string
  owner: string
  users?: string[] | undefined
}

export interface boardData {
  title: string
  owner: string
  users?: string[] | undefined
}
