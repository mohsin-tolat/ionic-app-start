import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonTabBar, MenuController } from '@ionic/angular';
import { LocalStorageService } from 'ngx-webstorage';
import { TabsService } from '../services/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  currentUserName: '';
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild(IonTabBar, { static: false }) tabBar: IonTabBar;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private menu: MenuController,
    private tabsService: TabsService
  ) {}

  logout() {
    if (this.menu.isOpen('first')) {
      this.menu.close('first');
    }

    this.tabsService.logout(true);
    this.localStorageService.clear();
    this.router.navigateByUrl('/');
  }

  tabButtonClicked(tabNumber: string) {
    this.currentUserName = this.localStorageService.retrieve('currentUserName');
    if (tabNumber === this.tabBar.selectedTab) {
      this.tabsService.changeTabs(tabNumber);
    }
  }
}
