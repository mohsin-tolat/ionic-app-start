import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
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
    private tabsService: TabsService
  ) {}

  @ViewChild(IonContent, { static: false }) content: IonContent;

  pagedResult: PagedResult<PostDto>;
  allNewPosts: PostDto[] = [];
  currentPage: number;
  tabDataSubscription: Subscription[] = [];

  ngOnInit(): void {
    this.currentPage = 1;
    this.allNewPosts = [];
    this.getNewPosts(
      this.currentPage,
      AppConfig.Setting.POST_PAGE_SIZE_FOR_DASHBOARD
    );
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
    this.menuController.enable(false, 'first');
    this.handleLogout();
    this.handleScrollToTopWhenDoubleTab();
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
    this.tabDataSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  loadData(event) {
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

  getNewPosts(pageNo: number, pageSize: number) {
    this.postService.GetAllNewPosts(pageNo, pageSize).subscribe(
      result => {
        if (result) {
          this.pagedResult = result;
          for (const item of this.pagedResult.results) {
            const found = this.allNewPosts.some(
              el => el.postHashId === item.postHashId
            );
            if (!found) {
              this.allNewPosts.push(item);
            }
          }
        }
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
