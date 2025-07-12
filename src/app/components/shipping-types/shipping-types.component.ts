import { Component } from '@angular/core';
import { ShippingTypesService } from '../../services/shipping-types.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/filter.pipe';
import { CustomTableComponent } from '../custom-table/custom-table.component';
import { ButtonStyleComponent } from '../button-style/button-style.component';

@Component({
  selector: 'app-shipping-types',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipe,
    CustomTableComponent,
    ButtonStyleComponent
  ],
  templateUrl: './shipping-types.component.html',
  styleUrls: ['./shipping-types.component.css']
})
export class ShippingTypesComponent {
  shippingTypes: any[] = [];
  selectedShippingType: any = null;
  modalShippingType: any = {};
  toBeDeleted: any = null;
  searchTerm: string = '';
  showModal = false;
  confirmDeleteModal = false;
  isEditMode = false;

  columns = [
    { header: '#', accessor: 'id'},
    { header: 'Name', accessor: 'typeName' },
    { header: 'Additional Cost', accessor: 'additionalCost' },
    { header: 'Estimated Days', accessor: 'estimatedDays' },
    { header: 'Status', accessor: 'isActive', type: 'toggle' }
  ];

  constructor(private shippingTypesService: ShippingTypesService) {
    this.loadShippingTypes();
  }

  loadShippingTypes() {
    this.shippingTypesService.getAllShippingTypes().subscribe(
      (data: any[]) => (this.shippingTypes = data),
      error => console.error('Error loading shipping types', error)
    );
  }

  openAddModal() {
    this.modalShippingType = { isActive: false };
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditModal(type: any) {
    this.modalShippingType = { ...type };
    this.isEditMode = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalShippingType = {};
  }

  saveShippingType() {
    if (this.isEditMode) {
      this.shippingTypesService
        .updateShippingType(this.modalShippingType.id, this.modalShippingType)
        .subscribe(
          () => this.loadShippingTypes(),
          error => console.error('Error updating shipping type', error)
        );
    } else {
      this.shippingTypesService.addShippingType(this.modalShippingType).subscribe(
        () => this.loadShippingTypes(),
        error => console.error('Error adding shipping type', error)
      );
    }
    this.closeModal();
  }

  confirmDelete(type: any) {
    this.toBeDeleted = type;
    this.confirmDeleteModal = true;
  }

  deleteConfirmed() {
    this.shippingTypesService.deleteShippingType(this.toBeDeleted.id).subscribe(
      () => this.loadShippingTypes(),
      error => console.error('Error deleting shipping type', error)
    );
    this.confirmDeleteModal = false;
  }

  updateShippingTypeFromToggle(shipping: any) {
    this.shippingTypesService.updateShippingType(shipping.id, shipping).subscribe(
      () => this.loadShippingTypes(),
      error => console.error('Error updating status', error)
    );
  }
}