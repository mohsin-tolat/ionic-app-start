import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { TabsService } from 'src/app/services/tabs.service';
import { LoadingService } from './../app/services/loading.service';
import { PostService } from './../app/services/post.service';
import { ToastService } from './../app/services/toast.service';
import { UserService } from './../app/services/user.service';
import { AuthGuard } from './guards/auth-guard.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, MomentModule],
  providers: [
    LoadingService,
    ToastService,
    PostService,
    UserService,
    AuthGuard,
    TabsService,
  ],
  exports: [MomentModule],
})
export class SharedModule {}
