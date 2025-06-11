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
import {DataNormalizer} from '../../core/utils/data-normalizer';
import {ChartDataNormalized, normalizeMultiLineData, normalizeVisitsByDate} from '../../core/utils/graphic-normalizer';
import {NgIf} from '@angular/common';
import {GraphicSimpleComponent} from '../../share/components/graphic-simple/graphic-simple.component';
import {
  GraphicMultiCategoryComponent
} from '../../share/components/graphic-multi-category/graphic-multi-category.component';

@Component({
  selector: 'app-administration',
  imports: [
    HeaderComponent,
    BaseChartDirective,
    GraphicComponent,
    NgIf,
    GraphicSimpleComponent,
    GraphicMultiCategoryComponent,
  ],
  templateUrl: './administration.component.html',
  standalone: true,
  styleUrl: './administration.component.scss'
})

export class AdministrationComponent implements OnInit{

  private exhibitions!: Exhibition[];
  private exposures!: Exposure[];
  private museum!: Museum[];
  private tickets!: Tickets[];

  protected chartType: 'bar' | 'line' = 'line';
  protected data:any;

  constructor(
    @Inject(ExpositionService) protected expositionInterface: ExpositionInterface,
    @Inject(ExposureSupabaseService) protected exposureInterface: ExposureSupabaseService,
    @Inject(MuseumSupabaseService) protected museumInterface: MuseumInterface,
    @Inject(TicketsSupabaseService) protected ticketsInterface: TicketsInterface,
  ) {  }

  private normalizer!: DataNormalizer;
  protected simple: boolean = true;


  ngOnInit(): void {
    this.loadExposures();
    this.loadExhibition();
    this.loadMuseum();
    this.loadTickets();
  }

  private checkAndInitialize() {
    if (this.exhibitions && this.exposures && this.museum && this.tickets) {
      this.normalizer = new DataNormalizer(
        this.exposures,
        this.tickets,
        this.exhibitions,
        this.museum
      );

      //this.data =this.normalizer.getMuseumFlow()
      //this.data = this.normalizer.getVisitsByAge();


      console.log(this.normalizer.getVisitsByAgePerDay());

      //this.data = this.normalizer.getTicketsSoldByDay();
      //this.data = this.normalizer.getTotalSalesByDay();

      //this.data =  this.normalizer.getVisitsPerExhibition();
      console.log(this.normalizer.getDailyViewsFiltered());

      //this.data = this.normalizer.getVisitsPerExposure();
      this.data = this.normalizer.getDailyViewsPerExposure();

    }
  }

  private loadMuseum() {
    this.museumInterface.getMuseum().subscribe({
      next: value => {
        this.museum = value;
        this.checkAndInitialize();
      }
    });
  }

  private loadExhibition() {
    this.expositionInterface.getExpositions().subscribe({
      next: value => {
        this.exhibitions = value;
        this.checkAndInitialize();
      }
    });
  }

  private loadExposures() {
    this.exposureInterface.getExposures().subscribe({
      next: value => {
        this.exposures = value;
        this.checkAndInitialize();
      }
    });
  }

  private loadTickets() {
    this.ticketsInterface.getTickets().subscribe({
      next: value => {
        this.tickets = value;
        this.checkAndInitialize();
      }
    });
  }

  /*private simpleData( ): void {
    this.data = dataObj.map(item => ({
      label: String(item[labelKey]),
      data: item[valueKey]
    }));
    this.simple = true;
  }*/
}
