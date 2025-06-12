import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Exposure} from '../../../core/intefaces/exposure-interface';
import {Tickets} from '../../../core/intefaces/tickets-interface';
import {Exhibition} from '../../../core/intefaces/exposition-interface';
import {Museum} from '../../../core/intefaces/museum-interface';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';


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
    FormsModule
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


  onChangeExhibitionsCheckboxes(event: Event)  {
    const checkbox = event.target as HTMLInputElement;
    const title = checkbox.value;

    if (checkbox.checked) {
      this.selectedExhibitions.push(title);
    } else {
      this.selectedExhibitions = this.selectedExhibitions.filter(t => t !== title);
    }
    this.selectedExhibitionsChange.emit(this.selectedExhibitions);
  }

  onChangeExposuresCheckboxes(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const title = checkbox.value;

    if (checkbox.checked) {
      this.selectedExposures.push(title);
    } else {
      this.selectedExposures = this.selectedExposures.filter(t => t !== title);
    }
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
