import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {authInterceptor} from './interceptors/auth.interceptor';
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(withInterceptors([authInterceptor])),ReactiveFormsModule,FormsModule,RouterModule]

};
