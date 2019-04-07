import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-current-user-pannel',
  templateUrl: './current-user-pannel.component.html',
  styleUrls: ['./current-user-pannel.component.css']
})
export class CurrentUserPannelComponent implements OnInit {

  userModel: UserModel;

  constructor(private loginService: LoginService) {
    this.userModel = this.loginService.loggedUser;
  }

  ngOnInit() {
  }

  logOut() {
    this.loginService.logOutCurrentUser();
  }

}
