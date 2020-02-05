import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { MomentModule } from 'ngx-moment';
import { NetworkService } from 'src/app/services/network.service';
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
    NetworkService,
    Network,
  ],
  exports: [MomentModule],
})
export class SharedModule {}
