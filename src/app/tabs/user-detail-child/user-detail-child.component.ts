import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from './../../../app/services/user.service';
import { PagedResult } from './../../../shared/models/pagedResult';
import { PostDto } from './../../../shared/models/postDto';
import { UserDto } from './../../../shared/models/userDto.model';

@Component({
  selector: 'app-user-detail-child',
  templateUrl: './user-detail-child.component.html',
  styleUrls: ['./user-detail-child.component.scss'],
})
export class UserDetailChildComponent implements OnInit {
  @Input()
  userDetails: UserDto;

  allUserPostPagedResult: PagedResult<PostDto>;
  currentPage: any;
  allUserPosts: PostDto[];

  @Output() userHashIdEmitter = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.allUserPostPagedResult = new PagedResult<PostDto>(
      this.userDetails.userPostPageNo,
      this.userDetails.userPostPageSize,
      this.userDetails.userPostPageCount
    );
    this.allUserPosts = this.userDetails.allUserPosts;
  }

  loadData(event) {
    setTimeout(() => {
      this.currentPage = this.allUserPostPagedResult.currentPage + 1;
      if (this.currentPage <= this.allUserPostPagedResult.pageCount) {
        this.appendNewUserBasedOnSearch(
          this.userDetails.userHashId,
          this.currentPage,
          15
        );
        event.target.complete();
      } else {
        event.target.complete();
      }
    }, 500);
  }

  appendNewUserBasedOnSearch(userId: string, pageNo: number, pageSize: number) {
    this.postService.GetAllOpenPosts(userId, pageNo, pageSize).subscribe(
      result => {
        if (result) {
          this.allUserPostPagedResult = result;

          for (const item of this.allUserPostPagedResult.results) {
            this.allUserPosts.push(item);
          }
        }
      },
      err => {
        console.log('Error Occurred while getting the user list', err);
      }
    );
  }

  public followUser(followingUserId: number) {
    this.userService.followUser(followingUserId).subscribe(
      result => {
        this.userDetails.isAlreadyFollowed = true;
        this.userHashIdEmitter.emit(this.userDetails.userHashId);
      },
      err => {
        console.error('Error occrred while following user', err);
      }
    );
  }

  public unFollowUser(followingUserId: number) {
    this.userService.unFollowUser(followingUserId).subscribe(
      result => {
        this.userDetails.isAlreadyFollowed = false;
        this.userHashIdEmitter.emit(this.userDetails.userHashId);
      },
      err => {
        console.error('Error occrred while following user', err);
      }
    );
  }
}
