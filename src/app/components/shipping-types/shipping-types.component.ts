import { Component } from '@angular/core';
import { ShippingTypesService } from '../../services/shipping-types.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/filter.pipe';

@Component({
  selector: 'app-shipping-types',
  imports: [CommonModule , ReactiveFormsModule , FormsModule,FilterPipe],
  templateUrl: './shipping-types.component.html',
  styleUrl: './shipping-types.component.css'
})
export class ShippingTypesComponent {

  shippingTypes: any[] = [];
  selectedShippingType: any = null;
  //  typeName: 'express', additionalCost: 60, estimatedDays: 1, isActive: true}
  newShippingType: any = {
    typeName:"",
    additionalCost:0,
    estimatedDays:0,
    isActive:false
  };
  showModal = false;
  confirmDeleteModal = false;
  isEditMode = false;

  modalShippingType: any = {};
  toBeDeleted: any = null;
  searchTerm: string = '';

  constructor(private shippingTypesService: ShippingTypesService) {
    this.loadShippingTypes();
  }

  loadShippingTypes() {
    this.shippingTypesService.getAllShippingTypes().subscribe(
      (data: any[]) => {
        console.log('Shipping types loaded:', data);
        this.shippingTypes = data;
      },
      error => {
        console.error('Error loading shipping types', error);
      }
    );
  }

  selectShippingType(shippingType: any) {
    this.selectedShippingType = shippingType;
  }

  addShippingType() {
    this.shippingTypesService.addShippingType(this.newShippingType).subscribe(
      response => {
        this.loadShippingTypes();
        this.newShippingType = {};
      },
      error => {
        console.error('Error adding shipping type', error);
      }
    );
  }

  updateShippingType() {
    if (this.selectedShippingType) {
      this.shippingTypesService.updateShippingType(this.selectedShippingType.id, this.selectedShippingType).subscribe(
        response => {
          this.loadShippingTypes();
          this.selectedShippingType = null;
        },
        error => {
          console.error('Error updating shipping type', error);
        }
      );
    }
  }
updateShippingTypeFromToggle(shipping: any) {
  this.shippingTypesService.updateShippingType(shipping.id, shipping).subscribe(
    () => this.loadShippingTypes(),
    error => console.error('Error updating status', error)
  );
}

  deleteShippingType(shippingType: any) {
    this.shippingTypesService.deleteShippingType(shippingType.id).subscribe(
      response => {
        this.loadShippingTypes();
        if (this.selectedShippingType && this.selectedShippingType.id === shippingType.id) {
          this.selectedShippingType = null;
        }
      },
      error => {
        console.error('Error deleting shipping type', error);
      }
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
    this.shippingTypesService.updateShippingType(this.modalShippingType.id, this.modalShippingType).subscribe(
      () => {
        this.loadShippingTypes();
        this.selectedShippingType = null;
      },
      error => console.error('Error updating shipping type', error)
    );
  } else {
    this.shippingTypesService.addShippingType(this.modalShippingType).subscribe(
      () => {
        this.loadShippingTypes();
      },
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
  this.deleteShippingType(this.toBeDeleted);
  this.confirmDeleteModal = false;
}



}
