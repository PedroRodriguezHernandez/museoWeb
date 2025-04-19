import { Component } from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {PriceComponent} from '../../share/components/price/price.component';
import {NgForOf, NgIf} from '@angular/common';
import {AddOfferComponent} from '../../share/modals/add-offer/add-offer.component';

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
export class PriceListComponent {
  array = Array.from({length:55});
  addPrice = false;

  openPopup(){
    this.addPrice = true;
  }

  closePopup(){
    this.addPrice = false;
  }
}
