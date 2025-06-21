import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './table.component.html',
  standalone: true,
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() chartData?: { label: string; data: number }[];

  @Input() categorizedData?: { labels: string[]; categories: Record<string, number[]> };
  @Input() label:string = 'Lorem Ipsum'
  get categoryNames(): string[] {
    return this.categorizedData
      ? Object.keys(this.categorizedData.categories)
      : [];
  }
}
