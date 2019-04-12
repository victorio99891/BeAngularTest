import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { UserModel } from '../../models/UserModel';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { DepartmentService } from '../../services/department.service';
import { timer } from 'rxjs';

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
    const htmlCollection = this.getCopyOfHtmlCollection(this.editedElementList);
    if (htmlCollection.length !== 0) {
      this.manageDisabledInputFieldsById(htmlCollection, true);
      this.submitDataButtonNotActive = true;
      this.sentDataButtonNotActive = false;
    }
  }

  sentData() {
    if (confirm('ARE YOU SURE TO MAKE CHANGES?')) {
      const htmlCollection = this.getCopyOfHtmlCollection(
        this.editedElementList
      );
      for (const targetElementID of htmlCollection) {
        const inputField = document.getElementById(targetElementID);
        inputField.classList.remove('editedField');
        inputField.classList.add('submittedField');
      }

      // CALL API - BUT MOCKED
      timer(2000).subscribe(event => {
        this.reladUserList();
      });
    } else {
      console.log('NO');
    }
    this.sentDataButtonNotActive = true;
  }

  reladUserList() {
    this.editedElementList = document.getElementsByClassName('submittedField');
    const htmlCollection: Array<string> = this.getCopyOfHtmlCollection(
      this.editedElementList
    );

    for (const targetElementID of htmlCollection) {
      const inputField = document.getElementById(targetElementID);
      inputField.classList.remove('submittedField');
      inputField.classList.add('normalField');
    }

    this.manageDisabledInputFieldsById(htmlCollection, false);
    this.submitDataButtonNotActive = false;
    this.sentDataButtonNotActive = true;
  }

  manageDisabledInputFieldsById(
    htmlCollection: Array<string>,
    isDisabled: boolean
  ) {
    for (const targetElementID of htmlCollection) {
      const inputElement = document.getElementById(targetElementID)
        .firstChild as HTMLInputElement;
      inputElement.disabled = isDisabled;
    }
  }

  getCopyOfHtmlCollection(htmlCollection: HTMLCollection): Array<string> {
    let copiedList: Array<string> = new Array();
    for (var i = 0; i < htmlCollection.length; i++) {
      copiedList.push(htmlCollection[i].id);
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
