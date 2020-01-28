import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { UserDto } from './../../../shared/models/userDto.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit, OnDestroy {
  username: any;
  userHashId: any;
  userDetailsResponse: UserDto;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {
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

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.userDetailsResponse = null;
    this.username = '';
    this.userHashId = '';
  }

  public updateUserDetails(userHashId: string) {
    this.userHashId = userHashId;
    this.getUserDetails();
  }
}
