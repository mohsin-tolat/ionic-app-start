import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserDto } from 'src/shared/models/userDto.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit, OnDestroy {
  username: any;
  userHashId: any;
  userDetailsResponse: UserDto;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.queryParams.subscribe(params => {
      this.username = params.userName;
      this.userHashId = params.userHashId;
      this.getUserDetails();
    });
  }

  ngOnInit() {}

  getUserDetails() {
    this.userService.getUserDetails(this.userHashId).subscribe(
      result => {
        this.userDetailsResponse = result;
      },
      error => {
        console.error('Error Occurred while Getting User Details', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.userDetailsResponse = null;
    this.username = '';
    this.userHashId = '';
  }
}
