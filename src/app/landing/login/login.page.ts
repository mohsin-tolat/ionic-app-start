import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

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
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.checkLogin();
    } else {
      this.formSubmitted = true;
    }
  }

  checkLogin() {
    if (
      this.loginForm.controls.userName.value === 'admin' &&
      this.loginForm.controls.password.value === 'admin'
    ) {
      this.router.navigateByUrl('/tabs');
    } else {
      this.toastService.showToast('Please enver valid username or password.');
    }
  }

  checkControlHasError(controlName: string) {
    if (this.formSubmitted && !this.loginForm.controls[controlName].valid) {
      return true;
    }
    return false;
  }

  ngOnInit() {}
}
