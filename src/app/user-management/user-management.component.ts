import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { UserModel } from './../models/UserModel';
import { LoginService } from './../services/login.service';
import { UserService } from './../services/user.service';
import { DepartmentService } from './../services/department.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Event } from '@angular/router';
import { timer } from 'rxjs';
import { UserRoles } from '../models/Roles.enum';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  loggedUserModel: UserModel;

  usersList: Array<UserModel>;
  statuses: Array<boolean> = [true, false];

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private departmentService: DepartmentService
  ) {
    this.loggedUserModel = this.loginService.loggedUser;
  }

  ngOnInit() {
    timer(500).subscribe(action => {
      this.callApi();
    });
  }

  changeEditedFieldBackground(event, userId: string, isRole: boolean) {
    let currentTarget: string = event.currentTarget.id;
    document.getElementById(currentTarget).classList.toggle('editedField');
    console.log('User ID:' + userId + ' changed field: ' + currentTarget);

    this.usersList.forEach(user => {
      if (user.userId === userId) {
        if (currentTarget.includes('stat')) {
          user.active = !user.active;
        }
      }
    });
  }

  showAll() {
    console.log(this.usersList);
  }

  callApi() {
    this.userService.getAllUser().subscribe(response => {
      this.usersList = response._embedded.userBodyList;
      this.usersList.forEach((user, index) => {
        if (this.loggedUserModel.userId === user.userId) {
          this.usersList.splice(index, 1);
        }
      });
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
