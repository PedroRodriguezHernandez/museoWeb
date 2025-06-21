import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Exposure} from '../../../core/intefaces/exposure-interface';
import {Tickets} from '../../../core/intefaces/tickets-interface';
import {Exhibition} from '../../../core/intefaces/exposition-interface';
import {Museum} from '../../../core/intefaces/museum-interface';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/input';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {MatOption} from '@angular/material/core';


export interface FilterData {
  exhibitions: string[];
  exposures: string[];
  from: string;
  to: string;
}

@Component({
  selector: 'app-graphic-menu',
  imports: [
    NgForOf,
    FormsModule,
    MatOption,
    MatSelect,
    MatFormField,
    NgIf,
  ],
  templateUrl: './graphic-menu.component.html',
  standalone: true,
  styleUrl: './graphic-menu.component.scss'
})export class GraphicMenuComponent{

  @Input() exposuresInputs: Exposure[] = [];
  @Input() tickets: Tickets[] = []; //TODO(Ver si se usa)
  @Input() exhibitionsInputs: Exhibition[] = [];
  @Input() museums: Museum[] = []; //TODO(Ver si se usa)

  @Input() isSingleSelection: boolean = true;
  @Output() isSingleSelectionChange = new EventEmitter<boolean>();

  @Input() selectedExhibitions: string[] = [];
  @Output() selectedExhibitionsChange = new EventEmitter<string[]>();

  @Input() selectedExposures: string[] = [];
  @Output() selectedExposuresChange = new EventEmitter<string[]>();

  @Input() fromDate: string = '';
  @Output() fromDateChange = new EventEmitter<string>();

  @Input() toDate: string = '';
  @Output() toDateChange = new EventEmitter<string>();

  @Input() selectedOption: number = 1;
  @Output() selectedOptionChange = new EventEmitter<number>();

  @Input() chartType: 'bar' | 'line' = 'line';
  @Output() chartTypeChange = new EventEmitter<'bar' | 'line'>();


  onChangeItemsSelect(event: MatSelectChange) {
    this.selectedExhibitions = event.value;
    this.selectedExhibitionsChange.emit(this.selectedExhibitions);
  }

    onChangeExposuresSelect(event: MatSelectChange) {
      this.selectedExposures = event.value;
      this.selectedExposuresChange.emit(this.selectedExposures);
  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedOption = +selectElement.value;
    if(this.selectedOption == 3 || this.selectedOption == 7 || this.selectedOption == 9  ){
      this.isSingleSelection = false
    }else{
      this.isSingleSelection = true
    }
    this.isSingleSelectionChange.emit(this.isSingleSelection)
    this.selectedOptionChange.emit(this.selectedOption);
  }

  onChartTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.chartType = selectElement.value as 'bar' | 'line';
    this.chartTypeChange.emit(this.chartType);
  }

  onFromDateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const formatted = value ? new Date(value).toISOString().split('T')[0] : "";
    this.fromDate = formatted;
    this.fromDateChange.emit(formatted);
  }

  onToDateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const formatted = value ? new Date(value).toISOString().split('T')[0] : "";
    this.toDate = formatted;
    this.toDateChange.emit(formatted);
  }



}
