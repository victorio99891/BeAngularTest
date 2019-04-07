import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/UserModel';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = true;
  loggedUser: UserModel;

  constructor(
    private httpService: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      if (this.cookieService.check('JWT')) {
        const token: string = this.cookieService.get('JWT');

        if (this.isTokenExpired(token)) {
          this.loggedIn = false;
        } else {
          this.loggedIn = true;
        }
      } else {
        this.loggedIn = false;
      }

      resolve(this.loggedIn);
    });
  }

  logOutCurrentUser(){
    this.cookieService.deleteAll();
    this.loggedUser = undefined;
    this.router.navigateByUrl('/');
  }

  getTokenAndUser(
    login: string,
    password: string
  ): Observable<HttpResponse<UserModel>> {
    return this.httpService.post<HttpResponse<UserModel>>(
      '/BeOnTime/auth/login',
      {
        username: login,
        password: password
      },
      { observe: 'response' as 'body' }
    );
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.cookieService.get('JWT');
    }
    if (!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
}
