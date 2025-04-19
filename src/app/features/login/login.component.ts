import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
    templateUrl: './login.component.html',
    standalone: true,
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router){}
  protected isPasswordHidden: boolean = true;
  protected submit = false;
  form = new FormGroup({
    user: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  togglePassword() {
    this.isPasswordHidden = !this.isPasswordHidden
  }

  onSubmit() {
    this.submit = true;
    if(this.form.valid){
      this.router.navigate(['/content-list']);
    }else{
      console.log(this.form.markAllAsTouched());
    }
  }
}
