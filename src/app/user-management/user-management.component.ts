import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { UserModel } from './../models/UserModel';
import { LoginService } from './../services/login.service';
import { UserService } from './../services/user.service';
import { DepartmentService } from './../services/department.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  loggedUserModel: UserModel;

  usersList: Array<UserModel>;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private departmentService: DepartmentService
  ) {
    this.loggedUserModel = this.loginService.loggedUser;
  }

  ngOnInit() {
    this.callApi();
  }


  callApi() {
    this.userService.getAllUser().subscribe(response => {
      this.usersList = response._embedded.userBodyList;
      this.usersList.forEach(user => {
        this.departmentService.departmentList.forEach(department => {
          if (department.departmentId === user.department) {
            user.departmentName = department.name;
          }
        });
      });
    });
  }
}
