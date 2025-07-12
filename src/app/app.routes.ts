import { Routes } from '@angular/router';
import { CityListComponent } from './Pages/city/city-list/city-list.component';
import { AddTraderComponent } from './Pages/add-trader/add-trader.component';
import { ShippingTypesComponent } from './components/shipping-types/shipping-types.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { RejectionReasonComponent } from './Pages/rejection-reason/rejection-reason.component';
import { TradersComponent } from './Pages/traders/traders.component';
import { ExtraVillagePriceComponent } from './Pages/extra-village-price/extra-village-price.component';
import { WeightComponent } from './Pages/weight/weight.component';
import { AddCustomPriceComponent } from './Pages/add-custom-price/add-custom-price.component';


export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login',component: LoginComponent},
  {path:'cities',component:CityListComponent},
  {path:'register',component:RegisterComponent},
   {path:'addTrader' , component:AddTraderComponent},
  {path:'shippingTypes' , component:ShippingTypesComponent},
  {path:'rejectionReasons' , component:RejectionReasonComponent},
  {path:'traders' , component:TradersComponent},
  {path:'extraVillagePrice' , component:ExtraVillagePriceComponent},
  {path:'weight' , component:WeightComponent},
  {path:'addCustomPrice' , component:AddCustomPriceComponent},
  {
  path: 'edit-trader/:id',
  loadComponent: () =>
    import('./Pages/edit-trader/edit-trader.component').then(m => m.EditTraderComponent)
}








];
