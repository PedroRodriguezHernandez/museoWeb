import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Offer, OfferInterface} from '../../../core/intefaces/offer-interface';
import {SafeHtml} from '@angular/platform-browser';
import {OfferSupabaseService} from '../../../core/services/offer-supabase.service';

@Component({
    selector: 'app-price',
    imports: [],
    templateUrl: './price.component.html',
    standalone: true,
    styleUrl: './price.component.scss'
})
export class PriceComponent implements OnInit{

  constructor(
    @Inject(OfferSupabaseService) private offerInterface: OfferInterface
  ) {}
  @Input() offer!: Offer;

  protected name: string = '';
  protected price: number = 0.00;
  protected age: number | any = null;
  protected startDate: Date = new Date();
  protected endDate: Date | any = null;

  ngOnInit(): void {
    this.name = this.offer.name;
    this.price = this.offer.price;
    this.age = this.offer.age;
    this.startDate = this.offer.startDate;
    this.endDate = this.offer.endDate;
  }


  delete() {
    if(confirm("Are you sure you want to delete this offer?")) {
      this.offerInterface.deleteOffer(this.offer.id!)
    }
  }
}
