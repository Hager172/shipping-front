import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { GovernrateService } from '../../services/governrate.service';
import { CityService } from '../../services/city.service';
import { TraderService } from '../../services/trader.service';
import { CourierService } from '../../services/courier.service';
import { BranchService } from '../../services/branch.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/filter.pipe';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';
import { Router } from '@angular/router';
import { SharedModalComponent } from '../../components/shared-modal/shared-modal.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipe,
    ButtonStyleComponent,
    SharedModalComponent
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 10;

  statuses: { value: number; label: string }[] = [
    { value: 1, label: 'New' },
    { value: 2, label: 'Pending' },
    { value: 3, label: 'Delivered To Courier' },
    { value: 4, label: 'Delivered' },
    { value: 5, label: 'Not Reachable' },
    { value: 6, label: 'Postponed' },
    { value: 7, label: 'Partially Delivered' },
    { value: 8, label: 'Cancelled By Recipient' },
    { value: 9, label: 'Rejected With Payment' },
    { value: 10, label: 'Rejected With Partial Payment' },
    { value: 11, label: 'Rejected Without Payment' }
  ];

  statusOptions = this.statuses.map(s => ({
    value: s.value,
    label: s.label,
    disabled: ![1, 2, 8].includes(s.value)
  }));

  searchText = '';
  governorates: any[] = [];
  cities: any[] = [];
  traders: any[] = [];
  couriers: any[] = [];
  branches: any[] = [];

  selectedGovernorateId: number | null = null;
  selectedCityId: number | null = null;
  selectedTraderId: string = '';
  selectedCourierId: string = '';
  selectedBranchId: number | null = null;
  selectedStatus: number | null = null;
  selectedOrderId: number | null = null;
  startDate: string = '';
  endDate: string = '';

  selectedCourierForOrder: { [orderId: number]: any } = {};

  constructor(
    private orderService: OrderService,
    private govService: GovernrateService,
    private cityService: CityService,
    private traderService: TraderService,
    private courierService: CourierService,
    private branchService: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadFilters();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.orders = res.map((order: any, index: number) => ({
            ...order,
            index: index + 1,
            statusLabel: this.getStatusLabel(order.status),
            changeStatus: order.status
          }));
          this.filteredOrders = [...this.orders];
        } else {
          this.orders = [];
          this.filteredOrders = [];
        }
      },
      error: () => {
        this.orders = [];
        this.filteredOrders = [];
      }
    });
  }

  get paginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredOrders.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredOrders.length / this.itemsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  loadFilters(): void {
    this.govService.getAll().subscribe((res) => (this.governorates = res));
    this.cityService.getAllCities().subscribe((res) => (this.cities = res));
    this.traderService.getTraders().subscribe((res) => (this.traders = res));
    this.courierService.getAllCouriers().subscribe((res) => (this.couriers = res));
    this.branchService.getAllBranches().subscribe((res) => (this.branches = res));
  }

  getStatusLabel(statusValue: number): string {
    const match = this.statuses.find((s) => s.value === statusValue);
    return match ? match.label : statusValue.toString();
  }

   filterOrders(): void {
  if (this.selectedOrderId !== null) {
    this.orderService.getOrderById(this.selectedOrderId).subscribe({
      next: (res: any) => {
        if (res) {
          res.statusLabel = this.getStatusLabel(res.status);
          res.changeStatus = res.status;
          res.index = 1;
          this.orders = [res];
          this.filteredOrders = [...this.orders];
        }
      }
    });
  } else if (this.selectedStatus !== null) {
    this.orderService.getOrdersByStatus(this.selectedStatus).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.orders = res.map((o: any, i: number) => ({
            ...o,
            index: i + 1,
            statusLabel: this.getStatusLabel(o.status),
            changeStatus: o.status
          }));
          this.filteredOrders = [...this.orders];
        }
      }
    });
  } else if (this.startDate && this.endDate) {
    this.orderService.getOrdersByDateRange(this.startDate, this.endDate).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.orders = res.map((o: any, i: number) => ({
            ...o,
            index: i + 1,
            statusLabel: this.getStatusLabel(o.status),
            changeStatus: o.status
          }));
          this.filteredOrders = [...this.orders];
        }
      }
    });
  } else if (this.selectedGovernorateId) {
    this.orderService.getOrdersByGovId(this.selectedGovernorateId).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.orders = res.map((o: any, i: number) => ({
            ...o,
            index: i + 1,
            statusLabel: this.getStatusLabel(o.status),
            changeStatus: o.status
          }));
          this.filteredOrders = [...this.orders];
        }
      }
    });
  } else if (this.selectedCityId) {
    this.orderService.getOrdersByCityId(this.selectedCityId).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.orders = res.map((o: any, i: number) => ({
            ...o,
            index: i + 1,
            statusLabel: this.getStatusLabel(o.status),
            changeStatus: o.status
          }));
          this.filteredOrders = [...this.orders];
        }
      }
    });
  } else if (this.selectedTraderId) {
    this.orderService.getOrdersByTraderId(this.selectedTraderId).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.orders = res.map((o: any, i: number) => ({
            ...o,
            index: i + 1,
            statusLabel: this.getStatusLabel(o.status),
            changeStatus: o.status
          }));
          this.filteredOrders = [...this.orders];
        }
      }
    });
  } else if (this.selectedCourierId) {
    this.orderService.getOrdersByCourierId(this.selectedCourierId).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.orders = res.map((o: any, i: number) => ({
            ...o,
            index: i + 1,
            statusLabel: this.getStatusLabel(o.status),
            changeStatus: o.status
          }));
          this.filteredOrders = [...this.orders];
        }
      }
    });
  } else if (this.selectedBranchId) {
    this.orderService.getOrdersByBranchId(this.selectedBranchId).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.orders = res.map((o: any, i: number) => ({
            ...o,
            index: i + 1,
            statusLabel: this.getStatusLabel(o.status),
            changeStatus: o.status
          }));
          this.filteredOrders = [...this.orders];
        }
      }
    });
  } else {
    this.loadOrders();
  }
}

