import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { FormsModule } from '@angular/forms';
import { SharedModalComponent } from '../../components/shared-modal/shared-modal.component';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';
import { Save } from '../../models/Saves/save.model';
import { SaveServiceService } from '../../services/save services/save.service';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-save',
  imports: [CommonModule, RouterModule, CustomTableComponent, FormsModule, SharedModalComponent, ButtonStyleComponent],
  templateUrl: './save.component.html',
  styleUrl: './save.component.css'
})
export class SaveComponent {
  saves: Save[] = [];

  columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Branch Name', accessor: 'branchName' },
    { header: 'Balance', accessor: 'balance' },
    { header: 'Created Date', accessor: 'createdDate' },
    { header: 'Active', accessor: 'isActive', type: 'toggle' }
  ];

  showModal = false;
  branches: any[] = [];
  showDeleteModal = false;
  saveToDelete: Save | null = null;
  searchTerm: string = '';


  selectedSave: Save = {
    id: 0,
    name: '',
    branchName: '',
    balance: 0,
    isActive: true,
    createdDate: new Date().toISOString(),
    branchId: 0
  };
  constructor(private saveService: SaveServiceService, private branchService: BranchService) { }

  ngOnInit(): void {
    this.loadSaves();
    this.loadBranches();
  }

  loadBranches() {
    this.branchService.getAllBranches().subscribe({
      next: (data) => {
        this.branches = data;
        console.log('Branches loaded:', data);
      },
      error: (err) => {
        console.error('Error loading branches:', err);
      }
    });
  }

  loadSaves() {
    this.saveService.getAllSaves().subscribe({
      next: (data) => {
        this.saves = data;
      },
      error: (err) => {
        console.error('Error loading saves:', err);
      }
    });
  }

  get filteredSaves(): Save[] {
    return this.saves.filter(save =>
      save.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // open modal for adding or editing a save
  openModal(save?: Save) {
    if (save) {
      this.selectedSave = { ...save };
    } else {
      this.selectedSave = {
        id: 0,
        name: '',
        branchName: '',
        balance: 0,
        isActive: true,
        createdDate: new Date().toISOString(),
        branchId: 0
      };
    }
    this.showModal = true;
  }
   closeModal(): void {
    this.showModal = false;
  }
  saveEditedSave(save: Save) {
    if (!save.id || save.id === 0) {
      this.saveService.addSave(save).subscribe({
      next: (newSave) => {
        this.saves.push(newSave);
        this.loadSaves();
        this.closeModal();
      },
      error: err => console.error('Add error:', err)
    });
  } else {
    this.saveService.updateSave(save.id, save).subscribe({
      next: () => {
        const index = this.saves.findIndex(s => s.id === save.id);
        if (index !== -1) this.saves[index] = save;
        this.loadSaves();
        this.closeModal();
      },
      error: err => console.error('Update error:', err)
    });
  }
}

 openDeleteModal(save: Save): void {
    this.saveToDelete = save;
    this.showDeleteModal = true;
  }
  confirmDelete(): void {
    if (this.saveToDelete) {
      this.saveService.deleteSave(this.saveToDelete.id).subscribe({
        next: () => {
          this.saves = this.saves.filter(s => s.id !== this.saveToDelete!.id);
          this.closeDeleteModal();
          console.log('Save deleted.');
        },
        error: err => console.error('Delete error:', err)
      });
    }
  }
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.saveToDelete = null;
  }


  toggleStatus(save: Save): void {
    if (save.isActive) {
      this.saveService.activateSave(save.id).subscribe({
        next: () => console.log(`Save ${save.name} activated.`),
        error: (err) => console.error('Activation error:', err)
      });
    } else {
      this.saveService.disactivateSave(save.id).subscribe({
        next: () => console.log(`Save ${save.name} disactivated.`),
        error: (err) => console.error('Disactivation error:', err)
      });
    }
  }
}
