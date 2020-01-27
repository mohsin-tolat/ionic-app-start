import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostDto } from 'src/shared/models/postDto';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
})
export class PhotoCardComponent implements OnInit {
  @Input()
  post: PostDto;

  constructor(private postService: PostService) {}

  onLikeButtonClick(postHashId: string) {
    this.postService.LikePost(postHashId).subscribe(
      result => {
        if (result) {
          this.post = result;
        }
      },
      err => {
        console.error('Error Occurred in onLikeButtonClick');
      }
    );
  }

  ngOnInit() {}
}
