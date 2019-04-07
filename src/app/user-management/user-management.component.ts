import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from './../models/UserModel';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  userModel: UserModel;

  constructor(private loginService: LoginService) {
    this.userModel = this.loginService.loggedUser;
  }

  ngOnInit() {}
}
