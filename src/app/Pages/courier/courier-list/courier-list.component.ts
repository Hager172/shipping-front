import { Component, OnInit } from '@angular/core';
import { CourierDTO, DisplayCourier } from '../../../models/courier/courier.model';
import { CourierService } from '../../../services/courier.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  discountTypeMap: { [key: number]: string } = {
  0: 'Percentage',
  1: 'Fixed Amount'
};


  searchTerm = '';

  ngOnInit(): void {
    this.loadCouriers();
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
    this.router.navigate(['/edit-courier']);
  }

  addCourier(): void {
    this.router.navigate(['/addcourier']);
  }
}
