import { Routes } from '@angular/router';
import { CityListComponent } from './Pages/city/city-list/city-list.component';
import { AddTraderComponent } from './components/add-trader/add-trader.component';
import { ShippingTypesComponent } from './components/shipping-types/shipping-types.component';

export const routes: Routes = [
  {path:'cities',component:CityListComponent},
  {path:'addTrader' , component:AddTraderComponent},
  {path:'shippingTypes' , component:ShippingTypesComponent},

];
