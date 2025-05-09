import {Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {User, UserInterface} from '../../../core/intefaces/user-interface';
import {UserSupabaseService} from '../../../core/services/user-supabase.service';

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
    @Inject(UserSupabaseService) private userInterface : UserInterface
  ) { }
  @Input() visible:boolean = false;
  @Output() close = new EventEmitter<void>();

  submit: boolean = false;
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    name: new FormControl("", [Validators.required]),
    rol: new FormControl("",[Validators.required]),
    start_date: new FormControl(new Date(), [Validators.required]),
    end_date: new FormControl(""),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && changes['visible'].currentValue === true) {
      this.submit = false;
      this.form.reset({
        rol: ""
      });
    }
  }

  closePopup() {
    this.close.emit();
  }

  onSubmit(){
    this.submit = true;
    if(this.form.valid){
      if(confirm(`Are you sure do you want to add this user:
                  \n\tName: ${this.form.value.name}
                  \n\tEmail: ${this.form.value.email}
                  \n\tUser Level: ${this.form.value.rol}`))
      {
        const user: User = this.takeUser()
        this.closePopup();
      }

    }
  }

  private takeUser(): User {
    return {
      name: this.form.value.name!,
      email: this.form.value.email!,
      rol: this.form.value.rol!,
      end_date: this.form.value.end_date ? new Date(this.form.value.end_date) :  undefined,
      start_date: new Date(this.form.value.start_date!),
    };
  }
}
