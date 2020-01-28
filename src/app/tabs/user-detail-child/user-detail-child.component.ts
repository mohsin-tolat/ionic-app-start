import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from './../../../app/services/user.service';
import { UserDto } from './../../../shared/models/userDto.model';

@Component({
  selector: 'app-user-detail-child',
  templateUrl: './user-detail-child.component.html',
  styleUrls: ['./user-detail-child.component.scss'],
})
export class UserDetailChildComponent implements OnInit {
  @Input()
  userDetails: UserDto;

  @Output() userHashIdEmitter = new EventEmitter<string>();

  constructor(private userService: UserService) {}

  ngOnInit() {}

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
