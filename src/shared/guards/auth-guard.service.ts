import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.IsLoggednIn().pipe(
      map(res => {
        if (res) {
          return res;
        } else {
          return false;
        }
      }),
      catchError(err => {
        return of(false);
      })
    );
  }
}
