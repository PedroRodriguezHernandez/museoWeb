import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ExposureItemComponent} from '../exposure-item/exposure-item.component';
import {NgForOf} from '@angular/common';
import {Exposure} from '../../../core/intefaces/exposure.interface';

@Component({
  selector: 'app-exposure-list',
  imports: [
    ExposureItemComponent,
    NgForOf
  ],
  templateUrl: './exposure-list.component.html',
  standalone: true,
  styleUrl: './exposure-list.component.scss'
})
export class ExposureListComponent {

  @Input() exposures: Exposure[] = []
  @Output() exposureDeleted = new EventEmitter<string>();


  onExposureDeleted($event: string) {
    this.exposureDeleted.emit($event)
  }
}
