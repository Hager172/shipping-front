import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { EditCityComponent } from './Pages/city/edit-city/edit-city.component';
import { AddCityComponent } from './Pages/city/add-city/add-city.component';
import { CityListComponent } from './Pages/city/city-list/city-list.component';

import { BranchListComponent } from './Pages/branch/branch-list/branch-list.component';
import { EditBranchComponent } from './Pages/branch/edit-branch/edit-branch.component';
import { AddBranchComponent } from './Pages/branch/add-branch/add-branch.component';

import { GovernListComponent } from './Pages/governrate/govern-list/govern-list.component';
import { EditGovernorateComponent } from './Pages/governrate/edit-governorate/edit-governorate.component';
import { AddGovernorateComponent } from './Pages/governrate/add-governorate/add-governorate.component';

import { CourierListComponent } from './Pages/courier/courier-list/courier-list.component';
import { CourierAddComponent } from './Pages/courier/courier-add/courier-add.component';
import { CourierEditComponent } from './Pages/courier/courier-edit/courier-edit.component';
import { CourierOrdersComponent } from './Pages/courier/courier-orders/courier-orders.component';
import { RejectedorderComponent } from './Pages/courier/rejectedorder/rejectedorder.component';

import { LayoutComponent } from './components/layout/layout.component';

import { AddTraderComponent } from './Pages/add-trader/add-trader.component';
import { TradersComponent } from './Pages/traders/traders.component';

import { ShippingTypesComponent } from './components/shipping-types/shipping-types.component';
import { BanksComponent } from './Pages/banks/banks.component';
import { SaveComponent } from './Pages/saves/save.component';
import { RejectionReasonComponent } from './Pages/rejection-reason/rejection-reason.component';

import { BankFinancialtransferComponent } from './Pages/bank-financialtransfer/bank-financialtransfer.component';
import { SafeFinancialtransferComponent } from './Pages/safe-financialtransfer/safe-financialtransfer.component';
import { WeightComponent } from './Pages/weight/weight.component';
import { ExtraVillagePriceComponent } from './Pages/extra-village-price/extra-village-price.component';
import { AddCustomPriceComponent } from './Pages/add-custom-price/add-custom-price.component';

import { OrdersComponent } from './Pages/orders/orders.component';
import { AdminAddOrderComponent } from './Pages/admin-add-order/admin-add-order.component';
import { TraderAddOrderComponent } from './Pages/trader-add-order/trader-add-order.component';
import { EditOrderComponent } from './Pages/edit-order/edit-order.component';


import { CourierEditComponent } from './Pages/courier/courier-edit/courier-edit.component';
import { RegisterEmployeeComponent } from './Pages/register-employee/register-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

import { OrderReportPaymentComponent } from './components/order-report-payment/order-report-payment.component';
import { OrderStatusHistoryComponent } from './components/order-status-history/order-status-history.component';

import { RejectedorderComponent } from './Pages/courier/rejectedorder/rejectedorder.component';
import { AdminDashboardComponent } from './Pages/dashboard/admindashboard.component';
import { TraderdashboardComponent } from './Pages/traderdashboard/traderdashboard.component';
import { CourierdashboardComponent } from './Pages/courierdashboard/courierdashboard.component';

import { PermissionsComponent } from './Pages/permissions/permissions.component';
import { AddPermissionComponent } from './Pages/add-permission/add-permission.component';

import { ChatBotComponent } from './Chatbot/chat-bot/chat-bot.component';
import { authGuard } from './guards/auth.guard';


