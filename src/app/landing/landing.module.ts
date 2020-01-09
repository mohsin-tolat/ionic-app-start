import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LandingPageRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page';
import { LoginPage } from './login/login.page';
import { RegistrationPage } from './registration/registration.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LandingPageRoutingModule],
  declarations: [LandingPage, LoginPage, RegistrationPage],
})
export class LandingPageModule {}
