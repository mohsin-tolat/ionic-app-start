import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostService } from '../services/post.service';
import { PhotoCardComponent } from './photo-card/photo-card.component';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { TimeagoModule } from 'ngx-timeago';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    SharedModule,
    TimeagoModule.forChild(),
  ],
  declarations: [TabsPage, Tab1Page, Tab2Page, Tab3Page, PhotoCardComponent],
  providers: [PostService],
})
export class TabsPageModule {}
