import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';
import { LocalStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { TabsService } from 'src/app/services/tabs.service';
import { AppConfig } from 'src/shared/appConfig';
import { ActivityDto } from 'src/shared/models/activityDto.model';
import { PagedResult } from 'src/shared/models/pagedResult';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.page.html',
  styleUrls: ['./user-notifications.page.scss'],
})
export class UserNotificationsPage implements OnInit, OnDestroy {
  constructor(
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private menuController: MenuController,
    private tabsService: TabsService
  ) {}

  pagedResult: PagedResult<ActivityDto>;
  allNewActivities: ActivityDto[] = [];
  currentPage: number;
  tabDataSubscription: Subscription[] = [];
  isFromScrollToTop = false;
  isNewUser = false;
  currentUserName = '';

  @ViewChild(IonContent, { static: false }) content: IonContent;

  ngOnInit(): void {
    this.currentPage = 1;
    this.allNewActivities = [];
    this.getNewActivities(
      this.currentPage,
      AppConfig.Setting.ACTIVITIES_PAGE_SIZE
    );
  }

  ionViewWillEnter() {
    this.currentUserName = this.localStorageService.retrieve('currentUserName');
    this.menuController.enable(false, 'first');

    this.handleScrollToTopWhenDoubleTab();
  }

  doRefresh(event: any) {
    this.currentPage = 1;
    setTimeout(() => {
      this.allNewActivities = [];
      this.getNewActivities(
        this.currentPage,
        AppConfig.Setting.ACTIVITIES_PAGE_SIZE
      );
      event.target.complete();
    }, 2000);
  }

  ionViewDidLeave() {
    this.isFromScrollToTop = false;
    this.tabDataSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  private handleScrollToTopWhenDoubleTab() {
    this.tabDataSubscription.push(
      this.tabsService.changedTabData.subscribe(tabNumber => {
        if (tabNumber === 'userNotifications') {
          this.tabsService.changeTabs('');
          this.scrollToTopAndRefreshData();
        }
      })
    );
  }

  getNewActivities(pageNo: number, pageSize: number) {
    this.postService.GetCurrentUserPostsActivities(pageNo, pageSize).subscribe(
      result => {
        if (result && result.results && result.results.length > 0) {
          this.pagedResult = result;
          for (const item of this.pagedResult.results) {
            this.allNewActivities.push(item);
          }
        } else {
          this.isNewUser = true;
        }
      },
      error => {
        console.error('Error occurred while getting new Activities.');
        console.error(error);
      }
    );
  }

  handleLogout() {
    this.tabDataSubscription.push(
      this.tabsService.isLoggedOutData.subscribe(isLoggedOut => {
        if (isLoggedOut) {
          this.tabsService.logout(false);
          this.scrollToTopAndRefreshData();
        }
      })
    );
  }

  scrollToTopAndRefreshData() {
    this.isFromScrollToTop = true;
    this.content.scrollToTop(1000);
    this.allNewActivities = [];
    this.currentPage = 1;
    this.getNewActivities(
      this.currentPage,
      AppConfig.Setting.ACTIVITIES_PAGE_SIZE
    );
  }

  ngOnDestroy(): void {
    this.currentPage = 1;
    this.pagedResult = null;
    this.allNewActivities = [];
  }
}
