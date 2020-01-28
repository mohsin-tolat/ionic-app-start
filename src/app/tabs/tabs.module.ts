import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TimeagoModule } from 'ngx-timeago';
import { PostService } from '../services/post.service';
import { SharedModule } from './../../shared/shared.module';
import { PhotoCardComponent } from './photo-card/photo-card.component';
import { PostDetailPage } from './post-detail/post-detail.page';
import { SearchTabPage } from './search-tab/search-tab.page';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { UserDetailChildComponent } from './user-detail-child/user-detail-child.component';
import { UserDetailPage } from './user-detail/user-detail.page';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    SharedModule,
    TimeagoModule.forChild(),
  ],
  declarations: [
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    PhotoCardComponent,
    UserListComponent,
    SearchTabPage,
    UserDetailPage,
    UserDetailChildComponent,
    PostDetailPage,
  ],
  providers: [PostService],
})
export class TabsPageModule {}
