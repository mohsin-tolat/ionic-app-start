import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'ngx-webstorage';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  formSubmitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private loadingService: LoadingService
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
    this.userService.Login(this.loginForm.value).subscribe(
      result => {
        if (result && result.token) {
          this.localStorageService.store('token', result.token);
          this.router.navigateByUrl('/tabs');
        } else {
          this.toastService.showToast(
            'Please enver valid username or password.'
          );
        }
      },
      error => {
        if (error.error && error.error.message) {
          this.toastService.showToast(error.error.message);
        }
        this.toastService.showToast(
          'Something went wrong, Please try again later.'
        );
      }
    );
  }

  checkControlHasError(controlName: string) {
    if (this.formSubmitted && !this.loginForm.controls[controlName].valid) {
      return true;
    }
    return false;
  }

  ngOnInit() {}
}