import { authGuard } from './guards/auth.guard';

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
      { path: 'add-city', component: AddCityComponent },
      { path: 'edit-city', component: EditCityComponent },

      { path: 'branches', component: BranchListComponent },
      { path: 'add-branch', component: AddBranchComponent },
      { path: 'edit-branch', component: EditBranchComponent },

      { path: 'governrates', component: GovernListComponent },
      { path: 'add-governorate', component: AddGovernorateComponent },
      { path: 'edit-governorate', component: EditGovernorateComponent },

      { path: 'couriers', component: CourierListComponent },
      { path: 'addcourier', component: CourierAddComponent },
      { path: 'editcourier', component: CourierEditComponent },
      { path: 'courierorders', component: CourierOrdersComponent },
      { path: 'rejectedorder', component: RejectedorderComponent },

      { path: 'addTrader', component: AddTraderComponent },
      { path: 'traders', component: TradersComponent },

      { path: 'shippingTypes', component: ShippingTypesComponent },
      { path: 'rejectionReasons', component: RejectionReasonComponent },

      {
        path: 'employees',
        loadComponent: () =>
          import('./components/all-employees/all-employees.component')
            .then(m => m.AllEmployeesComponent)
      },
      { path: 'employeereg', component: RegisterEmployeeComponent },
      { path: 'edit-employee/:id', component: UpdateEmployeeComponent },

      { path: 'saves', component: SaveComponent },
      { path: 'bank-financialtransfer', component: BankFinancialtransferComponent },
      { path: 'safe-financialtransfer', component: SafeFinancialtransferComponent },

      { path: 'extraVillagePrice', component: ExtraVillagePriceComponent },
      { path: 'weight', component: WeightComponent },
      { path: 'addCustomPrice', component: AddCustomPriceComponent },

      { path: 'orders', component: OrdersComponent },

      { path: 'adminAddOrder', component: AdminAddOrderComponent },
      { path: 'traderAddOrder', component: TraderAddOrderComponent },
      { path: 'editOrder/:id', component: EditOrderComponent },
      { path: 'orders/:id/history', component: OrderStatusHistoryComponent },

      { path: 'courier-orders-report', component: OrderReportPaymentComponent },


      {
        path: 'edit-trader/:id',
        loadComponent: () =>
          import('./Pages/edit-trader/edit-trader.component').then(m => m.EditTraderComponent)
      },

      { path: 'AdminDashboard', component: AdminDashboardComponent },
      { path: 'TraderDashboard', component: TraderdashboardComponent },
      { path: 'CourierDashboard', component: CourierdashboardComponent },

      { path: 'Permissions', component: PermissionsComponent },
      { path: 'addpermission', component: AddPermissionComponent },
      //  Admin Routes
      { path: 'banks', component: BanksComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'cities', component: CityListComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'add-city', component: AddCityComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'edit-city', component: EditCityComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'addTrader', component: AddTraderComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'shippingTypes', component: ShippingTypesComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'rejectionReasons', component: RejectionReasonComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'traders', component: TradersComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'branches', component: BranchListComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'edit-branch', component: EditBranchComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'add-branch', component: AddBranchComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'governrates', component: GovernListComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'edit-governorate', component: EditGovernorateComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'add-governorate', component: AddGovernorateComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'couriers', component: CourierListComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'addcourier', component: CourierAddComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'editcourier', component: CourierEditComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'employeereg', component: RegisterEmployeeComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'AdminDashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'Permissions', component: PermissionsComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'addpermission', component: AddPermissionComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'courier-orders-report', component: OrderReportPaymentComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'extraVillagePrice', component: ExtraVillagePriceComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'weight', component: WeightComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'addCustomPrice', component: AddCustomPriceComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'edit-employee/:id', component: UpdateEmployeeComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      {
        path: 'edit-trader/:id',
        loadComponent: () => import('./Pages/edit-trader/edit-trader.component').then(m => m.EditTraderComponent),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      },


      //  Orders (Admin + Trader)
      { path: 'orders', component: OrdersComponent, canActivate: [authGuard], data: { roles: ['Admin'] } },
      { path: 'editOrder/:id', component: EditOrderComponent, canActivate: [authGuard], data: { roles: ['Admin', 'Trader'] } },
      { path: 'orders/:id/history', component: OrderStatusHistoryComponent, canActivate: [authGuard], data: { roles: ['Admin', 'Trader'] } },

      //  Trader Routes
      { path: 'traderAddOrder', component: TraderAddOrderComponent, canActivate: [authGuard], data: { roles: ['Trader'] } },
      { path: 'TraderDashboard', component: TraderdashboardComponent, canActivate: [authGuard], data: { roles: ['Trader'] } },

      //  Courier Routes
      { path: 'courierorders', component: CourierOrdersComponent, canActivate: [authGuard], data: { roles: ['Courier'] } },
      { path: 'rejectedorder', component: RejectedorderComponent, canActivate: [authGuard], data: { roles: ['Courier'] } },
      { path: 'CourierDashboard', component: CourierdashboardComponent, canActivate: [authGuard], data: { roles: ['Courier'] } },

      //  Other (Shared or No Guard Needed)
      { path: 'saves', component: SaveComponent },
      { path: 'bank-financialtransfer', component: BankFinancialtransferComponent },
      { path: 'safe-financialtransfer', component: SafeFinancialtransferComponent },
      { path: 'adminAddOrder', component: AdminAddOrderComponent, canActivate: [authGuard], data: { roles: ['Admin'] }},
      

      {
        path: 'employees',
        loadComponent: () => import('./components/all-employees/all-employees.component').then(m => m.AllEmployeesComponent),
        canActivate: [authGuard],
        data: { roles: ['Admin'] }
      }

      { path: 'chatbot', component: ChatBotComponent },
    ]
  }
];
