import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [
    NgIf
  ],
  templateUrl: './change-password.component.html',
  standalone: true,
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  visible: boolean = true;

}
