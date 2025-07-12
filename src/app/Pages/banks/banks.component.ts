import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank services/bank.service';
import { Bank } from '../../models/Banks/bank.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomTableComponent } from "../../components/custom-table/custom-table.component";
import { SharedModalComponent } from "../../components/shared-modal/shared-modal.component";
import { FormsModule } from '@angular/forms';
import { BranchService } from '../../services/branch.service';
import { ButtonStyleComponent } from "../../components/button-style/button-style.component";

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, CustomTableComponent, FormsModule, SharedModalComponent, ButtonStyleComponent],
})
export class BanksComponent implements OnInit {
  banks: Bank[] = [];

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
  bankToDelete: Bank | null = null;
  searchTerm: string = '';


  selectedBank: Bank = {
    id: 0,
    name: '',
    branchName: '',
    balance: 0,
    isActive: true,
    createdDate: new Date().toISOString(),
    branchId: 0
  };


  constructor(private bankService: BankService, private branchService: BranchService) { }

  ngOnInit(): void {
    this.loadBanks();
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

  loadBanks() {
    this.bankService.getAllBanks().subscribe({
      next: (data) => {
        this.banks = data;
      },
      error: (err) => {
        console.error('Error loading banks:', err);
      }
    });
  }
  get filteredBanks(): Bank[] {
    return this.banks.filter(bank =>
      bank.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  openAddModal(): void {
    this.selectedBank = {
      id: 0,
      name: '',
      branchName: '',
      balance: 0,
      isActive: true,
      createdDate: new Date().toISOString(),
      branchId: 0
    };
    this.showModal = true;
  }
  openEditModal(bank: Bank): void {
    this.selectedBank = { ...bank }; // Make a copy
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveEditedBank(bank: Bank) {
  if (!bank.id || bank.id === 0) {
    // ⬅️ حالة الإضافة
    this.bankService.addBank(bank).subscribe({
      next: (newBank) => {
        this.banks.push(newBank);
        this.loadBanks();
        this.closeModal();
      },
      error: err => console.error('Add error:', err)
    });
  } else {
    // ⬅️ حالة التعديل
    this.bankService.updateBank(bank.id, bank).subscribe({
      next: () => {
        const index = this.banks.findIndex(b => b.id === bank.id);
        if (index !== -1) this.banks[index] = bank;
        this.loadBanks();
        this.closeModal();
      },
      error: err => console.error('Update error:', err)
    });
  }
}
  openDeleteModal(bank: Bank): void {
    this.bankToDelete = bank;
    this.showDeleteModal = true;
  }
  confirmDelete(): void {
    if (this.bankToDelete) {
      this.bankService.deleteBank(this.bankToDelete.id).subscribe({
        next: () => {
          this.banks = this.banks.filter(b => b.id !== this.bankToDelete!.id);
          this.closeDeleteModal();
          console.log('Bank deleted.');
        },
        error: err => console.error('Delete error:', err)
      });
    }
  }
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.bankToDelete = null;
  }


  toggleStatus(bank: Bank): void {
    if (bank.isActive) {
      this.bankService.activateBank(bank.id).subscribe({
        next: () => console.log(`Bank ${bank.name} activated.`),
        error: (err) => console.error('Activation error:', err)
      });
    } else {
      this.bankService.disactivateBank(bank.id).subscribe({
        next: () => console.log(`Bank ${bank.name} disactivated.`),
        error: (err) => console.error('Disactivation error:', err)
      });
    }
  }
}
