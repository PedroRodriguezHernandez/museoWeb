import { Component } from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {NgForOf} from '@angular/common';
import {UserComponent} from '../../share/components/user/user.component';

@Component({
  selector: 'app-user-list',
  imports: [
    HeaderComponent,
    ItemListComponent,
    NgForOf,
    UserComponent
  ],
  templateUrl: './user-list.component.html',
  standalone: true,
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  array = Array.from({length:5});

}
