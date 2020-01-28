import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig, UrlConfig } from './../../shared/appConfig';
import { Observable } from 'rxjs';
import { PostDto } from './../../shared/models/postDto';
import { PagedResult } from './../../shared/models/pagedResult';
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
      UrlConfig.GET_AllNewPosts + '?pageNo=' + pageNo + '&pageSize=' + pageSize;
    return this.httpClient.get<PagedResult<PostDto>>(url, this.httpOptions);
  }

  public LikePost(postHashId: string): Observable<PostDto> {
    const url = UrlConfig.POST_LikeDislikePost + '/' + postHashId;
    return this.httpClient.post<PostDto>(url, this.httpOptions);
  }
}
