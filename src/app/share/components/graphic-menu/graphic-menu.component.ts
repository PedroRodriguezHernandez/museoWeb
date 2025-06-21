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
  @Input() tickets: Tickets[] = [];
  @Input() exhibitionsInputs: Exhibition[] = [];


  @Input() museums: Museum[] = [];

 // @Input() museumSelection: string = ""
  @Output() museumSelected = new EventEmitter<string>();

  @Input() isSingleSelection: boolean = true;
  @Output() isSingleSelectionChange = new EventEmitter<boolean>();

  @Input() selectedExhibitions: string[] = [];
  @Output() selectedExhibitionsChange = new EventEmitter<string[]>();

  @Input() selectedExposures: string[] = [];
  @Output() selectedExposuresChange = new EventEmitter<string[]>();

  @Output() fromDateChange = new EventEmitter<string>();
  @Output() toDateChange = new EventEmitter<string>();
  @Output() selectedOptionChange = new EventEmitter<number>();
  @Output() chartTypeChange = new EventEmitter<'bar' | 'line'>();


  onChangeItemsSelect(event: MatSelectChange) {
    this.selectedExhibitions = event.value;
    this.selectedExhibitionsChange.emit(event.value);
  }

  onChangeExposuresSelect(event: MatSelectChange) {
    this.selectedExposures = event.value;
    this.selectedExposuresChange.emit(event.value);
  }

  onSelectChange(event: MatSelectChange) {
    const selectedOption = +event.value;
    this.selectedOptionChange.emit(selectedOption);

    const multiSelectOptions = [3, 7, 9];
    this.isSingleSelection = !multiSelectOptions.includes(selectedOption);
    this.isSingleSelectionChange.emit(this.isSingleSelection);

    if (this.isSingleSelection && this.selectedExposures.length > 1) {
      this.selectedExposures = [this.selectedExposures[0]];
      this.selectedExposuresChange.emit(this.selectedExposures);
    }
  }

  onChartTypeChange(event: MatSelectChange) {
    this.chartTypeChange.emit(event.value as 'bar' | 'line');
  }


  onFromDateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const formatted = value ? new Date(value).toISOString().split('T')[0] : "";
    this.fromDateChange.emit(formatted);
  }

  onToDateChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const formatted = value ? new Date(value).toISOString().split('T')[0] : "";
    this.toDateChange.emit(formatted);
  }


  onMuseumChange(event: MatSelectChange) {
    const museumSelection = event.value
    this.museumSelected.emit(museumSelection);
  }
}
