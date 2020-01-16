import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, UrlConfig } from 'src/shared/appConfig';

@Injectable()
export class PostService {
  constructor(private httpClient: HttpClient) {}

  public GetAllNewPosts() {
    const url = UrlConfig.GET_ALL_NEW_POSTS_URL + 10;
    return this.httpClient.get(url);
  }
}
