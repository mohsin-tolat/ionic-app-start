import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../shared/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then(m => m.LandingPageModule),
  },
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
