import { Component, OnInit } from '@angular/core';
import { CourierService } from '../../../services/courier.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courier-orders',
  imports: [CommonModule],
  templateUrl: './courier-orders.component.html',
  styleUrl: './courier-orders.component.css'
})
export class CourierOrdersComponent implements OnInit {
  orderStatusMap: { [key: number]: string } = {
  1: 'جديد',
  2: 'قيد الانتظار',
  3: 'تم التسليم للمندوب',
  4: 'تم التسليم',
  5: 'لا يمكن الوصول',
  6: 'تم التأجيل',
  7: 'تم التسليم جزئياً',
  8: 'تم الإلغاء بواسطة المستلم',
  9: 'مرفوض مع الدفع',
  10: 'مرفوض مع دفع جزئي',
  11: 'مرفوض بدون دفع'
};

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
        this.filteredOrders = data; // Initialize filtered
        this.setupPagination();
        console.log(data);
      },
      error: (err) => {
        console.error(err);
        console.log("في ايرور يا حبيبتي");
      }
    });
  }
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

rejectOrder(order: any) {
  console.log('Rejecting order:', order);
}

getCourierIdFromToken(): string {

  const token = localStorage.getItem('token');
  if (token) {
    const decoded: any = jwtDecode(token);
    console.log(decoded); // شوفي كل الـ claims بنفسك

    return decoded?.UserId || '';
  }
  return '';
}


}
