import { Component, OnInit, Input } from '@angular/core';
import { PostDto } from 'src/shared/models/postDto';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
})
export class PhotoCardComponent implements OnInit {
  @Input()
  post: PostDto;

  constructor() {}

  ngOnInit() {}
}
