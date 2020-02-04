import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityDto } from 'src/shared/models/activityDto.model';
import { CommentDto } from 'src/shared/models/commentDto.model';
import { UrlConfig } from './../../shared/appConfig';
import { PagedResult } from './../../shared/models/pagedResult';
import { PostDto, UploadPostDto } from './../../shared/models/postDto';

@Injectable()
export class PostService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

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

  public UploadPost(postDetails: UploadPostDto): Observable<boolean> {
    const url = UrlConfig.POST_UploadPost;
    return this.httpClient.post<boolean>(url, postDetails, this.httpOptions);
  }

  public DeletePostByHashId(postHashId: string): Observable<boolean> {
    const url =
      UrlConfig.DELETE_PostFromDatabaseAndStorage + '?postHashId=' + postHashId;
    return this.httpClient.delete<boolean>(url, this.httpOptions);
  }

  public GetCurrentUserPostsActivities(
    pageNo: number,
    pageSize: number
  ): Observable<PagedResult<ActivityDto>> {
    const url =
      UrlConfig.GET_CurrentUserPostsActivities +
      '?pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;
    return this.httpClient.get<PagedResult<ActivityDto>>(url, this.httpOptions);
  }

  public GetPostComments(
    postHashId: string,
    pageNo: number,
    pageSize: number
  ): Observable<PagedResult<CommentDto>> {
    const url =
      UrlConfig.GET_CurrentUserPostsActivities +
      '?pageNo=' +
      pageNo +
      '&pageSize=' +
      pageSize;
    return this.httpClient.get<PagedResult<CommentDto>>(url, this.httpOptions);
  }
}
