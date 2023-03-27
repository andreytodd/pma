import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {Router} from "@angular/router";
import {TokenResponse, UserSignUp} from "../models/auth.models";

const AUTH_API = 'http://localhost:3000/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router

  ) { }

  signIn(login: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(AUTH_API + 'signin', {
      login,
      password
    }, httpOptions);

  }
  signUp(name: string, login: string, password: string): Observable<UserSignUp> {
    return this.http.post<UserSignUp>(AUTH_API + 'signup', {
      name,
      login,
      password
    }, httpOptions);
  }

  signOut(): void {
    this.tokenService.signOut();
    this.router.navigate(['']);
  }

}
