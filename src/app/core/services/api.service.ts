import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../auth/models/auth.models";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {boardData} from "../../boards/models/boards.model";

const USERS_API = 'http://localhost:3000/users';
const BOARDS_API = 'http://localhost:3000/boards';
const BOARDSET_API = 'http://localhost:3000/boardsSet';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  allBoards$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }


  getUsers(): Observable<any> {
    return this.http.get(USERS_API)
  }

  requestBoards(): void {
    this.http.get<any[]>(BOARDS_API).subscribe((data) => {
      this.allBoards$.next(data)
    })
  }

  getBoards(): Observable<any> {
    return this.allBoards$;
  }

  createBoard(data: boardData): void {
    this.http.post<any[]>(BOARDS_API, data).subscribe((data) => {
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

  updateBoard(id: string, data: boardData) {
    this.http.put(`${BOARDS_API}/${id}`, data).subscribe((data) => {
      const newBoardList = this.allBoards$.getValue().map(item => item._id === id ? data : item)
      this.allBoards$.next(newBoardList);
    });
  }

  getBoardsByUserId(id: string): Observable<any> {
    this.http.get<any[]>(`${BOARDSET_API}/${id}`).subscribe((data) => {
      this.allBoards$.next(data)})
    return this.allBoards$
  };
}
