import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(public loadingController: LoadingController) {}

  async presentLoading(
    loadingMessage: string = 'Please wait!',
    loadingDuration = 2000,
    callback: any = null
  ) {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: loadingMessage,
      duration: loadingDuration,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    if (callback) {
      callback();
    }
  }

  async presentLoadingWithOptions(
    loadingMessage: string,
    loadingDuration = 2000,
    loadingCssClass: string = null,
    loadingShowBackDrop: boolean = true,
    callback: any = null
  ) {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: loadingDuration,
      message: loadingMessage,
      translucent: true,
      cssClass: loadingCssClass,
      showBackdrop: loadingShowBackDrop,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    if (callback) {
      callback();
    }
  }
}
