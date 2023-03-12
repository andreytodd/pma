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
    return this.token$;
  }

  signOut(): void {
    window.localStorage.clear();
  }
  // TODO: remove this code
  // isLoggedInObs(): Observable<boolean> {
  //   return of(!!(this.getToken().getValue()));
  // }

  saveUser(currentUser: string): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, currentUser);
    // this.apiService.getUsers().subscribe((data: User[]) => {
    //   // let currentUser = (data.filter(user => user.login === login))[0]._id;
    //
    // })
  }

  getCurrentUserId(): any {
    return window.localStorage.getItem(USER_KEY);
  }

}
