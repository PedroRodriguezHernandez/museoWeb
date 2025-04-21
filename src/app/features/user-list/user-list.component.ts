import {Component, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {NgForOf, NgIf} from '@angular/common';
import {UserComponent} from '../../share/components/user/user.component';
import {AddUserComponent} from '../../share/modals/add-user/add-user.component';
import {supabase} from '../../core/services/supabase.service';

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
export class UserListComponent implements OnInit{

  array = Array.from({length:5});
  popup = false;


  OpenPopUp() {
    this.popup = false; // fuerza la destrucción primero
    setTimeout(() => this.popup = true, 0);
  }

  closePopup() {
    this.popup = false;
  }

  ngOnInit(): void {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        console.error('❌ No hay usuario o hubo un error:', error);
        return;
      }
      console.log('👤 Usuario actual (Supabase JSON):', JSON.stringify(data.user, null, 2));
    });
  }
}
