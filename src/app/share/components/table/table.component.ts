import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    NgForOf
  ],
  templateUrl: './table.component.html',
  standalone: true,
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() chartData: { label: string; data: number }[] =
    [
      { label: '18-24', data: 120 },
      { label: '25-34', data: 300 },
      { label: '35-44', data: 150 },
    ];
  @Input() label:string = 'Lorem Ipsum'
}
