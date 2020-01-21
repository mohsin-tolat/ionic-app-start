import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConfig } from 'src/shared/appConfig';
import {
  AuthenticateModel,
  LoggedInUserModel,
} from 'src/shared/models/authenticateModel';
import { UserRegistration } from 'src/shared/models/userRegistration';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public AddNewUser(registrationDetails: UserRegistration): any {
    const url = UrlConfig.POST_ADD_NEW_USER_URL;
    return this.httpClient.post(url, registrationDetails, this.httpOptions);
  }

  public IsLoggednIn(): Observable<boolean> {
    return this.httpClient.get<boolean>(UrlConfig.GET_CHECK_AUTHORIZATION_URL);
  }

  public Login(
    authenticateModel: AuthenticateModel
  ): Observable<LoggedInUserModel> {
    const url = UrlConfig.POST_AUTHENTICATE;
    return this.httpClient.post<LoggedInUserModel>(
      url,
      authenticateModel,
      this.httpOptions
    );
  }
}
