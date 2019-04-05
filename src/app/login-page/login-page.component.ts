import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  message: string;
  isError: boolean;
  loginInput: string;
  passwordInput: string;

  userModel: UserModel;

  @Output()
  emitUserModel = new EventEmitter<UserModel>();

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.loginInput = 't4.email@be-tse.com';
    this.passwordInput = 'qwe123!';
  }

  login(): void {
    const isExpired: boolean = this.loginService.isTokenExpired(
      this.cookieService.get('JWT')
    );

    if (
      // isExpired &&
      this.cookieService.get('CURRENT_USER') !== this.loginInput
    ) {
      this.cookieService.delete('JWT');
      this.loginService
        .getTokenAndUser(this.loginInput, this.passwordInput)
        .subscribe(response => {
          this.userModel = response.body;
          this.cookieService.set('JWT', response.headers.get('authorization'));
          this.cookieService.set('CURRENT_USER', response.body.email);
          this.emitUser(this.userModel);
        });
    }
  }

  emitUser(userModel: UserModel) {
    this.emitUserModel.emit(userModel);
    console.log('User model in login page:');
    console.log(this.userModel);
  }
}
