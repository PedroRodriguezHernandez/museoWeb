import {Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OfferSupabaseService} from '../../../core/services/offer-supabase.service';
import {Offer, OfferInterface} from '../../../core/intefaces/offer-interface';

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

  constructor(
    @Inject(OfferSupabaseService) private offerInterface : OfferInterface
  ) { }
  @Input() visible: boolean = false;
  @Output() close =  new EventEmitter<void>();
  submit: boolean = false;


  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.min(0)]),
    age: new FormControl("", [Validators.min(0)]),
    from: new FormControl(new Date(),[Validators.required]),
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
      const offer: Offer = this.takeOffer();
      this.saveOffer(offer);
      this.closePopup();
    }
  }

  private saveOffer(offer: Offer) {
    this.offerInterface.createOffer(offer).subscribe()
  }

  private takeOffer(): Offer {
    return {
      name: this.form.value.name!,
      price: Number(this.form.value.price),
      age: this.form.value.age ? Number(this.form.value.age) : undefined,
      startDate: new Date(this.form.value.from!),
      endDate: this.form.value.to ? new Date(this.form.value.to) : undefined
    };
  }
}
