import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../auth/models/auth.models";
import {Observable} from "rxjs";

const USERS_API = 'http://localhost:3000/users'

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

  getUser(): Observable<any> {
    return this.http.get(`${USERS_API}/640a10ad5b15d060be67ef95`)
  }

}
