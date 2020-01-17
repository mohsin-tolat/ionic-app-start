import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlConfig } from 'src/shared/appConfig';
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
}
