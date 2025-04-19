import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {ContentListComponent} from './features/content-list/content-list.component';
import {UserListComponent} from './features/user-list/user-list.component';
import {PriceListComponent} from './features/price-list/price-list.component';
import {AdministrationComponent} from './features/administration/administration.component';
import {CUDPublishComponent} from './share/modals/cud-publish/cud-publish.component';

export const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'content-list', component: ContentListComponent},
  {path: 'user-list', component: UserListComponent},
  {path: 'price-list', component: PriceListComponent},
  {path: 'administration', component: AdministrationComponent},
  {path: 'crud-publish', component: CUDPublishComponent},
];

export const appRouting = RouterModule.forRoot(appRoutes)
