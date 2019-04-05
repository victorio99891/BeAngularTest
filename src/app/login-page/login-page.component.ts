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

  @Input()
  userModel: UserModel;

  @Output()
  emitUserModel = new EventEmitter<UserModel>();

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService
  ) {
    this.loginInput = 't4.email@be-tse.com';
    this.passwordInput = 'qwe123!';
  }

  ngOnInit() {}

  login(): void {
    const isExpired: boolean = this.loginService.isTokenExpired(
      this.cookieService.get('JWT'),
      this.loginInput
    );

    if (isExpired) {
      this.cookieService.delete('JWT');
      this.loginService
        .getTokenAndUser(this.loginInput, this.passwordInput)
        .subscribe(response => {
          this.userModel = response.body;
          this.cookieService.set('JWT', response.headers.get('authorization'));
        });
      setTimeout(() => {
        this.emitUser();
        console.log('Emitted!');
      }, 1000);
    }
  }

  emitUser() {
    this.emitUserModel.emit(this.userModel);
    console.log('User model in login page:');
    console.log(this.userModel);
  }
}
