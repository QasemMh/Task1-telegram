import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private router: Router, private spinner: NgxSpinnerService) {}

  SaveToLocalStorage(email:string,rememmberMe: boolean) {
    if (rememmberMe) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
    }
  }

  login(email: any, pass: any, rememmberMe: boolean = false) {
    this.spinner.show();


    setTimeout(() => {
      this.spinner.hide();
      
      this.SaveToLocalStorage(email.value,rememmberMe);

      this.router.navigate(['/home']);
    }, 2000);
  }
}
