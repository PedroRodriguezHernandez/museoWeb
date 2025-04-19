import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-item-list',
    imports: [],
    templateUrl: './item-list.component.html',
    standalone: true,
    styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  constructor(private router: Router) { }
  editItem() {
    this.router.navigate(['/crud-publish'])
  }
}
