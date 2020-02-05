import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, fromEvent, merge, Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class NetworkService {
  private networkStatusDataSource = new BehaviorSubject(true);
  private networkStatus = this.networkStatusDataSource.asObservable();

  constructor(public network: Network, public platform: Platform) {
    if (this.platform.is('cordova')) {
      // on Device
      this.networkStatus = merge(
        this.network.onConnect().pipe(mapTo(true)),
        this.network.onDisconnect().pipe(mapTo(false))
      );
    } else {
      // on Browser
      this.networkStatus = merge(
        of(navigator.onLine),
        fromEvent(window, 'online').pipe(mapTo(true)),
        fromEvent(window, 'offline').pipe(mapTo(false))
      );
    }
  }

  public getNetworkType(): string {
    return this.network.type;
  }

  public getNetworkStatus(): Observable<boolean> {
    return this.networkStatus;
  }
}
