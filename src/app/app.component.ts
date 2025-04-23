import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './share/components/header/header.component';
import {ItemListComponent} from './share/components/item-list/item-list.component';
import {UserComponent} from './share/components/user/user.component';
import {PriceComponent} from './share/components/price/price.component';
import {LoginComponent} from './features/login/login.component';
import {ContentListComponent} from './features/content-list/content-list.component';
import {CUDPublishComponent} from './share/modals/cud-publish/cud-publish.component';
import {AddUserComponent} from './share/modals/add-user/add-user.component';
import {EditUserComponent} from './share/modals/edit-user/edit-user.component';
import {AddOfferComponent} from './share/modals/add-offer/add-offer.component';
import {UserListComponent} from './features/user-list/user-list.component';
import {PruebaComponent} from './prueba/prueba.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,
    ItemListComponent, UserComponent,
    PriceComponent, LoginComponent,
    ContentListComponent, CUDPublishComponent,
    AddUserComponent, EditUserComponent,
    AddOfferComponent, UserListComponent, PruebaComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'museoWeb';
}
