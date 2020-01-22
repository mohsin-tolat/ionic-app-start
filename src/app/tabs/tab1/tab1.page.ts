import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostDto } from 'src/shared/models/postDto';
import { PostService } from 'src/app/services/post.service';
import { Subscriber } from 'rxjs';
import { PagedResult } from 'src/shared/models/pagedResult';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  updatedPost: PostDto;
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
        event.target.disabled = true;
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
  }
}
