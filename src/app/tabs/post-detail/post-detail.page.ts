import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { PostDto } from 'src/shared/models/postDto';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {
  postDetails: PostDto;
  postHashId: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private postService: PostService
  ) {
    this.route.queryParams.subscribe(params => {
      this.postHashId = params.postHashId;
      this.getPostDetails();
    });
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  getPostDetails() {
    this.postService.GetPostByHashId(this.postHashId).subscribe(
      result => {
        this.postDetails = result;
      },
      err => {
        console.error('Error Has occurred while getting postDetails', err);
      }
    );
  }
}
