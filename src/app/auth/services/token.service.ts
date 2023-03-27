import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

const TOKEN_KEY = 'token';
const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(window.localStorage.getItem(TOKEN_KEY));
  constructor(private router: Router) { }
  saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    this.token$.next(token);
  }

  getToken(): BehaviorSubject<string | null> {
    return this.token$;
  }

  signOut(): void {
    window.localStorage.clear();
    this.router.navigate(['']);
  }


  saveUser(currentUser: string): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, currentUser);
  }

  getCurrentUserId(): string {
    return window.localStorage.getItem(USER_KEY) as string;
  }

}
