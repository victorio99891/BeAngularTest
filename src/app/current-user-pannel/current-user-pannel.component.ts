import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { LoginService } from '../services/login.service';
import { DepartmentService } from './../services/department.service';

@Component({
  selector: 'app-current-user-pannel',
  templateUrl: './current-user-pannel.component.html',
  styleUrls: ['./current-user-pannel.component.css']
})
export class CurrentUserPannelComponent implements OnInit {
  userModel: UserModel;

  constructor(
    private loginService: LoginService,
    private departmentService: DepartmentService
  ) {
    this.userModel = this.loginService.loggedUser;
  }

  ngOnInit() {
    this.departmentService.getDepartmentList().subscribe(response => {
      this.departmentService.departmentList =
        response._embedded.departmentBodyList;
    });
  }

  logOut() {
    this.loginService.logOutCurrentUser();
  }
}
