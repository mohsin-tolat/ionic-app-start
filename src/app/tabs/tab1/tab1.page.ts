import { Component, OnInit } from '@angular/core';
import { PostDto } from 'src/shared/models/postDto';
import { PostService } from 'src/app/services/post.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(private postService: PostService) {}
  allPosts: any = [];

  ngOnInit(): void {
    this.postService.GetAllNewPosts().subscribe(
      result => {
        this.allPosts = result;
      },
      error => {
        console.error('Error occurred while getting new posts.');
        console.error(error);
      }
    );
  }
}
