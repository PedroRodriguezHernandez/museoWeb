import {Component, Inject, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {NgForOf, NgIf} from '@angular/common';
import {UserComponent} from '../../share/components/user/user.component';
import {AddUserComponent} from '../../share/modals/add-user/add-user.component';
import {supabase} from '../../core/services/supabase.service';
import {User, UserInterface} from '../../core/intefaces/user-interface';
import {UserSupabaseService} from '../../core/services/user-supabase.service';

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
  constructor(
    @Inject(UserSupabaseService) private usersInterface: UserInterface
  ) {}

  users: User[] = [];
  popup = false;

  ngOnInit(): void {
    this.takeUsers()
  }

  OpenPopUp() {
    this.popup = false;
    setTimeout(() => this.popup = true, 0);
  }

  closePopup() {
    this.popup = false;
  }

  private takeUsers() {
    this.usersInterface.getUsers().subscribe({
      next: (users)=>{
        this.users = users
      },
      error:(err)=>{console.error(err)}
    })
  }
}
