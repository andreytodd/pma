import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EditUser, User} from "../../auth/models/auth.models";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {BoardData, BoardFormData, CreateColumnModel, GetColumnsModel} from "../../boards/models/boards.model";
import {BoardComponent} from "../../boards/components/board/board.component";

const USERS_API = 'http://localhost:3000/users';
const BOARDS_API = 'http://localhost:3000/boards';
const BOARDSET_API = 'http://localhost:3000/boardsSet';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  allBoards$: BehaviorSubject<BoardData[]> = new BehaviorSubject<BoardData[]>([]);
  allColumns$: BehaviorSubject<GetColumnsModel[]> = new BehaviorSubject<GetColumnsModel[]>([])
  currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(<User>{})

  constructor(private http: HttpClient) { }


  getUsers(): Observable<any> {
    return this.http.get(USERS_API)
  }

  getUserById(id: string): BehaviorSubject<User> {
    this.http.get<User>(`${USERS_API}/${id}`).subscribe((user) => {
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

  requestBoards(): void {
    this.http.get<any[]>(BOARDS_API).subscribe((data) => {
      this.allBoards$.next(data)
    })
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
      this.allBoards$.next(data)})
    return this.allBoards$
  };

  getAllColumnsInBoard(id: string): Observable<GetColumnsModel[]> {
    return this.http.get<GetColumnsModel[]>(`${BOARDS_API}/${id}/columns`);
  }

  createColumn(id: string, data: CreateColumnModel) {
    this.http.post<GetColumnsModel>(`${BOARDS_API}/${id}/columns`, data).subscribe((data) => {
      const newColumnsList =  [...this.allColumns$.getValue(), data];
      this.allColumns$.next(newColumnsList);
    })
  }

  getColumnById() {

  }

  updateColumnById() {

  }

  deleteColumnById(boardId: string, columnId: string) {
    this.http.delete(`${BOARDS_API}/${boardId}/columns/${columnId}`).subscribe((data) => {
      const newColumnsList = this.allColumns$.getValue().filter((column) => column._id !== columnId)
      this.allColumns$.next(newColumnsList);
    })
  }
}
