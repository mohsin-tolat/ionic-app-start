import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabsService {
  private changeTabDataSource = new BehaviorSubject('');
  private isLoggedOutDataSource = new BehaviorSubject(false);

  constructor() {}

  changedTabData = this.changeTabDataSource.asObservable();
  isLoggedOutData = this.isLoggedOutDataSource.asObservable();

  changeTabs(data: any) {
    this.changeTabDataSource.next(data);
  }

  logout(isLoggedOut: boolean) {
    this.isLoggedOutDataSource.next(isLoggedOut);
  }
}
