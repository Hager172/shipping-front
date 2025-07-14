import { Routes } from '@angular/router';
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
import { LayoutComponent } from './components/layout/layout.component';
import { CityListComponent } from './Pages/city/city-list/city-list.component';
import { AddTraderComponent } from './Pages/add-trader/add-trader.component';
import { ShippingTypesComponent } from './components/shipping-types/shipping-types.component';
import { BanksComponent } from './Pages/banks/banks.component';
import { RejectionReasonComponent } from './Pages/rejection-reason/rejection-reason.component';
import { TradersComponent } from './Pages/traders/traders.component';
import { SaveComponent } from './Pages/saves/save.component';
import { BankFinancialtransferComponent } from './Pages/bank-financialtransfer/bank-financialtransfer.component';
import { SafeFinancialtransferComponent } from './Pages/safe-financialtransfer/safe-financialtransfer.component';

import { WeightComponent } from './Pages/weight/weight.component';
import { ExtraVillagePriceComponent } from './Pages/extra-village-price/extra-village-price.component';
import { AddCustomPriceComponent } from './Pages/add-custom-price/add-custom-price.component';

import { CourierEditComponent } from './Pages/courier/courier-edit/courier-edit.component';
import { RegisterEmployeeComponent } from './Pages/register-employee/register-employee.component';
import { CourierOrdersComponent } from './Pages/courier/courier-orders/courier-orders.component';
import { OrderReportPaymentComponent } from './components/order-report-payment/order-report-payment.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { OrderStatusHistoryComponent } from './components/order-status-history/order-status-history.component';




export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'banks', component: BanksComponent },
      { path: 'cities', component: CityListComponent },
      { path: 'addTrader', component: AddTraderComponent },
      { path: 'shippingTypes', component: ShippingTypesComponent },
      { path: 'rejectionReasons', component: RejectionReasonComponent },
      { path: 'traders', component: TradersComponent },
    {
  path: 'employees',
  loadComponent: () =>
    import('./components/all-employees/all-employees.component')
      .then(m => m.AllEmployeesComponent)
},
      { path: 'saves', component: SaveComponent },
      { path: 'bank-financialtransfer', component: BankFinancialtransferComponent },
      { path: 'safe-financialtransfer', component: SafeFinancialtransferComponent },
      {path:'edit-city',component:EditCityComponent},

     {path:'add-city',component:AddCityComponent},
{path:'branches',component:BranchListComponent},
{path:'edit-branch',component:EditBranchComponent},
{path:'add-branch',component:AddBranchComponent},
{path:'governrates', component: GovernListComponent},
{path:'edit-governorate', component: EditGovernorateComponent},
{path:'add-governorate', component: AddGovernorateComponent},
{path:'couriers',component:CourierListComponent},
{path:'addcourier',component:CourierAddComponent},
 {path:'cities',component:CityListComponent},
 {path:'editcourier',component:CourierEditComponent},
 {path:'employeereg',component:RegisterEmployeeComponent},
 {path:'courierorders',component:CourierOrdersComponent},
 {path:'courier-orders-report',component:OrderReportPaymentComponent},
        {path:'extraVillagePrice' , component:ExtraVillagePriceComponent},
        {path:'weight' , component:WeightComponent},
        {path:'addCustomPrice' , component:AddCustomPriceComponent},
        {
        path: 'edit-trader/:id',
        loadComponent: () =>
          import('./Pages/edit-trader/edit-trader.component').then(m => m.EditTraderComponent)
      },
      {path:'edit-employee/:id' , component:UpdateEmployeeComponent},
      { path: 'orders/:id/history', component: OrderStatusHistoryComponent }



    ]
  }

];
