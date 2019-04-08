import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmbbendedDepartmentBodyList } from '../models/DepartmentModel';
import { APIHeaders } from './../models/APIHeaders';
import { CookieService } from 'ngx-cookie-service';
import { DepartmentModel } from './../models/DepartmentModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  headers: APIHeaders = new APIHeaders(this.cookieService);
  departmentList: Array<DepartmentModel>;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getDepartmentList(): Observable<EmbbendedDepartmentBodyList> {
    return this.http.get<EmbbendedDepartmentBodyList>(
      '/BeOnTime/departments',
      this.headers.get()
    );
  }
}
