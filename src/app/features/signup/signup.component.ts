import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthSupabaseService} from '../../core/services/auth-supabase.service';
import {AuthInterface} from '../../core/intefaces/auth-interface';
import {Router} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{


  constructor(
    @Inject(AuthSupabaseService) private auth: AuthInterface,
    private router: Router
  ) {

  }

  form = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.min(6)]),
    rep_password: new FormControl("", [Validators.required, Validators.min(6)]),
  });

  email: string = '';
  errorMsg: string = '';

  ngOnInit() {
   this.auth.getCurrentUser().subscribe(auth => {
     if(auth){
       this.email = auth.userName
     }  else {this.router.navigate(['/']);}
    });

  }

  submit() {
    if (this.form.valid) {
      const password = this.form.value.password;
      const rep_password = this.form.value.rep_password;
      console.log(name)
      if(password && password==rep_password) {
        this.auth.signUpWithPassword(
          this.email,
          password
        ).subscribe(() =>{
          this.router.navigate(['/']);
        });
      }else{
        this.errorMsg = "Unvalidated passwords"
      }
    }
  }

}
