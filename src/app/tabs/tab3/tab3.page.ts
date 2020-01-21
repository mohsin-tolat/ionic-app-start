import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  logout() {
    this.localStorageService.clear();
    this.router.navigateByUrl('/');
  }
}
