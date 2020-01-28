import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from './../../../app/services/loading.service';
import { ToastService } from './../../../app/services/toast.service';
import { UserService } from './../../../app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public registrationForm: FormGroup;
  formSubmitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    public loadingService: LoadingService,
    private userService: UserService,
    private router: Router
  ) {
    this.formSubmitted = false;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.loadingService.presentLoading('Please Wait!', 3000);
      this.userService.AddNewUser(this.registrationForm.value).subscribe(
        result => {
          if (result) {
            this.presentToastAndRedirectToLoginPage();
          }
        },
        error => {
          console.error('Error occurred while adding new user');
        }
      );
    } else {
      this.formSubmitted = true;
    }
  }

  presentToastAndRedirectToLoginPage() {
    this.toastService.showToast('Registration Successful!');
    this.router.navigateByUrl('/landing/login');
  }

  checkControlHasError(controlName: string) {
    if (
      this.formSubmitted &&
      !this.registrationForm.controls[controlName].valid
    ) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        emailAddress: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            new RegExp(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,15}$'
            )
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validator: this.checkIfMatchingPasswords('password', 'confirmPassword'),
      }
    );
  }

  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
}
