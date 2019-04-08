import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel, EmbendedUserBodyList } from '../models/UserModel';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { APIHeaders } from '../models/APIHeaders';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers: APIHeaders = new APIHeaders(this.cookieService);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllUser(): Observable<EmbendedUserBodyList> {
    return this.http.get<EmbendedUserBodyList>(
      '/BeOnTime/users',
      this.headers.get()
    );
  }
}
