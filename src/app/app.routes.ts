import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {ContentListComponent} from './features/content-list/content-list.component';
import {UserListComponent} from './features/user-list/user-list.component';

export const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'content-list', component: ContentListComponent},
  {path: 'user-list', component: UserListComponent},
];

export const appRouting = RouterModule.forRoot(appRoutes)
