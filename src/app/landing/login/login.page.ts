import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LocalStorageService } from 'ngx-webstorage';
import { TabsService } from 'src/app/services/tabs.service';
import { LoadingService } from './../../../app/services/loading.service';
import { ToastService } from './../../../app/services/toast.service';
import { UserService } from './../../../app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  public loginForm: FormGroup;

  formSubmitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private tabsService: TabsService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService,
    private navController: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loadingService.presentLoading();
      this.checkLogin();
    } else {
      this.formSubmitted = true;
    }
  }

  checkLogin() {
    this.tabsService.logout(true);
    this.userService.Login(this.loginForm.value).subscribe(
      result => {
        if (result && result.token) {
          this.localStorageService.store('token', result.token);
          this.localStorageService.store('currentUserName', result.username);
          this.localStorageService.store(
            'userAvatarLink',
            result.userAvatarLink
          );
          // this.router.navigateByUrl('/tabs');
          this.navController.navigateRoot(['/tabs']);
        } else {
          this.toastService.showToast(
            'Please enver valid username or password.'
          );
        }
      },
      error => {
        if (error && error.error.message && error.error.message) {
          this.toastService.showToast(error.error.message);
        } else {
          this.toastService.showToast(
            'Something went wrong, Please try again later.'
          );
        }
      }
    );
  }

  checkControlHasError(controlName: string) {
    if (this.formSubmitted && !this.loginForm.controls[controlName].valid) {
      return true;
    }
    return false;
  }

  ionViewDidLeave(): void {
    console.log('ionViewDidLeave');
    this.loginForm = null;
    this.formSubmitted = false;
    this.formBuilder = null;
  }

  ngOnDestroy(): void {
    this.loginForm = null;
    this.formSubmitted = false;
    this.formBuilder = null;
  }

  ngOnInit() {}
}
