import {
  Component,
  OnInit,
  ɵCompiler_compileModuleSync__POST_R3__,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    public toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router
  ) {
    this.formSubmitted = false;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Registration successful.',
      duration: 2000,
    });

    toast.onDidDismiss();

    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait!',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    this.presentToast();
    this.router.navigateByUrl('landing/login');
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.presentLoading();
    } else {
      this.formSubmitted = true;
    }
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
    this.registrationForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
      userName: new FormControl('', [Validators.required]),
    });
  }
}
