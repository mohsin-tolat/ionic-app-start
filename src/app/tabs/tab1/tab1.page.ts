import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';
import { LocalStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { NetworkService } from 'src/app/services/network.service';
import { TabsService } from 'src/app/services/tabs.service';
import { AppConfig } from 'src/shared/appConfig';
import { PagedResult } from './../../../shared/models/pagedResult';
import { PostDto } from './../../../shared/models/postDto';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  constructor(
    private postService: PostService,
    private menuController: MenuController,
    private tabsService: TabsService,
    private localStorageService: LocalStorageService,
    private networkService: NetworkService
  ) {}

  @ViewChild(IonContent, { static: false }) content: IonContent;

  pagedResult: PagedResult<PostDto>;
  allNewPosts: PostDto[] = [];
  currentPage: number;
  tabDataSubscription: Subscription[] = [];
  isFromScrollToTop = false;
  // isNewUser = false;
  currentUserName = '';
  networkCheckSunscription: Subscription;
  isNetworkConnected: boolean;

  ngOnInit(): void {
    this.currentPage = 1;
    this.allNewPosts = [];
    this.getNewPosts(
      this.currentPage,
      AppConfig.Setting.POST_PAGE_SIZE_FOR_DASHBOARD
    );
  }

  subscribeToNetworkCheck() {
    this.networkCheckSunscription = this.networkService
      .getNetworkStatus()
      .subscribe(isConnected => {
        this.isNetworkConnected = isConnected;
      });
  }

  doRefresh(event: any) {
    this.currentPage = 1;
    setTimeout(() => {
      this.allNewPosts = [];
      this.getNewPosts(
        this.currentPage,
        AppConfig.Setting.POST_PAGE_SIZE_FOR_DASHBOARD
      );
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    this.currentUserName = this.localStorageService.retrieve('currentUserName');
    this.menuController.enable(false, 'first');
    this.handleLogout();
    this.handleScrollToTopWhenDoubleTab();
    this.subscribeToNetworkCheck();
  }

  private handleScrollToTopWhenDoubleTab() {
    this.tabDataSubscription.push(
      this.tabsService.changedTabData.subscribe(tabNumber => {
        if (tabNumber === 'tab1') {
          this.tabsService.changeTabs('');
          this.scrollToTopAndRefreshData();
        }
      })
    );
  }

  ionViewDidLeave() {
    this.isFromScrollToTop = false;
    this.networkCheckSunscription.unsubscribe();
    this.tabDataSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  loadData(event) {
    if (this.isFromScrollToTop) {
      this.isFromScrollToTop = false;
      event.target.complete();
    } else {
      setTimeout(() => {
        this.currentPage = this.pagedResult.currentPage + 1;
        if (this.currentPage <= this.pagedResult.pageCount) {
          this.getNewPosts(
            this.currentPage,
            AppConfig.Setting.POST_PAGE_SIZE_FOR_DASHBOARD
          );
          event.target.complete();
        } else {
          event.target.complete();
        }
      }, 500);
    }
  }

  getNewPosts(pageNo: number, pageSize: number) {
    this.postService.GetAllNewPosts(pageNo, pageSize).subscribe(
      result => {
        if (result && result.results && result.results.length > 0) {
          this.pagedResult = result;
          for (const item of this.pagedResult.results) {
            this.allNewPosts.push(item);
          }
        }
        // else {
        //   this.isNewUser = true;
        // }
      },
      error => {
        console.error('Error occurred while getting new posts.');
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
    this.allNewPosts = [];
    this.currentPage = 1;
    this.getNewPosts(
      this.currentPage,
      AppConfig.Setting.POST_PAGE_SIZE_FOR_DASHBOARD
    );
  }

  ngOnDestroy(): void {
    this.currentPage = 1;
    this.pagedResult = null;
    this.allNewPosts = [];
  }
}
