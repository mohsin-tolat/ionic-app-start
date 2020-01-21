import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig, UrlConfig } from 'src/shared/appConfig';
import { Observable } from 'rxjs';
import { PostDto } from 'src/shared/models/postDto';
import { PagedResult } from 'src/shared/models/pagedResult';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class PostService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public GetAllNewPosts(
    pageNo: number,
    pageSize: number
  ): Observable<PagedResult<PostDto>> {
    const url =
      UrlConfig.GET_ALL_NEW_POSTS_URL +
      '?pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;
    return this.httpClient.get<PagedResult<PostDto>>(url, this.httpOptions);
  }

  public LikePost(postId: number) {
    const url = UrlConfig.POST_LIKEPOST_URL + '/' + postId;
    return this.httpClient.post<PagedResult<PostDto>>(url, this.httpOptions);
  }
}
