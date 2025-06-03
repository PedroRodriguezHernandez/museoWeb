import {Component, Inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {NgForOf, NgIf} from '@angular/common';
import {UserComponent} from '../../share/components/user/user.component';
import {AddUserComponent} from '../../share/modals/add-user/add-user.component';
import {User, UserInterface} from '../../core/intefaces/user-interface';
import {UserSupabaseService} from '../../core/services/user-supabase.service';
import {SearchComponent} from '../../share/components/search/search.component';

@Component({
  selector: 'app-user-list',
  imports: [
    HeaderComponent,
    ItemListComponent,
    NgForOf,
    UserComponent,
    AddUserComponent,
    NgIf,
    SearchComponent
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
  filteredUsers: User[] = []

  ngOnInit(): void {
    this.takeUsers()
  }


  private takeUsers() {
    this.usersInterface.getUsers().subscribe({
      next: (users)=>{
        this.users = users
        this.filteredUsers = this.users;
      },
      error:(err)=>{console.error(err)}
    })
  }
}
