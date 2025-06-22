import {Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OfferSupabaseService} from '../../../core/services/offer-supabase.service';
import {Offer, OfferInterface} from '../../../core/intefaces/offer.interface';
import {Museum, MuseumInterface} from '../../../core/intefaces/museum.interface';
import {MuseumSupabaseService} from '../../../core/services/museum-supabase.service';

@Component({
  selector: 'app-add-offer',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgClass,
    NgForOf
  ],
    templateUrl: './add-offer.component.html',
    standalone: true,
    styleUrl: './add-offer.component.scss'
})
export class AddOfferComponent implements OnChanges{

  constructor(
    @Inject(OfferSupabaseService) private offerInterface : OfferInterface,
    @Inject(MuseumSupabaseService) private museumService : MuseumInterface
  ) { }
  @Input() visible: boolean = false;
  @Output() close =  new EventEmitter<void>();
  submit: boolean = false;

  museums: Museum[] = []

  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required, Validators.min(0)]),
    age: new FormControl("", ),
    from: new FormControl(new Date(),[Validators.required]),
    to: new FormControl(""),
    selectedMuseumId: new FormControl('', [Validators.required])
  });

  ngOnChanges(changes: SimpleChanges) {
    this.loadMuseums()
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
      age: this.form.value.age ? this.form.value.age : undefined,
      start_date: new Date(this.form.value.from!),
      end_date: this.form.value.to ? new Date(this.form.value.to) : undefined,
      museum_id: this.form.value.selectedMuseumId ? this.form.value.selectedMuseumId : ""
    };
  }

  private loadMuseums() {
    this.museumService.getMuseum().subscribe((museums) =>{
      this.museums = museums.slice().sort((a,b) => a.name.localeCompare(b.name))
    })
  }
}
