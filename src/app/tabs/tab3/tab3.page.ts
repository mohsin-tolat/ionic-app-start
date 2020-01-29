import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from 'src/app/services/user.service';
import { UserDto } from 'src/shared/models/userDto.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  username: any;
  userHashId: any;
  userDetailsResponse: UserDto;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private location: Location
  ) {}

  public updateUserDetails(userHashId: string) {
    this.getCurrentUserprofile();
  }

  ionViewWillEnter() {
    this.username = this.localStorageService.retrieve('currentUserName');
    this.getCurrentUserprofile();
  }

  getCurrentUserprofile() {
    this.userService.getCurrentUserprofile().subscribe(
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

  // logout() {
  //   this.localStorageService.clear();
  //   this.router.navigateByUrl('/');
  // }
}
