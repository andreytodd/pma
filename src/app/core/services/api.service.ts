import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../auth/models/auth.models";
import {Observable, of} from "rxjs";
import {createBoardData} from "../../boards/models/boards.model";

const USERS_API = 'http://localhost:3000/users';
const BOARDS_API = 'http://localhost:3000/boards';
const BOARDSET_API = 'http://localhost:3000/boardsSet';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUserId() {

  }

  getUsers(): Observable<any> {
    return this.http.get(USERS_API)
  }


  getBoards(): Observable<any> {
    return this.http.get(BOARDS_API);
  }

  createBoard(data: createBoardData): Observable<any> {
    return this.http.post(BOARDS_API, data);
  }

  deleteBoard(id: string) {
    return this.http.delete(`${BOARDS_API}/${id}`)
  }

  getBoardsByUserId(id: string): Observable<any> {
    return this.http.get(`${BOARDSET_API}/${id}`)
  }

}
