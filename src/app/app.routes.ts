import { Routes } from '@angular/router';
import { CityListComponent } from './Pages/city/city-list/city-list.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login',component: LoginComponent},
  {path:'cities',component:CityListComponent},
  {path:'register',component:RegisterComponent},

];
