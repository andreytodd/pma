import {User} from "../../auth/models/auth.models";

export interface BoardFormData {
  title: string
  owner: string
  users?: string[] | undefined
}

export interface BoardData {
  _id: string
  title: string
  owner: string
  users: string[]

}

export interface CreateColumnModel {
  title: string
  order: number
}

export interface GetColumnsModel extends CreateColumnModel {
  _id: string
  boardId: string
}

export interface UpdateColumnData {
  title: string
  order: number
}

export interface TaskFormModel {
  title: string
  order: number
  description: string
  userId: string
  users: string[]
}

export interface TaskModel {
  _id: string
  title: string
  order: number
  boarId: string
  columnId: string
  description: string
  userId: string
  users: string[]
}

export interface EditTaskModel {
  title: string
  order: number
  description: string
  columnId: string
  userId: string
  users: string[]
}

export interface PatchTasks {
  _id: string
  columnId: string
  order: number
}

export interface PatchColumns {
  _id: string
  order: number
}
