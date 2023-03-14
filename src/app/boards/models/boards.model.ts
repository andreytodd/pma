export interface BoardFormData {
  title: string
  owner: string
  users?: string[] | undefined
}

export interface BoardData {
  _id: string
  title: string
  owner: string
  users: string[] | []

}

export interface CreateColumnModel {
  title: string
  order: number
}

export interface GetColumnsModel extends CreateColumnModel {
  _id: string
  boardId: string
}
