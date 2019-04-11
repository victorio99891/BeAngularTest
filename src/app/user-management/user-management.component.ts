import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { UserModel } from './../models/UserModel';
import { LoginService } from './../services/login.service';
import { UserService } from './../services/user.service';
import { DepartmentService } from './../services/department.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Event } from '@angular/router';
import { timer } from 'rxjs';
import { UserRoles } from '../models/Roles.enum';
import { element } from 'protractor';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  loggedUserModel: UserModel;

  sentDataButtonNotActive: boolean;
  submitDataButtonNotActive: boolean;

  editedElementList: HTMLCollection = document.getElementsByClassName(
    'editedField'
  );
  usersList: Array<UserModel>;
  statuses: Array<boolean> = [true, false];

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private departmentService: DepartmentService
  ) {
    this.loggedUserModel = this.loginService.loggedUser;
    this.sentDataButtonNotActive = true;
  }

  ngOnInit() {
    timer(700).subscribe(action => {
      this.callApi();
    });
  }

  changeEditedFieldBackground(event, userId: string, role?: string) {
    const currentTarget: string = event.currentTarget.id;
    document.getElementById(currentTarget).classList.toggle('editedField');
    document.getElementById(currentTarget).classList.toggle('normalField');
    console.log('User ID:' + userId + ' changed field: ' + currentTarget);
    this.usersList.forEach(user => {
      if (user.userId === userId) {
        if (currentTarget.includes('status')) {
          user.active = !user.active;
        }
        if (role !== undefined) {
          const roleIndex = user.roles.indexOf(role);
          if (roleIndex !== -1) {
            user.roles.splice(roleIndex, 1);
          } else {
            user.roles.push(role.toUpperCase());
          }
        }
      }
    });
    this.editedElementList = document.getElementsByClassName('editedField');
  }

  showAll() {
    const htmlCollection = this.getCopyOfHtmlCollection();
    if (htmlCollection.length !== 0) {
      for (const targetElementID of htmlCollection) {
        const inputElement = document.getElementById(targetElementID)
          .firstChild as HTMLInputElement;
        inputElement.disabled = true;
      }
      this.submitDataButtonNotActive = true;
      this.sentDataButtonNotActive = false;
    }
  }

  sentData() {
    if (confirm('ARE YOU SURE TO MAKE CHANGES?')) {
      const htmlCollection = this.getCopyOfHtmlCollection();
      for (const targetElementID of htmlCollection) {
        const inputField = document.getElementById(targetElementID);
        inputField.classList.remove('editedField');
        inputField.classList.add('submittedField');
      }
    } else {
      console.log('NO');
    }
    this.sentDataButtonNotActive = true;
  }

  getCopyOfHtmlCollection(): Array<string> {
    let copiedList: Array<string> = new Array();
    for (var i = 0; i < this.editedElementList.length; i++) {
      copiedList.push(this.editedElementList[i].id);
    }
    return copiedList;
  }

  getDebugList(): void {
    console.log(this.usersList);
    console.log(this.editedElementList);
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
