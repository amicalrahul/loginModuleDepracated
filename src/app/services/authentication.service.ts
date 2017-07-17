import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  baseAddress = 'http://pluralsightcourseviewer.azurewebsites.net/';
  apiAccountBase = this.baseAddress + 'api/Account/';
  userName = (localStorage['userName'] ? localStorage['userName'] : '');
  loggedIn = (localStorage['login'] && this.userName !== '' ? true : false);

  constructor(private _http: Http) { }

  register(registerModel: any): Observable<any> {
    return this._http.get(this.apiAccountBase)
            .map(this.mapResponse)
            .catch(this.handleError);
  }
  login(userName: string , password: string): Observable<any> {
    const payload = 'password=' + encodeURIComponent(password)
                + '&grant_type=password&username=' + encodeURIComponent(userName);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }); // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers }); // Create a request option

    return this._http.post(this.baseAddress + 'Token', payload, options)
        .map(response => {
          localStorage['login'] = response.json().access_token;
          localStorage['userName'] = userName;
          this.loggedIn = true;
          this.userName = userName;
          return userName;
        })
        .catch(this.handleError);
  }
  logout(): void {
      localStorage.removeItem('login');
      localStorage.removeItem('userName');
      this.loggedIn = false;
      this.userName = '';
  }

  getAccessToken(): any {
    let accessToken = '';
    const login = localStorage['login'];
    if (login) {
        accessToken = login;
    }
    return accessToken;
  }
  private mapResponse(response: Response) {
      return response.json();
  }
  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
}
