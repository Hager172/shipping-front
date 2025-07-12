import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeightService } from '../../services/weight.service';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { SharedModalComponent } from '../../components/shared-modal/shared-modal.component';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';
import { FilterPipe } from '../../shared/filter.pipe';

@Component({
  selector: 'app-weight',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomTableComponent,
    SharedModalComponent,
    ButtonStyleComponent,
    FilterPipe
  ],
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent {
  weights: any[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  isEditMode: boolean = false;
  modalWeight: any = { value: null, pricePerExtraKg: null };
  toBeDeleted: any = null;
  confirmDeleteModal: boolean = false;

  columns = [
    { header: '#', accessor: 'index' },
    { header: 'Value', accessor: 'value' },
    { header: 'Price / Extra KG', accessor: 'pricePerExtraKg' }
  ];

  constructor(private weightService: WeightService) {
    this.loadWeights();
  }

  loadWeights() {
  this.weightService.getWeights().subscribe({
    next: (res: any[]) => {
      this.weights = res.map((w, index) => ({
        ...w,
        index: index + 1
      }));
    },
    error: (err) => {
      console.error('Error loading weights', err);
    }
  });
}


  openAddModal() {
    this.isEditMode = false;
    this.modalWeight = { value: null, pricePerExtraKg: null };
    this.showModal = true;
  }

  openEditModal(weight: any) {
    this.isEditMode = true;
    this.modalWeight = { ...weight };
    this.showModal = true;
  }

  saveWeight() {
    if (this.isEditMode) {
      this.weightService.updateWeight(this.modalWeight.id, this.modalWeight).subscribe({
        next: () => {
          this.loadWeights();
          this.showModal = false;
        },
        error: err => {
          alert(err.error?.message || 'Error updating weight');
        }
      });
    } else {
      this.weightService.createWeight(this.modalWeight).subscribe({
        next: () => {
          this.loadWeights();
          this.showModal = false;
        },
        error: err => {
          alert(err.error?.message || 'Error adding weight');
        }
      });
    }
  }

  confirmDelete(weight: any) {
    this.toBeDeleted = weight;
    this.confirmDeleteModal = true;
  }

  deleteConfirmed() {
    if (!this.toBeDeleted) return;

    this.weightService.deleteWeight(this.toBeDeleted.id).subscribe({
      next: () => {
        this.loadWeights();
        this.confirmDeleteModal = false;
      },
      error: err => {
        alert(err.error?.message || 'Error deleting weight');
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
