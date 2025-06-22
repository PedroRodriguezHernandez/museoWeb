import {Component, Inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {NgForOf, NgIf} from '@angular/common';
import {UserComponent} from '../../share/components/user/user.component';
import {AddUserComponent} from '../../share/modals/add-user/add-user.component';
import {User, UserInterface} from '../../core/intefaces/user.interface';
import {UserSupabaseService} from '../../core/services/user-supabase.service';
import {FilterComponent} from '../../share/components/filter/filter.component';

@Component({
  selector: 'app-user-list',
  imports: [
    HeaderComponent,
    NgForOf,
    UserComponent,
    AddUserComponent,
    NgIf,
    FilterComponent
  ],
  templateUrl: './user-list.component.html',
  standalone: true,
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  protected openInvitation: boolean = false;
  constructor(
    @Inject(UserSupabaseService) private usersInterface: UserInterface
  ) {}

  filteredUsers: User[] = [];
  users: User[] = [];

  ngOnInit(): void {
    this.takeUsers()
  }


  private takeUsers() {
    this.usersInterface.getUsers().subscribe({
      next: (users)=>{
        this.users = users
        this.filteredUsers = users
      },
      error:(err)=>{console.error(err)}
    })
  }

  filterUsers(term: string) {
    this.filteredUsers = this.users.filter( user =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  sendInvitation() {
    this.openInvitation = true
  }

  closeInvitation() {
    this.openInvitation=false
  }
}
