import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing.page';
import { LoginPage } from './login/login.page';
import { RegistrationPage } from './registration/registration.page';
import { NotfoundPage } from './notfound/notfound.page';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingPage,
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'registration',
        component: RegistrationPage,
      },
      {
        path: '',
        redirectTo: '/landing/login',
        pathMatch: 'full',
      },
      {
        path: 'NotFound',
        component: NotfoundPage,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/landing/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/landing/NotFound',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
