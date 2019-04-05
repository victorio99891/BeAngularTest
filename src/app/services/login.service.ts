import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserModel } from "../models/UserModel";
import * as jwt_decode from "jwt-decode";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(
    private httpService: HttpClient,
    private cookieService: CookieService
  ) {}

  getTokenAndUser(
    login: string,
    password: string
  ): Observable<HttpResponse<UserModel>> {
    return this.httpService.post<HttpResponse<UserModel>>(
      "/BeOnTime/auth/login",
      {
        username: login,
        password: password
      },
      { observe: "response" as "body" }
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
      token = this.cookieService.get("JWT");
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
