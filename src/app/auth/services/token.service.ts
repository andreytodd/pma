import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../models/auth.models";
import {ApiService} from "../../core/services/api.service";

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(window.localStorage.getItem(TOKEN_KEY));
  constructor(private apiService: ApiService) { }
  saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    this.token$.next(token)
  }

  getToken(): BehaviorSubject<string | null> {
    // return window.localStorage.getItem(TOKEN_KEY);
    return this.token$;
  }

  signOut(): void {
    window.localStorage.clear();
  }

  isLoggedInObs(): Observable<boolean> {
    return of(!!(this.getToken().getValue()));
  }

  saveUser(currentUser: string): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, currentUser);
    this.apiService.getUsers().subscribe((data: User[]) => {
      // let currentUser = (data.filter(user => user.login === login))[0]._id;

    })
  }

  getCurrentUserId(): any {
    return window.localStorage.getItem(USER_KEY);
  }

  parseJwt (token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

}
