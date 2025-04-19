import {Component, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {NgForOf, NgIf} from '@angular/common';
import {UserComponent} from '../../share/components/user/user.component';
import {AddUserComponent} from '../../share/modals/add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  imports: [
    HeaderComponent,
    ItemListComponent,
    NgForOf,
    UserComponent,
    AddUserComponent,
    NgIf
  ],
  templateUrl: './user-list.component.html',
  standalone: true,
  styleUrl: './user-list.component.scss'
})
export class UserListComponent{

  array = Array.from({length:5});
  popup = false;


  OpenPopUp() {
    this.popup = false; // fuerza la destrucción primero
    setTimeout(() => this.popup = true, 0);
  }

  closePopup() {
    this.popup = false;
  }
}
