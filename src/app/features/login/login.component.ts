import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {AuthSupabaseService} from '../../core/services/auth-supabase.service';
import {AuthInterface} from '../../core/intefaces/auth.interface';
import {supabase} from '../../core/services/supabase.service';
import {map} from 'rxjs';

@Component({
    selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
    templateUrl: './login.component.html',
    standalone: true,
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(
    private router: Router,
    @Inject(AuthSupabaseService) private authInterface: AuthInterface
  ){}

  protected fail_logout: boolean = false;

  ngOnInit() {
    const user = this.authInterface.getCurrentUser()

    if (user) {
      this.router.navigate(['content-list']);
    }
  }

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
    this.fail_logout = false
    this.submit = true;
    if(this.form.valid ){
      const email: string = String(this.form.get('user')?.value || '');
      const password: string = String(this.form.get('password')?.value || '');

      this.authInterface.login(email, password).subscribe({
        next: (user) => {
          this.router.navigate(['/content-list']);
        },
        error: (err) => {
          this.fail_logout = true
          console.error('Login fallido:', err);
        }
      });
    }else{
      console.log(this.form.markAllAsTouched());
    }
  }
}
