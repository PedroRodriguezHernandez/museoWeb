import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app/app.routes';



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),  // Aquí proporcionamos las rutas directamente
  ],
}).catch((err) => console.error(err));
