import { Routes } from '@angular/router';
import { CityListComponent } from './Pages/city/city-list/city-list.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { EditCityComponent } from './Pages/city/edit-city/edit-city.component';
import { AddCityComponent } from './Pages/city/add-city/add-city.component';
import { BranchListComponent } from './Pages/branch/branch-list/branch-list.component';
import { EditBranchComponent } from './Pages/branch/edit-branch/edit-branch.component';
import { AddBranchComponent } from './Pages/branch/add-branch/add-branch.component';
import { GovernListComponent } from './Pages/governrate/govern-list/govern-list.component';
import { EditGovernorateComponent } from './Pages/governrate/edit-governorate/edit-governorate.component';
import { AddGovernorateComponent } from './Pages/governrate/add-governorate/add-governorate.component';
import { CourierListComponent } from './Pages/courier/courier-list/courier-list.component';
import { CourierAddComponent } from './Pages/courier/courier-add/courier-add.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login',component: LoginComponent},
  {path:'cities',component:CityListComponent},
  {path:'register',component:RegisterComponent},
{path:'edit-city',component:EditCityComponent},
{path:'add-city',component:AddCityComponent},
{path:'branches',component:BranchListComponent},
{path:'edit-branch',component:EditBranchComponent},
{path:'add-branch',component:AddBranchComponent},
{path:'governrates', component: GovernListComponent},
{path:'edit-governorate', component: EditGovernorateComponent},
{path:'add-governorate', component: AddGovernorateComponent},
{path:'couriers',component:CourierListComponent},
{path:'addcourier',component:CourierAddComponent}
];
