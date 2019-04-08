import { CookieService } from 'ngx-cookie-service';

export class APIHeaders {
  headers = {
    Authorization: this.cookieService.get('JWT')
  };

  options = {
    headers: this.headers
  };

  constructor(private cookieService: CookieService) {}

  public get() {
    return this.options;
  }
}
