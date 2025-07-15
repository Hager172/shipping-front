import { Component, OnInit } from '@angular/core';
import { CourierService } from '../../../services/courier.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RejectionReasonComponent } from '../../rejection-reason/rejection-reason.component';
import { RejectionReason } from '../../../models/courier/courier.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courier-orders',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './courier-orders.component.html',
  styleUrl: './courier-orders.component.css'
})

export class CourierOrdersComponent implements OnInit {
  rejectionReasons: RejectionReason[] = [];
selectedRejectionReasonId: number | null = null;
showRejectionModal = false;
orderPendingRejection: any = null;
selectedRejectionStatus: number | null = null;



 statusOptions = [
    { value: 4, label: 'Delivered' },
    { value: 5, label: 'Not Reachable' },
    { value: 6, label: 'Postponed' },
    { value: 7, label: 'Partially Delivered' },
    { value: 8, label: 'Cancelled by Receiver' }
  ];

  rejectedStatusOptions = [
    { value: 9, label: 'Rejected with Full Payment' },
    { value: 10, label: 'Rejected with Partial Payment' },
    { value: 11, label: 'Rejected without Payment' }
  ];
rejectOrder(order: any) {
  this.orderPendingRejection = { ...order };
  this.selectedRejectionStatus = null;
  this.selectedRejectionReasonId = null;
  this.showRejectionModal = true;
}


orders: any[] = [];
  courierId: string = '';
  paginatedData: any[] = [];
currentPage = 1;
itemsPerPage = 5;
totalPages: number[] = [];
searchTerm: string = '';
filteredOrders: any[] = [];


  constructor(private courierService: CourierService) {}

 ngOnInit(): void {
    this.courierId = this.getCourierIdFromToken();

    if (this.courierId) {
      this.courierService.getOrdersByCourierId(this.courierId).subscribe({
        next: (data) => {
          this.orders = data;
          this.filteredOrders = data;
          this.setupPagination();
          console.log(data);
        },
        error: (err) => {
          console.error(err);
          console.log("An error occurred while fetching orders.");
        }
      });
    }

    this.courierService.getRejectionReasons().subscribe({
      next: (data) => {
        this.rejectionReasons = data;
      },
      error: (err) => {
        console.error('Failed to load rejection reasons:', err);
      }
    });
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = value;

    this.filteredOrders = this.orders.filter(order =>
      order.customerName?.toLowerCase().includes(this.searchTerm)
    );

    this.setupPagination();
  }

  setupPagination() {
    const total = Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    this.totalPages = Array.from({ length: total }, (_, i) => i + 1);
    this.goToPage(1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.filteredOrders.slice(start, end);
  }

  viewDetails(order: any) {
    console.log('Order details:', order);
  }

  getCourierIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded); // Check claims
      return decoded?.UserId || '';
    }
    return '';
  }

  updateOrderStatus(order: any, newStatus: number) {
    if ([9, 10, 11].includes(newStatus)) {
      this.orderPendingRejection = { ...order, newStatus };
      this.showRejectionModal = true;
      return;
    }

    const payload = {
      orderId: order.orderId,
      newStatus: newStatus
    };

    this.courierService.updateOrderStatus(payload.orderId, payload.newStatus).subscribe({
      next: () => {
        order.status = newStatus;
        console.log('Order status updated successfully.');
      },
      error: (err) => {
        console.error('Error while updating order status:', err);
      }
    });
  }

  submitRejection() {
    if (!this.orderPendingRejection) return;

    const payload = {
      orderId: this.orderPendingRejection.orderId,
      newStatus: this.selectedRejectionStatus,
      rejectionReasonId: this.selectedRejectionReasonId
    };

    this.courierService.updateOrderStatus(
      payload.orderId,
      payload.newStatus!,
      payload.rejectionReasonId!
    ).subscribe({
      next: () => {
        this.orders = this.orders.map(o =>
          o.orderId === payload.orderId ? { ...o, status: payload.newStatus } : o
        );
        this.filteredOrders = [...this.orders];
        this.setupPagination();

        this.showRejectionModal = false;
        this.selectedRejectionStatus = null;
        this.selectedRejectionReasonId = null;
        this.orderPendingRejection = null;

        console.log('Order rejected successfully.');
      },
      error: (err) => {
        console.error('Failed to reject order:', err);
      }
    });
  }






}
