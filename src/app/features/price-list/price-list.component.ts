import {Component, Inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {PriceComponent} from '../../share/components/price/price.component';
import {NgForOf, NgIf} from '@angular/common';
import {AddOfferComponent} from '../../share/modals/add-offer/add-offer.component';
import {Offer, OfferInterface} from '../../core/intefaces/offer-interface';
import {OfferSupabaseService} from '../../core/services/offer-supabase.service';

@Component({
  selector: 'app-price-list',
  imports: [
    HeaderComponent,
    PriceComponent,
    NgForOf,
    AddOfferComponent,
    NgIf
  ],
  templateUrl: './price-list.component.html',
  standalone: true,
  styleUrl: './price-list.component.scss'
})
export class PriceListComponent implements OnInit{

  constructor(
    @Inject (OfferSupabaseService) private offersInterface : OfferInterface
  ) {}
  addPrice = false;
  offers: Offer[] = [];
  ngOnInit(): void {
    this.offersInterface.getOffers().subscribe(
      {
        next : (offers) => {
          this.offers = offers
        },
        error: (error) => {console.error(error)}
      }
    )
  }

  openPopup(){
    this.addPrice = true;
  }

  closePopup(){
    this.addPrice = false;
  }


}
