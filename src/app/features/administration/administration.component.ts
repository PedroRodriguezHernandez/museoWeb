import { Component } from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';

@Component({
  selector: 'app-administration',
  imports: [
    HeaderComponent
  ],
  templateUrl: './administration.component.html',
  standalone: true,
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent {

}
