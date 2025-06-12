import {Component, Inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {BaseChartDirective} from 'ng2-charts';
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
import {NgForOf, NgIf} from '@angular/common';
import {GraphicSimpleComponent} from '../../share/components/graphic-simple/graphic-simple.component';
import {
  GraphicMultiCategoryComponent
} from '../../share/components/graphic-multi-category/graphic-multi-category.component';
import {FormsModule} from '@angular/forms';
import {GraphicMenuComponent} from '../../share/components/graphic-menu/graphic-menu.component';
import {GraphicComponent} from '../../share/components/graphic/graphic.component';

@Component({
  selector: 'app-administration',
  imports: [
    HeaderComponent,
    BaseChartDirective,
    NgIf,
    GraphicSimpleComponent,
    GraphicMultiCategoryComponent,
    NgForOf,
    FormsModule,
    GraphicMenuComponent,
    GraphicComponent,
  ],
  templateUrl: './administration.component.html',
  standalone: true,
  styleUrl: './administration.component.scss'
})

export class AdministrationComponent implements OnInit {

  protected exhibitions!: Exhibition[];
  protected exposures!: Exposure[];
  protected museum!: Museum[];
  protected tickets!: Tickets[];

  protected chartType: 'bar' | 'line' = 'line';
  protected data: any;

  constructor(
    @Inject(ExpositionService) protected expositionInterface: ExpositionInterface,
    @Inject(ExposureSupabaseService) protected exposureInterface: ExposureSupabaseService,
    @Inject(MuseumSupabaseService) protected museumInterface: MuseumInterface,
    @Inject(TicketsSupabaseService) protected ticketsInterface: TicketsInterface,
  ) {
  }

  ngOnInit(): void {
    this.loadExposures();
    this.loadExhibition();
    this.loadMuseum();
    this.loadTickets();
  }

  private loadMuseum() {
    this.museumInterface.getMuseum().subscribe({
      next: value => {
        this.museum = value;
      }
    });
  }

  private loadExhibition() {
    this.expositionInterface.getExpositions().subscribe({
      next: value => {
        this.exhibitions = value;
      }
    });
  }

  private loadExposures() {
    this.exposureInterface.getExposures().subscribe({
      next: value => {
        this.exposures = value;
      }
    });
  }

  private loadTickets() {
    this.ticketsInterface.getTickets().subscribe({
      next: value => {
        this.tickets = value;
      }
    });
  }

  graphics: number[] = [1];
  nextId = 2;

  addGraphic() {
    if (this.graphics.length < 2) {
      this.graphics.push(this.nextId++);
    }
  }

  removeGraphic(id: number) {
    this.graphics = this.graphics.filter(g => g !== id);
  }
}
