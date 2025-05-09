import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User, UserInterface} from '../../../core/intefaces/user-interface';
import {UserSupabaseService} from '../../../core/services/user-supabase.service';

@Component({
  selector: 'app-edit-user',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
    templateUrl: './edit-user.component.html',
    standalone: true,
    styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{
  constructor(
    @Inject(UserSupabaseService) private userInterface : UserInterface
  ) { }
  @Input() user!: User;
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  submit: boolean = false;

  form = new FormGroup({
    email: new FormControl({ value: "Lorem Ipsum", disabled: true }, [Validators.required]),
    name: new FormControl({ value: "Lorem Ipsum", disabled: true }, [Validators.required]),
    rol: new FormControl("",[Validators.required]),
    start_date: new FormControl(""),
    end_date: new FormControl(""),
    enable: new FormControl(true, [Validators.required])
  });



  closePopup() {
    this.close.emit();
  }

  onSubmit(){
    this.submit = true;
    if(this.form.valid){
      if(confirm('Are you sure do you want to update this user?'))
      {
        const user: User = this.updateUser()
        this.userInterface.updateUser(user).subscribe();
        this.closePopup();
      }
    }
  }
  private updateUser(): User {
    this.user.rol = this.form.value.rol!;
    this.user.end_date =  this.form.value.end_date ? new Date(this.form.value.end_date) :  undefined;
    this.user.start_date =  new Date(this.form.value.start_date!);
    return this.user;
  }
  ngOnInit(): void {
    if(this.user){
      this.form.patchValue({
        name: this.user.name,
        email: this.user.email,
        rol: this.user.rol,
        start_date: this.user.start_date.toString(),
        end_date: this.user.end_date ? this.user.end_date.toString() : undefined,
        enable: this.user.enable
      })
    }
  }

}