onStatusChange(event: any, order: any): void {
  const newStatus = Number(event); 
  order.changeStatus = newStatus;

  const dto = {
    customerName: order.customerName,
    email: order.email,
    phone1: order.phone1,
    phone2: order.phone2,
    streetAddress: order.streetAddress,
    deliveryType: order.deliveryType,
    paymentType: order.paymentType,
    shippingTypeId: order.shippingTypeId,
    totalWeight: order.totalWeight,
    orderCost: order.orderCost,
    notes: order.notes,
    status: newStatus,
    governorateId: order.governorateId,
    cityId: order.cityId,
    branchId: order.branchId,
    traderId: order.traderId,
    courierId: order.courierId,
    createdAt: order.createdAt,
    rejectionReasonId: order.rejectionReasonId || null
  };

  this.orderService.updateOrder(order.id, dto).subscribe({
    next: () => {
      order.statusLabel = this.getStatusLabel(newStatus);
      alert('Status updated successfully');
    },
    error: err => {
      console.error('Update status failed', err);
      alert('Failed to update status');
    }
  });
}


assignCourier(order: any): void {
  const courierId = this.selectedCourierForOrder[order.id];
  if (!courierId) return;

  const dto = {
    ...order,        
    courierId: courierId,
    RejectionReasonId :null,
    status: order.changeStatus
  };
  this.orderService.updateOrder(order.id, dto).subscribe({
    next: updated => {
      order.courierId = courierId;
      alert('Courier assigned successfully');
    },
    error: err => console.error('Assign courier failed', err)
  });
}


  openAssignDropdown(order: any): void {
    this.selectedCourierForOrder[order.id] = order.courierId || '';
  }

  editOrder(order: any) {
  this.router.navigate([`/editOrder/${order.id}`]);
}


  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(
      (data)=>{
        alert("Order Deleted Successfully !")
      },
      (error)=>{
      alert("can't delete Order");
    }
      
    )

    console.log('Delete', orderId);
  }

  goToAddOrder(): void {
    this.router.navigate(['/adminAddOrder']);
  }

  hasBranchMatch(courier: any, branchId: number): boolean {
  return courier.selectedBranchsId?.includes(branchId);
  }

  showAssignModal = false;
modalOrder: any = null;

openAssignModal(order: any) {
  this.modalOrder = order;
  this.selectedCourierForOrder[order.id] = order.courierId || '';
  this.showAssignModal = true;
}

closeAssignModal() {
  this.showAssignModal = false;
  this.modalOrder = null;
}
assignCourierHandler = () => {
  if (this.modalOrder) {
    this.assignCourier(this.modalOrder);
  }
};
}
