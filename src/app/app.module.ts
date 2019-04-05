import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { CookieService } from "ngx-cookie-service";

import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, MainComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
