import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Exposure} from '../../../core/intefaces/exposure-interface';
import {Tickets} from '../../../core/intefaces/tickets-interface';
import {Exhibition} from '../../../core/intefaces/exposition-interface';
import {Museum} from '../../../core/intefaces/museum-interface';
import {DataNormalizer} from '../../../core/utils/data-normalizer';
import {GraphicMenuComponent} from '../graphic-menu/graphic-menu.component';
import {NgIf} from '@angular/common';
import {GraphicSimpleComponent} from '../graphic-simple/graphic-simple.component';
import {GraphicMultiCategoryComponent} from '../graphic-multi-category/graphic-multi-category.component';
import {start} from 'node:repl';
import {TableComponent} from '../table/table.component';

@Component({
  selector: 'app-graphic',
  imports: [
    GraphicMenuComponent,
    NgIf,
    GraphicSimpleComponent,
    GraphicMultiCategoryComponent,
    TableComponent
  ],
  templateUrl: './graphic.component.html',
  standalone: true,
  styleUrl: './graphic.component.scss'
})
export class GraphicComponent implements OnChanges {
  @Input() exposuresInputs: Exposure[] = [];
  @Input() tickets: Tickets[] = [];
  @Input() exhibitionsInputs: Exhibition[] = [];
  @Input() museums: Museum[] = [];

  @Input() idCanva :string = "Canvas"

  @Output() closeGraphic = new EventEmitter<void>();

  selectedExhibitions: string[] = [];
  selectedExposures: string[] = [];
  fromDate: string = '';
  toDate: string = '';
  selectedOption: number = 1


  protected simple: boolean = true;
  protected chartType: 'bar' | 'line' = 'line';
  protected data: any;
  private normalizer!: DataNormalizer;
  protected lable: string = "label"
  private museum: string = ""

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['exposuresInputs'] ||
      changes['tickets'] ||
      changes['exhibitionsInputs'] ||
      changes['museums']
    ) {
      this.updateData();
    }
  }

  private updateData() {
      this.normalizer = new DataNormalizer(
        this.exposuresInputs.filter((e) => e.museum_id === this.museum),
        this.tickets.filter((e) => e.museum_id === this.museum),
        this.exhibitionsInputs.filter((e) => e.museum_id === this.museum),
        this.museums
      );
      switch (this.selectedOption){
        case 1:
          /*this.data = this.normalizer.getMuseumFlow(
            this.fromDate ? new Date(this.fromDate) : undefined,
            this.toDate ? new Date(this.toDate) : undefined
          );
          this.lable = "Visits"*/ //TODO
          break;
        case 2:
          this.data = this.normalizer.getVisitsByAge({
            startDate: this.fromDate ? new Date(this.fromDate) : undefined,
            endDate: this.toDate ? new Date(this.toDate) : undefined,
            allowedAges: undefined
          })
          this.lable = "Visits"
          break;
        case 3:
          this.data = this.normalizer.getVisitsByAgePerDay({
            startDate: this.fromDate ? new Date(this.fromDate) : undefined,
            endDate: this.toDate ? new Date(this.toDate) : undefined,
            allowedAges: undefined
          })
          break;
        case 4:
          this.data = this.normalizer.getTicketsSoldByDay({
            startDate: this.fromDate ? new Date(this.fromDate) : undefined,
            endDate: this.toDate ? new Date(this.toDate) : undefined,
          })
          this.lable = "Tickets Sold"
          break;
        case 5:
          this.data = this.normalizer.getTotalSalesByDay({
            startDate: this.fromDate ? new Date(this.fromDate) : undefined,
            endDate: this.toDate ? new Date(this.toDate) : undefined,
          });
          this.lable = "Revenues"
          break;
        case 6:
          this.data = this.normalizer.getVisitsPerExhibition({
            exposures: this.selectedExposures.length > 0 ? this.selectedExposures : undefined,
            exhibitionTitles: this.selectedExhibitions.length > 0 ? this.selectedExhibitions : undefined,
          });
          this.lable = "Visits"
          break;
        case 7:
          this.data = this.normalizer.getDailyViewsFiltered({
            exposures: this.selectedExposures.length > 0 ? this.selectedExposures : undefined,
            exhibitionTitles: this.selectedExhibitions.length > 0 ? this.selectedExhibitions : undefined,
            startDate: this.fromDate ? new Date(this.fromDate) : undefined,
            endDate: this.toDate ? new Date(this.toDate) : undefined,
          });
          break
        case 8:
          this.data = this.normalizer.getVisitsPerExposure({
            exposureNames: this.selectedExposures.length > 0 ? this.selectedExposures : undefined,
          });
          break
        case 9:
          this.data = this.normalizer.getDailyViewsPerExposure({
            exposureNames: this.selectedExposures.length > 0 ? this.selectedExposures : undefined,
            startDate: this.fromDate ? new Date(this.fromDate) : undefined,
            endDate: this.toDate ? new Date(this.toDate) : undefined,
          });
          console.log(this.data)
          break;

      }

  }
  onSelectedExhibitionsChange(value: string[]) {
    this.selectedExhibitions = value;
    this.updateData();
  }

  onSelectedExposuresChange(value: string[]) {
    this.selectedExposures = value;
    this.updateData();
  }

  onFromDateChange(value: string) {
    this.fromDate = value;
    this.updateData();
  }

  onToDateChange(value: string) {
    this.toDate = value;
    console.log(this.toDate)
    this.updateData();
  }

  onSelectedOptionChange(value: number) {
    this.selectedOption = value;
    this.updateData();
  }

  onChartTypeChange(value: 'bar' | 'line') {
    this.chartType = value;
    this.updateData();
  }

  onSingleSelectionChange(event: boolean) {
    this.simple = event;
    this.updateData()
  }

  protected readonly close = close;

  closeThisGraph() {
    this.closeGraphic.emit();
  }

  selectedMuseum(event: string) {
    this.museum = event.trim()
    this.updateData()
  }
}
