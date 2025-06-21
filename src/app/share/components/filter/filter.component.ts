import {Component, EventEmitter, Input, Output, output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [
    FormsModule
  ],
  templateUrl: './filter.component.html',
  standalone: true,
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() search: string = "Search";
  @Output() filter = new EventEmitter<string>();

  searchTerm: string = '';

  onInput(){
    this.filter.emit(this.searchTerm.trim())
  }
}
