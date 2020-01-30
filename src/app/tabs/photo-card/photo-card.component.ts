import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { PostDto } from './../../../shared/models/postDto';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
})
export class PhotoCardComponent implements OnInit {
  @Input()
  post: PostDto;

  constructor(
    private postService: PostService,
    private toastService: ToastService,
    private alertController: AlertController,
    private location: Location
  ) {}

  onLikeButtonClick(postHashId: string) {
    this.postService.LikePost(postHashId).subscribe(
      result => {
        if (result) {
          this.post = result;
        }
      },
      err => {
        console.error('Error Occurred in onLikeButtonClick');
      }
    );
  }

  onDeleteButtonClick() {
    this.postService.DeletePostByHashId(this.post.postHashId).subscribe(
      result => {
        if (result) {
          this.toastService.showToast('Post Detleted Successfully.');
          this.goBack();
        }
      },
      err => {
        console.error('Error Occurred in onDeleteButtonClick');
      }
    );
  }

  async presentDeleteConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this post.?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {},
        },
        {
          text: 'Okay',
          handler: () => {
            this.onDeleteButtonClick();
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}
