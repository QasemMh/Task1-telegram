import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  rememmberMeFormControl: FormControl = new FormControl(false);

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') != null) {
      this.emailFormControl.setValue(localStorage.getItem('email'));
    }
  }

  Login(evt: any) {
    evt.preventDefault();
    this.authService.login(
      this.emailFormControl,
      this.passwordFormControl,
      this.rememmberMeFormControl.value
    );
  }
}
