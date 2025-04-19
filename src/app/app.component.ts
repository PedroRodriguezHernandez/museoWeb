import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './share/components/header/header.component';
import {ItemListComponent} from './share/components/item-list/item-list.component';
import {UserComponent} from './share/components/user/user.component';
import {PriceComponent} from './share/components/price/price.component';
import {LoginComponent} from './features/login/login.component';
import {ContentListComponent} from './features/content-list/content-list.component';
import {CUDPublishComponent} from './share/modals/cud-publish/cud-publish.component';
import {PruebaComponent} from './prueba/prueba.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,
    ItemListComponent, UserComponent,
    PriceComponent, LoginComponent,
    ContentListComponent, CUDPublishComponent, PruebaComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'museoWeb';
}
