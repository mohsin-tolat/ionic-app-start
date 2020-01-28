import { Component, OnDestroy, OnInit } from '@angular/core';
import { PagedResult } from './../../../shared/models/pagedResult';
import { PostDto } from './../../../shared/models/postDto';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  constructor(private postService: PostService) {}
  pagedResult: PagedResult<PostDto>;
  allNewPosts: PostDto[] = [];
  currentPage: number;

  ngOnInit(): void {
    this.currentPage = 1;
    this.getNewPosts(this.currentPage, 10);
  }

  loadData(event) {
    setTimeout(() => {
      this.currentPage = this.pagedResult.currentPage + 1;
      if (this.currentPage <= this.pagedResult.pageCount) {
        this.getNewPosts(this.currentPage, 10);
        event.target.complete();
      } else {
        event.target.complete();
      }
    }, 500);
  }

  getNewPosts(pageNo: number, pageSize: number) {
    this.postService.GetAllNewPosts(pageNo, pageSize).subscribe(
      result => {
        if (result) {
          this.pagedResult = result;
          for (const item of this.pagedResult.results) {
            this.allNewPosts.push(item);
          }
        }
      },
      error => {
        console.error('Error occurred while getting new posts.');
        console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.currentPage = 1;
    this.pagedResult = null;
    this.allNewPosts = [];
  }
}
