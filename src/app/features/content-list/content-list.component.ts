import {Component, signal} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {NgForOf} from '@angular/common';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {CUDPublishComponent} from '../../share/modals/cud-publish/cud-publish.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-content-list',
  imports: [
    HeaderComponent,
    NgForOf,
    ItemListComponent,
    CUDPublishComponent
  ],
    templateUrl: './content-list.component.html',
    standalone: true,
    styleUrl: './content-list.component.scss'
})
export class ContentListComponent {
  constructor(private router: Router) {}
  array = Array.from({length:5});

  addItem() {
    this.router.navigate(['/crud-publish'])
  }
}
