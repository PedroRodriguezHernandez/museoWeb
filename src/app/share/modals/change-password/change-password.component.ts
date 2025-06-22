import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthInterface} from '../../../core/intefaces/auth.interface';
import {AuthSupabaseService} from '../../../core/services/auth-supabase.service';

@Component({
  selector: 'app-change-password',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './change-password.component.html',
  standalone: true,
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  constructor(
    @Inject(AuthSupabaseService) private authInterface: AuthInterface,
  ) {}
  @Input() visible: boolean = true;
  @Output() close = new EventEmitter<void>();
  protected submit: boolean = false;
  protected  failPassword: boolean = false;


  form = new FormGroup({
    password: new FormControl("",[Validators.required, Validators.minLength(6)]),
    repPassword: new FormControl("",[Validators.required, Validators.minLength(6)])
  })


  closePopUp(){
    this.close.emit();
  }

  frontChangePassword(){
    this.failPassword = false
    this.submit = true;
    if(this.form.valid){
      if(this.form.value.password == this.form.value.repPassword){
        if(confirm("Are you sure you want to change your password?")){
          this.authInterface.changePassword(String(this.form.value.password)).subscribe();
          this.closePopUp();
        }
      }else{
        this.failPassword = true
      }
    }else{
      this.form.markAllAsTouched()
    }
  }
}
