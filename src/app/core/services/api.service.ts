import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSignUp, User} from "../../auth/models/auth.models";
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
  allColumns$: BehaviorSubject<GetColumnsModel[]> = new BehaviorSubject<GetColumnsModel[]>([]);
  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(<User>{});

  constructor(
    private http: HttpClient,
  ) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_API);
  }

  getUserById(id: string): BehaviorSubject<User> {
    this.http.get<User>(`${USERS_API}/${id}`)
      .subscribe((user) => {
      this.currentUser$.next(user);
    });
    return this.currentUser$;
  }

  editUser(id: string, data: UserSignUp) {
    this.http.put<User>(`${USERS_API}/${id}`, data).subscribe((user) => {
        this.currentUser$.next(user);
      }
    );
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${USERS_API}/${userId}`);
  }


  createBoard(data: BoardFormData): void {
    this.http.post<BoardData>(BOARDS_API, data).subscribe((data) => {
      const newBoardList = [...this.allBoards$.getValue(), data];
      this.allBoards$.next(newBoardList);
    });
  }

  deleteBoard(id: string): void {
    this.http.delete<BoardData>(`${BOARDS_API}/${id}`).subscribe(() => {
      const newBoardList: BoardData[] = this.allBoards$.getValue().filter((board) => board._id !== id);
      this.allBoards$.next(newBoardList);
    });
  }

  updateBoard(id: string, data: BoardFormData): void {
    this.http.put<BoardData>(`${BOARDS_API}/${id}`, data).subscribe((data) => {
      const newBoardList: BoardData[] = this.allBoards$.getValue().map(item => item._id === id ? data : item);
      this.allBoards$.next(newBoardList);
    });
  }

  getBoardsByUserId(id: string): Observable<BoardData[]> {
    this.http.get<BoardData[]>(`${BOARDSET_API}/${id}`).subscribe((data) => {
      this.allBoards$.next(data);
    });
    return this.allBoards$;
  }

  getBoardById(id: string): Observable<BoardData> {
    return this.http.get<BoardData>(`${BOARDS_API}/${id}`);
  }

  getAllColumnsInBoard(id: string): Observable<GetColumnsModel[]> {
    this.http.get<GetColumnsModel[]>(`${BOARDS_API}/${id}/columns`).subscribe((data) => {
      this.allColumns$.next(data);
    });
    return this.allColumns$;
  }

  createColumn(id: string, data: CreateColumnModel): void {
    this.http.post<GetColumnsModel>(`${BOARDS_API}/${id}/columns`, data).subscribe((data) => {
      const newColumnsList =  [...this.allColumns$.getValue(), data];
      this.allColumns$.next(newColumnsList);
    });
  }

  updateColumn(boardId: string, columnId: string, data: UpdateColumnData) {
    return  this.http.put<UpdateColumnData>(`${BOARDS_API}/${boardId}/columns/${columnId}`, data);
  }


  deleteColumnById(boardId: string, columnId: string): void {
    this.http.delete<GetColumnsModel>(`${BOARDS_API}/${boardId}/columns/${columnId}`).subscribe(() => {
      const newColumnsList: GetColumnsModel[] = this.allColumns$.getValue().filter((column) => column._id !== columnId);
      this.allColumns$.next(newColumnsList);
    });
  }


  getTasksInColumn(boardId: string, columnId: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${BOARDS_API}/${boardId}/columns/${columnId}/tasks`);
  }

  createTask(boardId: string, columnId: string, data: TaskFormModel): Observable<TaskFormModel> {
    return this.http.post<TaskFormModel>(`${BOARDS_API}/${boardId}/columns/${columnId}/tasks`, data);
  }

  deleteTask(boardId: string, columnId: string, taskId: string): Observable<TaskFormModel> {
    return this.http.delete<TaskFormModel>(`${BOARDS_API}/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  editTask(boardId: string, columnId: string, taskId: string, data: EditTaskModel): Observable<TaskFormModel> {
    return this.http.put<TaskFormModel>(`${BOARDS_API}/${boardId}/columns/${columnId}/tasks/${taskId}`, data);
  }

  updateTaskOrder(tasks: PatchTasks[]): Observable<TaskModel[]> {
    const updatedTasks = tasks.map((task) => {
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
    const updatedColumns: PatchColumns[] = columns.map((column) => {
      const { _id, order } = column;
      return {
        _id,
        order,
      };
    });
    return this.http.patch<GetColumnsModel[]>(COLUMNSSET_API, updatedColumns);
  }

  updateColumns(columns: PatchColumns[]): Observable<GetColumnsModel[]> {
    return this.updateColumnsOrder(columns);
  }

  updateTaskColumns(tasks: PatchTasks[]): Observable<TaskModel[]> {
    return this.updateTaskOrder(tasks);
  }
}

