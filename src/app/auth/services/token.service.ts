import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../models/auth.models";

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  isLoggedInObs(): Observable<boolean> {
    return of(Boolean(this.getToken()));
  }

  saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

}
