import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EditUser, User} from "../../auth/models/auth.models";
import {BehaviorSubject, Observable} from "rxjs";
import {
  BoardData,
  BoardFormData,
  CreateColumnModel, EditTaskModel,
  GetColumnsModel, PatchColumns, PatchTasks,
  TaskFormModel, TaskModel, UpdateColumnData
} from "../../boards/models/boards.model";


const USERS_API = 'http://localhost:3000/users';
const BOARDS_API = 'http://localhost:3000/boards';
const BOARDSET_API = 'http://localhost:3000/boardsSet';
const COLUMNSSET_API = 'http://localhost:3000/columnsSet';
const TASKSSET_API = 'http://localhost:3000/tasksSet';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  allBoards$: BehaviorSubject<BoardData[]> = new BehaviorSubject<BoardData[]>([]);
  allColumns$: BehaviorSubject<GetColumnsModel[]> = new BehaviorSubject<GetColumnsModel[]>([])
  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(<User>{})

  constructor(
    private http: HttpClient,
  ) { }


  getUsers(): Observable<any> {
    return this.http.get(USERS_API)
  }

  getUserById(id: string): BehaviorSubject<User> {
    this.http.get<User>(`${USERS_API}/${id}`)
      .subscribe((user) => {
      this.currentUser$.next(user);
    })
    return this.currentUser$
  }

  editUser(id: string, data: EditUser) {
    this.http.put<User>(`${USERS_API}/${id}`, data).subscribe((user) => {
        this.currentUser$.next(user);
      }
    )
  }

  deleteUser(userId: string) {
    return this.http.delete(`${USERS_API}/${userId}`)
  }


  getBoards(): Observable<any> {
    return this.allBoards$;
  }

  createBoard(data: BoardFormData): void {
    this.http.post<any>(BOARDS_API, data).subscribe((data) => {
      const newBoardList = [...this.allBoards$.getValue(), data];
      this.allBoards$.next(newBoardList)
    })
  }

  deleteBoard(id: string) {
    this.http.delete(`${BOARDS_API}/${id}`).subscribe((data) => {
      const newBoardList = this.allBoards$.getValue().filter((board) => board._id !== id)
      this.allBoards$.next(newBoardList);
    });
  }

  updateBoard(id: string, data: BoardFormData): void {
    this.http.put<BoardData>(`${BOARDS_API}/${id}`, data).subscribe((data) => {
      const newBoardList: BoardData[] = this.allBoards$.getValue().map(item => item._id === id ? data : item)
      this.allBoards$.next(newBoardList);
    });
  }

  getBoardsByUserId(id: string): Observable<any> {
    this.http.get<any[]>(`${BOARDSET_API}/${id}`).subscribe((data) => {
      this.allBoards$.next(data)
    })
    return this.allBoards$;
  };

  getBoardById(id: string): Observable<BoardData> {
    return this.http.get<BoardData>(`${BOARDS_API}/${id}`)
  }

  getAllColumnsInBoard(id: string): Observable<GetColumnsModel[]> {
    this.http.get<GetColumnsModel[]>(`${BOARDS_API}/${id}/columns`).subscribe((data) => {
      this.allColumns$.next(data)
    })
    return this.allColumns$;
  }

  createColumn(id: string, data: CreateColumnModel) {
    this.http.post<GetColumnsModel>(`${BOARDS_API}/${id}/columns`, data).subscribe((data) => {
      const newColumnsList =  [...this.allColumns$.getValue(), data];
      this.allColumns$.next(newColumnsList);
    })
  }

  updateColumn(boardId: string, columnId: string, data: UpdateColumnData) {
    return  this.http.put<UpdateColumnData>(`${BOARDS_API}/${boardId}/columns/${columnId}`, data)
  }

  getColumnByUserId(id: string) {
    const params = new HttpParams().set('userId', id)
    return this.http.get(`${COLUMNSSET_API}`, {params})
  }

  deleteColumnById(boardId: string, columnId: string) {
    this.http.delete(`${BOARDS_API}/${boardId}/columns/${columnId}`).subscribe((data) => {
      const newColumnsList = this.allColumns$.getValue().filter((column) => column._id !== columnId)
      this.allColumns$.next(newColumnsList);
    })
  }

  getTasksByBoardI(boardId: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${TASKSSET_API}/${boardId}`)
  }

  getTasksInColumn(boardId: string, columnId: string) {
    return this.http.get<TaskModel[]>(`${BOARDS_API}/${boardId}/columns/${columnId}/tasks`)
  }

  createTask(boardId: string, columnId: string, data: TaskFormModel) {
    return this.http.post<TaskFormModel>(`${BOARDS_API}/${boardId}/columns/${columnId}/tasks`, data)
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(`${BOARDS_API}/${boardId}/columns/${columnId}/tasks/${taskId}`)
  }

  editTask(boardId: string, columnId: string, taskId: string, data: EditTaskModel) {
    return this.http.put(`${BOARDS_API}/${boardId}/columns/${columnId}/tasks/${taskId}`, data)
  }

  updateTaskOrder(tasks: PatchTasks[]): Observable<TaskModel[]> {
    const updatedTasks = tasks.map((task, index) => {
      const { _id, columnId, order } = task;
      return {
        _id,
        columnId,
        order,
      };
    });
    return this.http.patch<TaskModel[]>(TASKSSET_API, updatedTasks);
  }

  updateColumnsOrder(columns: PatchColumns[]) {
    const updatedColumns = columns.map((column, index) => {
      const { _id, order } = column;
      return {
        _id,
        order,
      };
    });
    return this.http.patch<GetColumnsModel[]>(COLUMNSSET_API, updatedColumns);
  }

  updateColumns(columns: PatchColumns[]) {
    return this.updateColumnsOrder(columns)
  }

  updateTaskColumns(tasks: PatchTasks[]): Observable<TaskModel[]> {
    return this.updateTaskOrder(tasks);
  }
}

