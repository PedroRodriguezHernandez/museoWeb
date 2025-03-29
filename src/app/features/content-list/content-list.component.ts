import {Component, signal} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {NgForOf} from '@angular/common';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';

@Component({
    selector: 'app-content-list',
  imports: [
    HeaderComponent,
    NgForOf,
    ItemListComponent
  ],
    templateUrl: './content-list.component.html',
    standalone: true,
    styleUrl: './content-list.component.scss'
})
export class ContentListComponent {
  array = Array.from({length:5});
}
