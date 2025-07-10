import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CityListComponent } from './Pages/city/city-list/city-list.component';
import { AddTraderComponent } from './Pages/add-trader/add-trader.component';
import { ShippingTypesComponent } from './components/shipping-types/shipping-types.component';
import { BanksComponent } from './Pages/banks/banks.component';
import { RejectionReasonComponent } from './Pages/rejection-reason/rejection-reason.component';
import { TradersComponent } from './Pages/traders/traders.component';

export const routes: Routes = [
  // صفحات خارج الـ layout (تسجيل دخول / تسجيل حساب)
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // صفحات داخل layout بعد تسجيل الدخول
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
    ]
  }
];
