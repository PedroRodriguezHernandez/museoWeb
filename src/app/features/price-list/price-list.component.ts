import { Component } from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {PriceComponent} from '../../share/components/price/price.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-price-list',
  imports: [
    HeaderComponent,
    PriceComponent,
    NgForOf
  ],
  templateUrl: './price-list.component.html',
  standalone: true,
  styleUrl: './price-list.component.scss'
})
export class PriceListComponent {
  array = Array.from({length:55});

}
