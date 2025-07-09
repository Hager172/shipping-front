import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank services/bank.service';
import { Bank } from '../../models/Banks/bank.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomTableComponent } from "../../components/custom-table/custom-table.component";
import { EditBankModalComponent } from '../../components/edit-bank-modal/edit-bank-modal.component';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, CustomTableComponent, EditBankModalComponent],
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

  selectedBank: Bank | null = null;
  showModal: boolean = false;

  constructor(private bankService: BankService) { }

  ngOnInit(): void {
    this.loadBanks();
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

  openEditModal(bank: Bank): void {
    this.selectedBank = { ...bank }; // Make a copy
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedBank = null;
  }

  saveEditedBank(updatedBank: Bank): void {
    this.bankService.updateBank(updatedBank.id, updatedBank).subscribe({
      next: () => {
        const index = this.banks.findIndex(b => b.id === updatedBank.id);
        if (index !== -1) {
          this.banks[index] = updatedBank;
        }
        this.closeModal();
        console.log('Bank updated successfully.');
      },
      error: err => console.error('Error updating bank:', err)
    });
  }

  deleteBank(bank: Bank): void {
    const confirmDelete = confirm(`Are you sure you want to delete bank "${bank.name}"?`);
    if (confirmDelete) {
      this.bankService.deleteBank(bank.id).subscribe({
        next: () => {
          this.banks = this.banks.filter(b => b.id !== bank.id);
          console.log(`Bank ${bank.name} deleted.`);
        },
        error: err => console.error('Delete error:', err)
      });
    }
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
