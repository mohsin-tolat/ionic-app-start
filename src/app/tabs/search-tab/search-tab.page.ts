import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PagedResult } from 'src/shared/models/pagedResult';
import { UserDto } from 'src/shared/models/userDto.model';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.page.html',
  styleUrls: ['./search-tab.page.scss'],
})
export class SearchTabPage implements OnInit, OnDestroy {
  searchText = '';
  allUserBasedOnSearchPagedResult: PagedResult<UserDto>;
  currentPage: any;
  allNewUser: UserDto[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.currentPage = 1;
  }

  loadData(event) {
    setTimeout(() => {
      this.currentPage = this.allUserBasedOnSearchPagedResult.currentPage + 1;
      if (this.currentPage <= this.allUserBasedOnSearchPagedResult.pageCount) {
        this.appendNewUserBasedOnSearch(true, this.currentPage, 10);
        event.target.complete();
      } else {
        event.target.disabled = true;
      }
    }, 500);
  }

  searchUser() {
    if (this.searchText.length <= 3) {
      return;
    } else {
      this.allUserBasedOnSearchPagedResult = new PagedResult<UserDto>(1, 10);
      this.appendNewUserBasedOnSearch(false, 1, 10);
    }
  }

  appendNewUserBasedOnSearch(
    isAppend: boolean,
    pageNo: number,
    pageSize: number
  ) {
    this.userService
      .GetUserBasedOnSearch(this.searchText, pageNo, pageSize)
      .subscribe(
        result => {
          if (result) {
            this.allUserBasedOnSearchPagedResult = result;
            if (isAppend) {
              for (const item of this.allUserBasedOnSearchPagedResult.results) {
                this.allNewUser.push(item);
              }
            } else {
              this.allNewUser = this.allUserBasedOnSearchPagedResult.results;
            }
          }
        },
        err => {
          console.log('Error Occurred while getting the user list');
        }
      );
  }

  ngOnDestroy(): void {
    this.currentPage = 1;
  }
}
