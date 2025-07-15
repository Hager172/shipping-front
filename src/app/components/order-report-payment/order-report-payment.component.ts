import { Component, OnInit } from '@angular/core';
import { OrderReportDto } from '../../models/Reports/order-report-dto';
import { ReportServicesService } from '../../services/Report-services/report-services.service';
import { CommonModule } from '@angular/common'; // ضروري عشان *ngFor, *ngIf
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-order-report-payment',
   
  templateUrl: './order-report-payment.component.html',
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./order-report-payment.component.css']
})
export class OrderReportPaymentComponent implements OnInit {

  orders: OrderReportDto[] = [];
  searchText = '';
  fromDate = '';
  toDate = '';

  // Filters
  selectedTraderName = '';
  selectedCourierName = '';
  selectedBranchName = '';
  selectedCityName = '';
  selectedGovernorateName = '';
  selectedPaymentType = '';
  selectedStatus = '';

  // Dropdown options
  traderNames: string[] = [];
  courierNames: string[] = [];
  branchNames: string[] = [];
  cityNames: string[] = [];
  governorateNames: string[] = [];
  paymentTypes: any[] = [];
  orderStatuses: any[] = [];

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalRecords = 0;

  constructor(
    private orderService: ReportServicesService,
  ) {}

  ngOnInit(): void {
    this.loadDropdownData();
    this.loadOrders();
  }

  loadDropdownData(): void {
this.orderService.getTraderNames().subscribe({
  next: (traders) => {
    this.traderNames = traders.map((trader: any) => {
      return trader.storeName ?? trader.fullName ?? 'Unknown';
    });
  },
  error: (err) => console.error('Error loading traders', err)
});
this.orderService.getCourierNames().subscribe({
  next: (couriers) => {
    console.log('Couriers:', couriers); // 👈 شوف شكلهم هنا
    this.courierNames = couriers.map((courier: any) => courier.fullName ?? courier ?? 'Unknown');
  },
  error: (err) => console.error('Error loading couriers', err)
});


  this.orderService.getBranchNames().subscribe({
    next: (branches) => {
      this.branchNames = branches;
    },
    error: (err) => console.error('Error loading branches', err)
  });

this.orderService.getCityNames().subscribe({
  next: (cities) => {
    console.log('Cities:', cities); // 👈 شوف شكلهم هنا
    this.cityNames = cities.map((city: any) => city.name ?? city ?? 'Unknown');
  },
  error: (err) => console.error('Error loading cities', err)
});
  this.orderService.getGovernorateNames().subscribe({
    next: (governorates) => {
      this.governorateNames = governorates;
    },
    error: (err) => console.error('Error loading governorates', err)
  });

  this.paymentTypes = [
    { value: 'Cash', text: 'Cash' },
    { value: 'Card', text: 'Card' },
    { value: 'Online', text: 'Online' }
  ];

  this.orderStatuses = [
    { value: 'Pending', text: 'Pending' },
    { value: 'Active', text: 'Active' },
    { value: 'Delivered', text: 'Delivered' },
    { value: 'Cancelled', text: 'Cancelled' }
  ];
}


 loadOrders(): void {
  this.orderService.getAllReportServicesPayment({
    PageNumber: this.currentPage,
    PageSize: this.pageSize,
    TraderName: this.selectedTraderName,
    CourierName: this.selectedCourierName,
    BranchName: this.selectedBranchName,
    CityName: this.selectedCityName,
    GovernorateName: this.selectedGovernorateName,
    PaymentType: this.selectedPaymentType,
    Status: this.selectedStatus,
    SearchTerm: this.searchText,
    FromDate: this.fromDate,
    ToDate: this.toDate
  }).subscribe({
    next: (data) => {
      if (Array.isArray(data)) {
        // Response is array only (no pagination)
        this.orders = data;
        this.totalRecords = data.length;
      } 
    },
    error: (err) => {
      console.error('Error loading orders', err);
      this.orders = [];
      this.totalRecords = 0;
    }
  });
}

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadOrders();
  }

  clearFilters(): void {
    this.selectedTraderName = '';
    this.selectedCourierName = '';
    this.selectedBranchName = '';
    this.selectedCityName = '';
    this.selectedGovernorateName = '';
    this.selectedPaymentType = '';
    this.selectedStatus = '';
    this.searchText = '';
    this.fromDate = '';
    this.toDate = '';
    this.onFilterChange();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      case 'pending': return 'status-pending';
      default: return 'status-default';
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadOrders();
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onCreateOrder(): void {
    console.log('Create Order clicked');
  }
}
