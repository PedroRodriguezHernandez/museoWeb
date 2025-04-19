import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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
export class EditUserComponent {
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  submit: boolean = false;

  form = new FormGroup({
    UserName: new FormControl({ value: "Lorem Ipsum", disabled: true }, [Validators.required]),
    name: new FormControl({ value: "Lorem Ipsum", disabled: true }, [Validators.required]),
    level: new FormControl("",[Validators.required]),
    from: new FormControl(""),
    to: new FormControl(""),
    enable: new FormControl(true, [Validators.required])
  });



  closePopup() {
    this.close.emit();
  }

  onSubmit(){
    this.submit = true;
    if(this.form.valid){
      this.closePopup();
    }
  }

}
