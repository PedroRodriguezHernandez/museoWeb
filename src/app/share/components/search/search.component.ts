import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  standalone: true,
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnChanges{
  @Input() data: any[] = [];
  @Input() filteredBy: string = "name";
  @Output() filtered =  new EventEmitter<any[]>();

  searchTerm: string = "";
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['filteredBy']) {
      this.applyFilter();
    }
  }
  onSearch() {
    this.applyFilter();
  }

  private applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();

    const filtered = this.data.filter(item => {
      const value = item?.[this.filteredBy];
      return typeof value === 'string' && value.toLowerCase().includes(term);
    });
    this.filtered.emit(filtered);
  }
}
