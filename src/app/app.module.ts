import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './sub-main/login-page/login-page.component';
import { UserManagementComponent } from './sub-main/user-management/user-management.component';
import { AuthGuard } from './services/auth-guard.service';
import { LoginService } from './services/login.service';
import { SubMainComponent } from './sub-main/sub-main.component';
import { CurrentUserPannelComponent } from './header/current-user-pannel/current-user-pannel.component';
import { UserService } from './services/user.service';
import { DepartmentService } from './services/department.service';
import { NavigationBarComponent } from './header/navigation-bar/navigation-bar.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'main-pannel',
    component: SubMainComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserManagementComponent,
    SubMainComponent,
    CurrentUserPannelComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CookieService,
    UserService,
    DepartmentService,
    LoginService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
