import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

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
  @Input() visible:boolean = false;
  @Output() close = new EventEmitter<void>();

  submit: boolean = false;
  form = new FormGroup({
    UserName: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    level: new FormControl("",[Validators.required]),
    from: new FormControl(""),
    to: new FormControl(""),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && changes['visible'].currentValue === true) {
      this.submit = false;
      this.form.reset({
        level: ""
      });
    }
  }

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
