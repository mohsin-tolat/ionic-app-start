import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { UrlConfig } from './../../shared/appConfig';
import { PagedResult } from './../../shared/models/pagedResult';
import { PostDto } from './../../shared/models/postDto';

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

  public GetAllOpenPosts(userId: string, pageNo: number, pageSize: number) {
    const url =
      UrlConfig.GET_AllOpenPosts +
      '?userHashId=' +
      userId +
      '&pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;
    return this.httpClient.get<PagedResult<PostDto>>(url, this.httpOptions);
  }

  public GetPostByHashId(postHashId: string): Observable<PostDto> {
    const url = UrlConfig.GET_PostByHashId + '?postHashId=' + postHashId;
    return this.httpClient.get<PostDto>(url, this.httpOptions);
  }
}
