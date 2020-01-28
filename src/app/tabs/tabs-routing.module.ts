import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailPage } from './post-detail/post-detail.page';
import { SearchTabPage } from './search-tab/search-tab.page';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { TabsPage } from './tabs.page';
import { UserDetailPage } from './user-detail/user-detail.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        component: Tab1Page,
      },
      {
        path: 'tab2',
        component: Tab2Page,
      },
      {
        path: 'tab3',
        component: Tab3Page,
      },
      {
        path: 'searchTab',
        component: SearchTabPage,
      },
      {
        path: 'userDetails',
        component: UserDetailPage,
      },
      {
        path: 'postDetails',
        component: PostDetailPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
