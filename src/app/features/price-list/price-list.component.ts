import {Component, Inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {PriceComponent} from '../../share/components/price/price.component';
import {NgForOf, NgIf} from '@angular/common';
import {AddOfferComponent} from '../../share/modals/add-offer/add-offer.component';
import {Offer, OfferInterface} from '../../core/intefaces/offer.interface';
import {OfferSupabaseService} from '../../core/services/offer-supabase.service';
import {FormsModule} from '@angular/forms';
import {FilterComponent} from '../../share/components/filter/filter.component';
import {MuseumSupabaseService} from '../../core/services/museum-supabase.service';
import {Museum, MuseumInterface} from '../../core/intefaces/museum.interface';
import {of} from 'rxjs';

@Component({
  selector: 'app-price-list',
  imports: [
    HeaderComponent,
    PriceComponent,
    NgForOf,
    AddOfferComponent,
    NgIf,
    FormsModule,
    FilterComponent
  ],
  templateUrl: './price-list.component.html',
  standalone: true,
  styleUrl: './price-list.component.scss'
})
export class PriceListComponent implements OnInit{

  constructor(
    @Inject (OfferSupabaseService) private offersInterface : OfferInterface,
    @Inject(MuseumSupabaseService) private museumService : MuseumInterface
  ) {}

  addPrice = false;
  offers: Offer[] = [];
  filteredOffers: Offer[] = [];
  museums: Museum[] = [];
  selectedMuseum:string[] = [];

  ngOnInit(): void {
    this.loadMuseums();
    this.takeOffers()
  }

  openPopup(){
    this.addPrice = true;
  }

  closePopup(){
    this.addPrice = false;
    this.takeOffers();
  }

  protected takeOffers(){
    this.offersInterface.getOffers().subscribe(
      {
        next : (offers) => {
          this.offers = offers;
            this.filteredOffers = offers;
        },
        error: (error) => {console.error(error)}
      }
    )
  }

  filterOffers(trim: string) {
    this.filteredOffers = this.offers.filter(offer =>{
      const matchesName = offer.name.toLowerCase().includes(trim.toLowerCase());
      const matchesMuseum = this.selectedMuseum.length === 0 || this.selectedMuseum.includes(offer.museum_id!);
      return matchesName && matchesMuseum;
    });
  }

  filterOfferBySelectedMuseums() {
    if (this.selectedMuseum.length === 0) {
      this.filteredOffers = this.offers;
    } else {
      this.filteredOffers = this.offers.filter(exposure =>
        this.selectedMuseum.includes(exposure.museum_id!)
      );
    }
  }

  onChangeMuseumCheckboxes(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const museumId = checkbox.value;

    if (checkbox.checked) {
      if (!this.selectedMuseum.includes(museumId)) {
        this.selectedMuseum.push(museumId);
      }
    } else {
      this.selectedMuseum = this.selectedMuseum.filter(id => id !== museumId);
    }

    this.filterOfferBySelectedMuseums();
  }

  private loadMuseums() {
    this.museumService.getMuseum().subscribe((museums) =>{
      this.museums = museums.slice().sort((a,b) => a.name.localeCompare(b.name))
      this.selectedMuseum = this.museums.length > 0 ? [this.museums[0].id] : []
    })
  }


}
