import {Component, EventEmitter, Input, OnChanges, Output, output, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-offer',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
    templateUrl: './add-offer.component.html',
    standalone: true,
    styleUrl: './add-offer.component.scss'
})
export class AddOfferComponent implements OnChanges{
  @Input() visible: boolean = false;
  @Output() close =  new EventEmitter<void>();
  submit: boolean = false;


  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.min(0)]),
    age: new FormControl(""),
    from: new FormControl(""),
    to: new FormControl(""),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && changes['visible'].currentValue === true) {
      this.submit = false;
      this.form.reset({
        age: ""
      });
    }
  }

  closePopup() {
    this.close.emit();
  }

  addOffer(){
    this.submit = true;
    if(this.form.valid){
      this.closePopup();
    }
  }
}
