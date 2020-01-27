import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDto } from 'src/shared/models/userDto.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  isUserFollowSuccess = false;

  @Input()
  userDetails: UserDto;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  public followUser(followingUserId: number) {
    this.userService.followUser(followingUserId).subscribe(
      result => {
        this.userDetails.isAlreadyFollowed = result;
        this.isUserFollowSuccess = true;
        setTimeout(() => {
          this.isUserFollowSuccess = false;
        }, 1000);
      },
      err => {
        console.error('Error occrred while following user', err);
      }
    );
  }
}
