import {Component, Input, OnInit, Output} from '@angular/core';
import {EditUserComponent} from '../../modals/edit-user/edit-user.component';
import {NgIf} from '@angular/common';
import {User} from '../../../core/intefaces/user-interface';

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
export class UserComponent implements OnInit{
  @Input() user!: User;
  showEditUser: boolean = false;

  protected id!:string;
  protected name!:string;
  protected userName!:string;
  protected userLevel!:string;
  ngOnInit(): void {
    this.id = this.user.id!;
    this.name = this.user.name;
    this.userName = this.user.email;
    this.userLevel = this.user.rol;
  }

  OpenPopUp(){
    this.showEditUser = true;
  }

  ClosePopUp(){
    this.showEditUser = false;
  }


}
