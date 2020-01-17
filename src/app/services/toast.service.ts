import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async showToast(
    toastMessage: string,
    callback: any = null,
    toastDuration = 2000,
    displayCloseButton = false
  ) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: displayCloseButton ? null : toastDuration,
      showCloseButton: displayCloseButton,
    });

    toast.onDidDismiss();

    toast.present();
    if (callback) {
      callback();
    }
  }

  async showToastWithOptions(
    toastHeader: string,
    toastMessage: string,
    callback: any = null,
    toastDuration = 2000,
    displayCloseButton: boolean = false,
    closeButtonTxt: string = ''
  ) {
    const toast = await this.toastController.create({
      header: toastHeader,
      message: toastMessage,
      duration: displayCloseButton ? null : toastDuration,
      closeButtonText: closeButtonTxt,
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();

    if (callback) {
      callback();
    }
  }
}
