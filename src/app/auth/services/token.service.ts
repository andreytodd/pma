import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../models/auth.models";
import {ApiService} from "../../core/services/api.service";

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private apiService: ApiService) { }

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

  saveUser(login: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    this.apiService.getUsers().subscribe((data: User[]) => {
      let currentUser = (data.filter(user => user.login === login))[0]._id;
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    })
  }

  getCurrentUserId(): any {
    return window.sessionStorage.getItem(USER_KEY);
  }

}
