// import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../../services/order.service';
// import { BranchService } from '../../services/branch.service';
// import { GovernrateService } from '../../services/governrate.service';
// import { CityService } from '../../services/city.service';
// // import { CourierService } from '../../services/cour.service';
// import { TraderService } from '../../services/trader.service';

// @Component({
//   selector: 'app-order',
//   templateUrl: './orders.component.html',
//   styleUrl: './orders.component.css'
// })
// export class OrderComponent implements OnInit {
//   orders: any[] = [];
//   filteredOrders: any[] = [];

//   traders: any[] = [];
//   branches: any[] = [];
//   governorates: any[] = [];
//   cities: any[] = [];
//   couriers: any[] = [];

//   filters = {
//     traderId: '',
//     branchId: '',
//     governorateId: '',
//     cityId: '',
//     courierId: '',
//     status: '',
//     fromDate: '',
//     toDate: ''
//   };

//   columns = [
//     { header: '#', accessor: 'index' },
//     { header: 'Customer Name', accessor: 'customerName' },
//     { header: 'Governorate', accessor: 'governorateName' },
//     { header: 'City', accessor: 'cityName' },
//     { header: 'Courier', accessor: 'courierName' },
//     { header: 'Branch', accessor: 'branchName' },
//     { header: 'Order Cost', accessor: 'orderCost' },
//     { header: 'Total Cost', accessor: 'totalCost' },
//     { header: 'Status', accessor: 'status' },
//     { header: 'Date', accessor: 'createdAt' }
//   ];

//   constructor(
//     private orderService: OrderService,
//     private branchService: BranchService,
//     private cityService: CityService,
//     private governorateService: GovernrateService,
//     // private courierService: CourierService,
//     private traderService: TraderService
//   ) {}

//   ngOnInit(): void {
//     this.loadOrders();
//     this.loadFilters();
//   }

//   loadOrders() {
//     this.orderService.getAllOrders().subscribe((res: any[]) => {
//       this.orders = res.map((order, index) => ({
//         ...order,
//         index: index + 1
//       }));
//       this.filteredOrders = this.orders;
//     });
//   }

//   loadFilters() {
//     this.traderService.getTraders().subscribe((res: any) => this.traders = res);
//     this.branchService.getAllBranches().subscribe((res: any) => this.branches = res);
//     this.governorateService.getAll().subscribe((res: any) => this.governorates = res);
//     // this.courierService.getAllCouriers().subscribe((res: any) => this.couriers = res);
//   }

//   onGovernorateChange() {
//     if (this.filters.governorateId) {
//       this.cityService.getCitiesByGovId(this.filters.governorateId).subscribe((res: any) => {
//         this.cities = res;
//       });
//     }
//   }

//   applyFilters() {
//     let filtered = [...this.orders];
//     if (this.filters.traderId) {
//       filtered = filtered.filter(o => o.traderId === this.filters.traderId);
//     }
//     if (this.filters.branchId) {
//       filtered = filtered.filter(o => o.branchId === this.filters.branchId);
//     }
//     if (this.filters.governorateId) {
//       filtered = filtered.filter(o => o.governorateId === this.filters.governorateId);
//     }
//     if (this.filters.cityId) {
//       filtered = filtered.filter(o => o.cityId === this.filters.cityId);
//     }
//     if (this.filters.courierId) {
//       filtered = filtered.filter(o => o.courierId === this.filters.courierId);
//     }
//     if (this.filters.status) {
//       filtered = filtered.filter(o => o.status === +this.filters.status);
//     }
//     if (this.filters.fromDate && this.filters.toDate) {
//       const from = new Date(this.filters.fromDate);
//       const to = new Date(this.filters.toDate);
//       filtered = filtered.filter(o => {
//         const created = new Date(o.createdAt);
//         return created >= from && created <= to;
//       });
//     }

//     this.filteredOrders = filtered;
//   }

//   openAddOrderPage() {
//     // Navigate to new order page or open modal
//   }
// }
