import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService
      .isAuthenticated()
      .then((authenticated: boolean) => {
        if (authenticated) {
          return true;
        } else {
          this.router.navigateByUrl('/');
        }
      });
  }
}
