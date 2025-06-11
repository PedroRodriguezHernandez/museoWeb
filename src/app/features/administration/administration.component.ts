import {Component, Inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {BaseChartDirective} from 'ng2-charts';
import {GraphicComponent} from '../../share/components/graphic/graphic.component';
import {Exhibition, ExpositionInterface} from '../../core/intefaces/exposition-interface';
import {ExpositionService} from '../../core/services/exhibicion-supabase.service';
import {ExposureSupabaseService} from '../../core/services/exposure-supabase.service';
import {MuseumSupabaseService} from '../../core/services/museum-supabase.service';
import {Museum, MuseumInterface} from '../../core/intefaces/museum-interface';
import {TicketsSupabaseService} from '../../core/services/tickets-supabase.service';
import {Tickets, TicketsInterface} from '../../core/intefaces/tickets-interface';
import {Exposure} from '../../core/intefaces/exposure-interface';

@Component({
  selector: 'app-administration',
  imports: [
    HeaderComponent,
    BaseChartDirective,
    GraphicComponent,
  ],
  templateUrl: './administration.component.html',
  standalone: true,
  styleUrl: './administration.component.scss'
})

export class AdministrationComponent implements OnInit{

  data: {title:string, data:number}[]= [
    {title:"LoremIpsum", data:8},
    {title:"LoremIpsum", data:9},
    {title:"LoremIpsum", data:10}
  ]

  private exhibitions!: Exhibition[];
  private exposures!: Exposure[];
  private museum!: Museum[];
  private tickets!: Tickets[];
  constructor(
    @Inject(ExpositionService) protected expositionInterface: ExpositionInterface,
    @Inject(ExposureSupabaseService) protected exposureInterface: ExposureSupabaseService,
    @Inject(MuseumSupabaseService) protected museumInterface: MuseumInterface,
    @Inject(TicketsSupabaseService) protected ticketsInterface: TicketsInterface,
  ) {  }

   ngOnInit(): void {
    this.loadExposures();
    this.loadExhibition();
    this.loadMuseum();
    this.loadTickets();
  }


  private cleanData() {
    this.data = this.exhibitions.map(dt => ({
      title: dt.title!,
      data: dt.views!
    }));
  }

  private loadTickets() {
    this.ticketsInterface.getTickets().subscribe(
      {
        next: value => {
          this.tickets = value;
          console.log(this.tickets)
        }
      }
    )
  }

  private loadExhibition() {
    this.expositionInterface.getExpositions().subscribe(
      {
        next: value => {
          this.exhibitions = value;
          console.log(this.exhibitions)
        }
      }
    )
  }

  private loadExposures() {
    this.exposureInterface.getExposures().subscribe(
      {
        next: value => {
          this.exposures = value;
          console.log(this.exposures)
        }
      }
    )
  }

  private loadMuseum() {
    this.museumInterface.getMuseum().subscribe(
      {
        next: value => {
          this.museum = value;
          console.log(this.museum)
        }
      }
    )
  }
}
