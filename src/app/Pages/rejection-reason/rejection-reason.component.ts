import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RejectionReasonService } from '../../services/rejection-reason.service';
import { FilterPipe } from '../../shared/filter.pipe';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';

@Component({
  selector: 'app-rejection-reason',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonStyleComponent,
    CustomTableComponent,
    FilterPipe
  ],
  templateUrl: './rejection-reason.component.html',
  styleUrls: ['./rejection-reason.component.css']
})
export class RejectionReasonComponent {
  rejectionReasons: any[] = [];
  modalRejectionReason: any = {};
  selectedRejectionReason: any = null;
  toBeDeleted: any = null;

  showModal: boolean = false;
  confirmDeleteModal: boolean = false;
  isEditMode: boolean = false;
  searchTerm: string = '';

  columns = [
    { header: '#', accessor: 'id' },
    { header: 'Reason', accessor: 'reason' }
  ];

  constructor(private rejectionReasonService: RejectionReasonService) {
    this.loadRejectionReasons();
  }

  loadRejectionReasons() {
    this.rejectionReasonService.getAllRejectionReasons().subscribe(
      (data: any[]) => {
        this.rejectionReasons = data;
        console.log('Rejection Reasons Loaded:', this.rejectionReasons);
      },
      error => console.error('Error loading rejection reasons', error)
    );
  }

  openAddModal() {
    this.modalRejectionReason = {};
    this.isEditMode = false;
    this.showModal = true;
  }

  openEditModal(reason: any) {
    this.modalRejectionReason = { ...reason };
    this.isEditMode = true;
    this.showModal = true;
  }

  closeModal() {
    this.modalRejectionReason = {};
    this.showModal = false;
  }

  saveRejectionReason() {
    if (this.isEditMode) {
      this.rejectionReasonService
        .updateRejectionReason(this.modalRejectionReason.id, this.modalRejectionReason)
        .subscribe(
          () => {
            this.loadRejectionReasons();
            this.closeModal();
          },
          error => console.error('Error updating rejection reason', error)
        );
    } else {
      this.rejectionReasonService
        .addRejectionReason(this.modalRejectionReason)
        .subscribe(
          () => {
            this.loadRejectionReasons();
            this.closeModal();
          },
          error => console.error('Error adding rejection reason', error)
        );
    }
  }

  confirmDelete(reason: any) {
    this.toBeDeleted = reason;
    this.confirmDeleteModal = true;
  }

  deleteConfirmed() {
    if (!this.toBeDeleted) return;

    this.rejectionReasonService.deleteRejectionReason(this.toBeDeleted.id).subscribe(
      () => {
        this.loadRejectionReasons();
        this.confirmDeleteModal = false;
        this.toBeDeleted = null;
      },
      error => console.error('Error deleting rejection reason', error)
    );
  }
}
