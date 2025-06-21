import {Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {User, UserInterface} from '../../../core/intefaces/user-interface';
import {UserSupabaseService} from '../../../core/services/user-supabase.service';
import {AuthInterface} from '../../../core/intefaces/auth-interface';
import {AuthSupabaseService} from '../../../core/services/auth-supabase.service';

@Component({
    selector: 'app-add-user',
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
    templateUrl: './add-user.component.html',
    standalone: true,
    styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnChanges{

  constructor(
    @Inject(AuthSupabaseService) private authService : AuthInterface
  ) { }
  @Input() visible:boolean = false;
  @Output() close = new EventEmitter<void>();

  submit: boolean = false;
  form = new FormGroup({
    email: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && changes['visible'].currentValue === true) {
      this.submit = false;
    }
  }

  closePopup() {
    this.close.emit();
  }

  onSubmit(){
    this.submit = true;
    if(this.form.valid){
      this.authService.signInWithMagicLink(this.form.value.email!.trim(), this.form.value.name!.trim()).subscribe(
        () => {
          this.closePopup();
        }
      )
    }
  }

}
