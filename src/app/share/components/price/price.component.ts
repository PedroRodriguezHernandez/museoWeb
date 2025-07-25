import {Component, EventEmitter, Inject, Input, OnInit, output, Output} from '@angular/core';
import {Offer, OfferInterface} from '../../../core/intefaces/offer.interface';
import {SafeHtml} from '@angular/platform-browser';
import {OfferSupabaseService} from '../../../core/services/offer-supabase.service';
import {MuseumSupabaseService} from '../../../core/services/museum-supabase.service';
import {MuseumInterface} from '../../../core/intefaces/museum.interface';

@Component({
    selector: 'app-price',
    imports: [],
    templateUrl: './price.component.html',
    standalone: true,
    styleUrl: './price.component.scss'
})
export class PriceComponent implements OnInit{

  constructor(
    @Inject(OfferSupabaseService) private offerInterface: OfferInterface,
    @Inject(MuseumSupabaseService) private museumService : MuseumInterface

  ) {}
  @Input() offer!: Offer;
  @Output() update = new EventEmitter<void>();

  protected name: string = '';
  protected price: number = 0.00;
  protected age: number | any = null;
  protected startDate: Date = new Date();
  protected endDate: Date | any = null;
  protected museum: string = ""

  ngOnInit(): void {
    this.name = this.offer.name;
    this.price = this.offer.price;
    this.age = this.offer.age;
    this.startDate = this.offer.start_date;
    this.endDate = this.offer.end_date;
    this.getMuseum()
  }


  async delete() {
    if(confirm("Are you sure you want to delete this offer?")) {
      await this.offerInterface.deleteOffer(this.offer.id!).subscribe({
        next: () => {
          this.update.emit();
        }
      });


    }

  }

  private getMuseum() {
    this.museumService.getMuseum().subscribe((museums) =>{
      const matched = museums.find( m => m.id === this.offer.museum_id);
      this.museum = matched?.name!
    })
  }
}
