import { Component } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  currentUserName: '';
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private menu: MenuController
  ) {
    this.currentUserName = this.localStorageService.retrieve('currentUserName');
  }

  logout() {
    if (this.menu.isOpen('first')) {
      this.menu.close('first');
    }

    this.localStorageService.clear();
    this.router.navigateByUrl('/');
  }
}
