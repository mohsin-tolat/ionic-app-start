import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AppConfig } from 'src/shared/appConfig';
import { CommentDto } from 'src/shared/models/commentDto.model';
import { PagedResult } from 'src/shared/models/pagedResult';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.page.html',
  styleUrls: ['./post-comments.page.scss'],
})
export class PostCommentsPage implements OnInit {
  postHashId: '';
  allComments: CommentDto[];
  currentPage: any;
  allPostBasedCommentsPagedResult: PagedResult<CommentDto>;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {
    this.route.queryParams.subscribe(params => {
      this.postHashId = params.postHashId;
      this.getPostComments();
    });
  }

  getPostComments() {
    this.allPostBasedCommentsPagedResult = new PagedResult<CommentDto>(
      1,
      AppConfig.Setting.COMMENTS_PAGE_SIZE
    );
    this.appendNewCommentsBasedOnPostHahId(
      false,
      1,
      AppConfig.Setting.COMMENTS_PAGE_SIZE
    );
  }

  doRefresh(event: any) {
    this.currentPage = 1;
    setTimeout(() => {
      this.allComments = [];
      this.appendNewCommentsBasedOnPostHahId(
        false,
        this.currentPage,
        AppConfig.Setting.POST_PAGE_SIZE_FOR_DASHBOARD
      );
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      this.currentPage = this.allPostBasedCommentsPagedResult.currentPage + 1;
      if (this.currentPage <= this.allPostBasedCommentsPagedResult.pageCount) {
        this.appendNewCommentsBasedOnPostHahId(
          true,
          this.currentPage,
          AppConfig.Setting.COMMENTS_PAGE_SIZE
        );
        event.target.complete();
      } else {
        event.target.complete();
      }
    }, 500);
  }

  appendNewCommentsBasedOnPostHahId(
    isAppend: boolean,
    pageNo: number,
    pageSize: number
  ) {
    this.postService
      .GetPostComments(this.postHashId, pageNo, pageSize)
      .subscribe(
        result => {
          if (result) {
            this.allPostBasedCommentsPagedResult = result;
            if (isAppend) {
              for (const item of this.allPostBasedCommentsPagedResult.results) {
                this.allComments.push(item);
              }
            } else {
              this.allComments = this.allPostBasedCommentsPagedResult.results;
            }
          }
        },
        err => {
          console.log('Error Occurred while getting the post based comments');
        }
      );
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}
