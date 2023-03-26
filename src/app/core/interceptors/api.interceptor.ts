import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../../auth/services/token.service";
import {Router} from "@angular/router";
import {subscriptionLogsToBeFn} from "rxjs/internal/testing/TestScheduler";
import {ErrorMessageComponent} from "../dialogs/error-message/error-message.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  errors: string[] = [];

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private dialog: MatDialog
    ) {}

  private isTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.tokenService.getToken().getValue();
    if (token !== null && !this.isTokenExpired(token)) {
      this.tokenService.signOut();
      this.router.navigate(['']);
      window.location.reload();
      return throwError('Token expired');
    } else if (token !== null) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq)
        .pipe(
          catchError((error) => {
            const uniqueErrors = new Set([...this.errors, error.message]);
            this.errors = [...uniqueErrors];
            const dialogRef = this.dialog.open(ErrorMessageComponent);
            dialogRef.componentInstance.errorMessage = error.message;
            // alert(error.message);
            return throwError(error.message);
          })
        )
    } else {
      return next.handle(request);
    }
  }
}

// let authReq = request;
// const token = this.tokenService.getToken().getValue();
// if (token !== null && this.isTokenExpired(token)) {
//   authReq = request.clone({
//     setHeaders: {
//       Authorization: `Bearer ${token}`
//     }
//   });
//   return next.handle(authReq);
// } else {
//   this.tokenService.signOut();
//   this.router.navigate(['/auth/login'])
// }
// return next.handle(authReq);
