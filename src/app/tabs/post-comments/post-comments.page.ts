import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'ngx-webstorage';
import { PostService } from 'src/app/services/post.service';
import { AppConfig } from 'src/shared/appConfig';
import {
  CommentDto,
  UpdateCommentModel,
} from 'src/shared/models/commentDto.model';
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
  currentUserAvatar = '';
  userComment = '';

  public get isValidComment(): boolean {
    return this.userComment && this.userComment.trim() ? true : false;
  }

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location,
    private localStorageService: LocalStorageService,
    private alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      this.postHashId = params.postHashId;
      this.getPostComments();
    });

    this.currentUserAvatar = this.localStorageService.retrieve(
      'userAvatarLink'
    );
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
        AppConfig.Setting.COMMENTS_PAGE_SIZE
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

  addComment() {
    const comment = new UpdateCommentModel();
    comment.content = this.userComment.trim();
    comment.postHashId = this.postHashId;
    this.postService.AddComment(comment).subscribe(
      result => {
        this.userComment = '';

        if (result) {
          this.currentPage = 1;
          this.allComments = [];
          this.appendNewCommentsBasedOnPostHahId(
            false,
            this.currentPage,
            AppConfig.Setting.COMMENTS_PAGE_SIZE
          );
        }
      },
      error => {
        console.log('Error Occurred while Adding comment on the post');
      }
    );
  }

  deleteComment(postCommentHashId: string) {
    this.postService.DeletePostComment(postCommentHashId).subscribe(
      result => {
        this.userComment = '';

        if (result) {
          this.currentPage = 1;
          this.allComments = [];
          this.appendNewCommentsBasedOnPostHahId(
            false,
            this.currentPage,
            AppConfig.Setting.COMMENTS_PAGE_SIZE
          );
        }
      },
      error => {
        console.log('Error Occurred while Deleting comment on the post');
      }
    );
  }

  async presentDeleteConfirm(postHashId: string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this Comment.?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {},
        },
        {
          text: 'Okay',
          handler: () => {
            this.deleteComment(postHashId);
          },
        },
      ],
    });

    await alert.present();
  }

  onLikeButtonClick(commentHashId: string, commentIdentifier: string) {
    this.postService.LikeComment(commentHashId, commentIdentifier).subscribe(
      response => {
        const foundComment = this.allComments.find(x => {
          return x.commentIdentifier === response.commentIdentifier;
        });

        const foundCommentIndex = this.allComments.indexOf(foundComment);
        this.allComments[foundCommentIndex] = response;
      },
      error => {
        console.error('Error Occurred while Like/Dislike comments', error);
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
