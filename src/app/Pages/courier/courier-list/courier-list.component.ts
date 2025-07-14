import { Component, OnInit } from '@angular/core';
import { CourierDTO, DisplayCourier } from '../../../models/courier/courier.model';
import { CourierService } from '../../../services/courier.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-courier-list',
  imports: [CommonModule],
  templateUrl: './courier-list.component.html',
  styleUrl: './courier-list.component.css'
})
export class CourierListComponent  {

  constructor(private courierService: CourierService, private router: Router) {}

  couriers: DisplayCourier[] = [];
  filtered: DisplayCourier[] = [];
   selectedCourier: DisplayCourier | null = null;
  deleteModal: any;
    errormessage: string = '';

  discountTypeMap: { [key: number]: string } = {
  0: 'Percentage',
  1: 'Fixed Amount'
};


  searchTerm = '';

  ngOnInit(): void {
    this.loadCouriers();
       const modalEl = document.getElementById('deleteConfirmModal');
    if (modalEl) {
      this.deleteModal = new bootstrap.Modal(modalEl);
    }
  }

  loadCouriers(): void {
    this.courierService.getAllCouriers().subscribe(data => {
      this.couriers = data;
      this.filtered = data;
    });
  }

  filterCouriers(): void {
    this.filtered = this.couriers.filter(courier =>
      courier.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.filterCouriers();
  }

  editCourier(courier: DisplayCourier): void {
    this.courierService.selectedCourier = courier;
    this.router.navigate(['/editcourier']);
  }

  addCourier(): void {
    this.router.navigate(['/addcourier']);
  }
  deleteCourier(courier: DisplayCourier): void {
    this.selectedCourier = courier;
    console.log(this.selectedCourier);
    this.deleteModal.show();
  }

  confirmDelete(): void {
    this.errormessage = '';
    console.log(this.selectedCourier)
    if (!this.selectedCourier) return;

    this.courierService.deleteCourier(this.selectedCourier.userId).subscribe({
      next: () => {
        this.filtered = this.filtered.filter(
          c => c.userId !== this.selectedCourier?.userId
        );
        this.deleteModal.hide();
        this.errormessage = 'Courier deleted successfully';
        setTimeout(() => {
          this.errormessage = '';
        }, 2000);
      },
      error: (err) => {
        this.errormessage = err.error || 'Error deleting courier';
        this.deleteModal.hide();
        setTimeout(() => {
          this.errormessage = '';
        }, 2000);
      }
    });
  }
}
