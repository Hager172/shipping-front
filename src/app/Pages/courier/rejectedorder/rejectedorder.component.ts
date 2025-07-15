import { Component, OnInit } from '@angular/core';
import { CourierService } from '../../../services/courier.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rejectedorder',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './rejectedorder.component.html',
  styleUrl: './rejectedorder.component.css'
})
export class RejectedorderComponent implements OnInit {
   orders: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages: number[] = [];
  courierId: string = '';
  statusMap: { [key: number]: string } = {
    9: 'Rejected with Full Payment',
    10: 'Rejected with Partial Payment',
    11: 'Rejected without Payment'
  };


  constructor(private courierService: CourierService) {}

 ngOnInit(): void {
    this.courierId = this.getCourierIdFromToken();
    if (this.courierId) {
      this.courierService.getRejectedOrders(this.courierId).subscribe({
        next: (data) => {
          this.orders = data;
          this.setupPagination();
        },
        error: (err) => {
          console.error('Failed to load rejected orders:', err);
        }
      });
    }
  }

  getCourierIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded?.UserId || '';
    }
    return '';
  }

  setupPagination() {
    const total = Math.ceil(this.orders.length / this.itemsPerPage);
    this.totalPages = Array.from({ length: total }, (_, i) => i + 1);
    this.goToPage(1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.orders.slice(start, end);
  }

  viewDetails(order: any) {
    console.log('Order details:', order);
  }

}
