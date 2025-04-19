import { Component } from '@angular/core';
import {EditUserComponent} from '../../modals/edit-user/edit-user.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [
    EditUserComponent,
    NgIf
  ],
  templateUrl: './user.component.html',
  standalone: true,
  styleUrl: './user.component.scss'
})
export class UserComponent {
  showEditUser: boolean = false;

  OpenPopUp(){
    this.showEditUser = true;
  }

  ClosePopUp(){
    this.showEditUser = false;
  }

}
