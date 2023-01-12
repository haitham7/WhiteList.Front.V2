import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = localStorage.getItem('token');
    const req = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (req.url.endsWith('auth/token')) {
          // Password invalid case
          return throwError(error);
        }
        //error.status == 401
        if (error.status == 401) {
          // if token exp or invalid get new token from refresh token or login again
          this.router.navigate(['/auth/login']);
        } else if (error.status == 403) {
          this.router.navigateByUrl('error/403');
        }
        return throwError(error);
      })
    );
  }
}
