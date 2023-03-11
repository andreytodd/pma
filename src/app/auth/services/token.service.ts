import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

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

  signOut() {
    window.sessionStorage.clear();
  }

  isLoggedInObs(): Observable<boolean> {
    return of(Boolean(this.getToken()));
  }

  isLoggedIn(): boolean {
    return Boolean(this.getToken());
  }
}
