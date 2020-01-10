import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LandingPageRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page';
import { LoginPage } from './login/login.page';
import { RegistrationPage } from './registration/registration.page';
import { ToastService } from '../services/toast.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LandingPageRoutingModule,
  ],
  declarations: [LandingPage, LoginPage, RegistrationPage],
  providers: [ToastService],
})
export class LandingPageModule {}
