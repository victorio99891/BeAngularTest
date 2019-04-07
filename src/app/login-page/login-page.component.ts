import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../models/UserModel';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  message: string;
  isLoginSuccess: boolean;
  loginInput: string;
  passwordInput: string;

  userModel: UserModel;

  @Output()
  emitUserModel = new EventEmitter<UserModel>();

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginInput = 't4.email@be-tse.com';
    this.passwordInput = 'qwe123!';
  }

  login(): void {
    if (this.cookieService.get('CURRENT_USER') !== this.loginInput) {
      this.cookieService.delete('JWT');
      this.loginService
        .getTokenAndUser(this.loginInput, this.passwordInput)
        .subscribe(
          response => {
            this.isLoginSuccess = true;
            this.message = 'Success login!';
            this.userModel = response.body;
            this.cookieService.set(
              'JWT',
              response.headers.get('authorization')
            );
            this.cookieService.set('CURRENT_USER', response.body.email);
            this.loginService.loggedUser = this.userModel;
            this.emitUser(this.userModel);
            if (this.isLoginSuccess) {
              timer(1000).subscribe(i => {
                this.router.navigate(['/main-pannel']);
              });
            }
          },
          error => {
            if (error.status === 403) {
              this.isLoginSuccess = false;
              this.message = 'Bad credentials!';
            }
            this.cookieService.deleteAll();
          }
        );
    }
  }

  emitUser(userModel: UserModel) {
    this.emitUserModel.emit(userModel);
    console.log('User model in login page:');
    console.log(this.userModel);
  }
}
