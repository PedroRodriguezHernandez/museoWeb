import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [],
    templateUrl: './login.component.html',
    standalone: true,
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router){}

  protected isPasswordHidden: boolean = true;

  togglePassword() {
    this.isPasswordHidden = !this.isPasswordHidden
  }

  onSubmit() {
    console.log("Login button clicked");
    this.router.navigate(['/content-list']);
  }
}
