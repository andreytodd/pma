export interface BoardsDB {
  _id: string
  title: string
  owner: string
  users?: string[] | undefined
}

export interface createBoardData {
  title: string
  owner: string
  users?: string[] | undefined
}
