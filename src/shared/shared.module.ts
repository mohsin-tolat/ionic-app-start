import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from './../app/services/loading.service';
import { ToastService } from './../app/services/toast.service';
import { PostService } from './../app/services/post.service';
import { UserService } from './../app/services/user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LoadingService, ToastService, PostService, UserService],
})
export class SharedModule {}
