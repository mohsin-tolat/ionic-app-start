import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, UrlConfig } from 'src/shared/appConfig';
import { Observable } from 'rxjs';
import { PostDto } from 'src/shared/models/postDto';

@Injectable()
export class PostService {
  constructor(private httpClient: HttpClient) {}

  public GetAllNewPosts(pageNo: number, pageSize: number): any {
    const url =
      UrlConfig.GET_ALL_NEW_POSTS_URL +
      10 +
      '?pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;
    return this.httpClient.get(url);
  }
}
