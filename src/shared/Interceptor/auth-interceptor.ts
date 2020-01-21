import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      this.localStorageService.clear();
      this.router.navigateByUrl('/landing/login');
    }
    return throwError(err);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.

    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + this.localStorageService.retrieve('token')
      ),
    });

    // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
    return next.handle(req).pipe(catchError(x => this.handleAuthError(x)));
  }
}
