import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ContentListComponent } from './features/content-list/content-list.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { PriceListComponent } from './features/price-list/price-list.component';
import { AdministrationComponent } from './features/administration/administration.component';
import { CUDPublishComponent } from './share/modals/cud-publish/cud-publish.component';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'content-list', component: ContentListComponent, canActivate: [authGuard] },
  { path: 'user-list', component: UserListComponent, canActivate: [authGuard] },
  { path: 'price-list', component: PriceListComponent, canActivate: [authGuard] },
  { path: 'administration', component: AdministrationComponent, canActivate: [authGuard] },
  { path: 'crud-publish', component: CUDPublishComponent, canActivate: [authGuard] },
];

export const appRouting = RouterModule.forRoot(appRoutes);
