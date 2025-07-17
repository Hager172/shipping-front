import { Component, OnInit } from '@angular/core';
import { OrderReportDto } from '../../models/Reports/order-report-dto';
import { ReportServicesService } from '../../services/Report-services/report-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-order-report-payment',
  templateUrl: './order-report-payment.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./order-report-payment.component.css']
})
export class OrderReportPaymentComponent implements OnInit {

  orders: OrderReportDto[] = [];
  pagedOrders: OrderReportDto[] = [];

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

  constructor(private orderService: ReportServicesService) {}

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
        this.courierNames = couriers.map((courier: any) => courier.fullName ?? courier ?? 'Unknown');
      },
      error: (err) => console.error('Error loading couriers', err)
    });

    this.orderService.getBranchNames().subscribe({
      next: (branches) => this.branchNames = branches,
      error: (err) => console.error('Error loading branches', err)
    });

    this.orderService.getCityNames().subscribe({
      next: (cities) => {
        this.cityNames = cities.map((city: any) => city.name ?? city ?? 'Unknown');
      },
      error: (err) => console.error('Error loading cities', err)
    });

    this.orderService.getGovernorateNames().subscribe({
      next: (governorates) => this.governorateNames = governorates,
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
          this.orders = data;
          this.totalRecords = data.length;
          console.log(this.orders);
          
          const start = (this.currentPage - 1) * this.pageSize;
          const end = start + this.pageSize;
          this.pagedOrders = this.orders.slice(start, end);
        }
      },
      error: (err) => {
        console.error('Error loading orders', err);
        this.orders = [];
        this.pagedOrders = [];
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
    if (page < 1 || page > this.totalPages) return;
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
  exportToExcel(): void {
  if (this.orders.length === 0) {
    alert('No data to export.');
    return;
  }

  const exportData = this.orders.map((order, index) => ({
    orderId: order.orderId,
    CreatedDate: order.createdDate,
    Customer: order.customerName,
    Phone: order.phone,
    Trader: order.traderName,
    Courier: order.courierName,
    Branch: order.branchName,
    Governorate: order.governororrateName,
    City: order.cityName,
    Status: order.statusName,
    OrderCost: order.orderCost,
    TotalCost: order.totalCost,
    Weight: order.totalWeight
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = { Sheets: { 'Orders': worksheet }, SheetNames: ['Orders'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'Order_Report.xlsx');
}
exportToPDF(): void {
    if (this.orders.length === 0) {
    alert('No data to export.');
    return;
  }

  const doc = new jsPDF();

  const headers = [
    ['#', 'Created', 'Customer', 'Phone', 'Trader', 'Courier', 'Branch', 'Governorate', 'City', 'Status', 'Order Cost', 'Total Cost', 'Weight']
  ];

  const rows = this.orders.map((order, index) => [
    index + 1,
    new Date(order.createdDate).toLocaleDateString(),
    order.customerName,
    order.phone,
    order.traderName,
    order.courierName,
    order.branchName,
    order.governororrateName,
    order.cityName,
    order.statusName,
    `${order.orderCost} EGP`,
    `${order.totalCost} EGP`,
    order.totalWeight
  ]);

  autoTable(doc, {
    head: headers,
    body: rows,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [3, 62, 62] }, 
    margin: { top: 20 }
  });

  doc.save('Order_Report.pdf');
}

}
