import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = 'http://localhost:3000/auth/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(login: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      login,
      password
    }, httpOptions);
  }
  signUp(name: string, login: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      name,
      login,
      password
    }, httpOptions);
  }
  getUsers(): void {
  }

}
