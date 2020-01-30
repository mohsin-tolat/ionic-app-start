import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/Camera/ngx';
import { ActionSheetController, MenuController } from '@ionic/angular';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';
import { UploadPostDto } from 'src/shared/models/postDto';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  currentImage: any;
  croppedImagepath = '';
  isLoading = false;
  imageData = '';

  constructor(
    public postService: PostService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private toastService: ToastService,
    private menuController: MenuController
  ) {}

  ngOnInit(): void {}

  pickImage(sourceType: any) {
    this.camera
      .getPicture({
        sourceType,
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      })
      .then(
        imageData => {
          this.imageData = 'data:image/jpeg;base64,' + imageData;
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          // let base64Image = 'data:image/jpeg;base64,' + imageData;
        },
        err => {
          this.imageData = '';
          // Handle error
          console.error(err);
        }
      );
  }

  ionViewWillEnter() {
    this.menuController.enable(false, 'first');
  }

  uploadImage() {
    if (!this.imageData) {
      return;
    }

    const postData = new UploadPostDto();
    postData.description = 'test';
    postData.imageContent = this.imageData;

    this.postService.UploadPost(postData).subscribe(
      result => {
        if (result) {
          this.imageData = '';
          this.toastService.showToast('Post Upload Successfully.');
        }
      },
      err => {
        this.toastService.showToast(
          'Something went wrong, Please try again later.'
        );

        console.error('Error Occurred while uploading post!', err);
      }
    );
  }

  removeImage() {
    this.imageData = '';
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
}
