import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConfig } from './../../shared/appConfig';
import {
  AuthenticateModel,
  LoggedInUserModel,
} from './../../shared/models/authenticateModel';
import { PagedResult } from './../../shared/models/pagedResult';
import { UserDto } from './../../shared/models/userDto.model';
import { UserRegistration } from './../../shared/models/userRegistration';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public AddNewUser(registrationDetails: UserRegistration): any {
    const url = UrlConfig.POST_AddNewUser;
    return this.httpClient.post(url, registrationDetails, this.httpOptions);
  }

  public IsLoggednIn(): Observable<boolean> {
    return this.httpClient.get<boolean>(UrlConfig.GET_Check_Authorization);
  }

  public Login(
    authenticateModel: AuthenticateModel
  ): Observable<LoggedInUserModel> {
    const url = UrlConfig.POST_Authenticate;
    return this.httpClient.post<LoggedInUserModel>(
      url,
      authenticateModel,
      this.httpOptions
    );
  }

  public GetUserBasedOnSearch(
    searchText: string,
    pageNo: number,
    pageSize: number
  ): Observable<PagedResult<UserDto>> {
    const url =
      UrlConfig.GET_UserListBasedOnSearch +
      '?searchText=' +
      searchText +
      '&pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;

    return this.httpClient.get<PagedResult<UserDto>>(url, this.httpOptions);
  }

  followUser(followingUserId: number): Observable<boolean> {
    const url =
      UrlConfig.POST_FollowUser + '?followingUserHashId=' + followingUserId;

    return this.httpClient.post<boolean>(url, this.httpOptions);
  }

  unFollowUser(followingUserId: number): Observable<boolean> {
    const url =
      UrlConfig.POST_UnFollowUser + '?followingUserHashId=' + followingUserId;

    return this.httpClient.post<boolean>(url, this.httpOptions);
  }

  getUserDetails(userHashId: any): Observable<UserDto> {
    const url = UrlConfig.GET_UserDetails + '?userHashId=' + userHashId;

    return this.httpClient.get<UserDto>(url, this.httpOptions);
  }

  getCurrentUserprofile(): Observable<UserDto> {
    const url = UrlConfig.GET_CurrentUserProfile;

    return this.httpClient.get<UserDto>(url, this.httpOptions);
  }
}
