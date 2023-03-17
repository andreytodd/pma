import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from "../../auth/services/token.service";
import {Router} from "@angular/router";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) {}

  private isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.tokenService.getToken().getValue();
    if (token !== null && this.isTokenExpired(token)) {
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    } else {
      this.tokenService.signOut();
      this.router.navigate(['/auth/login'])
    }
    return next.handle(authReq);
  }
}
