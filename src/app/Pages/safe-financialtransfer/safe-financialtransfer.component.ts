import { Component, OnInit } from '@angular/core';
import { SaveServiceService } from '../../services/save services/save.service';
import { BankService } from '../../services/bank services/bank.service';
import { SaveFinancialTransfer } from '../../services/Financial-transferServices/SaveFinancialtransfer';
import { SafeTransactionReport } from '../../models/Financial-transfer/SaveFinancialtransfer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModalComponent } from '../../components/shared-modal/shared-modal.component';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';
import { CustomTableWithoutActionComponent } from '../../components/custom-table-without-action/custom-table-without-action.component';
import { SaveService } from '../../services/Financial-transferServices/Save/saveFinancial.service';

@Component({
  selector: 'app-safe-financialtransfer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModalComponent,
    ButtonStyleComponent,
    CustomTableWithoutActionComponent
  ],
  templateUrl: './safe-financialtransfer.component.html',
  styleUrls: ['./safe-financialtransfer.component.css']
})
export class SafeFinancialtransferComponent implements OnInit {

  reports: SafeTransactionReport[] = [];
  safes: { id: number, name: string }[] = [];
  banks: { id: number, name: string }[] = [];

  selectedSafeName: string = '';
  startDate: string = '';
  endDate: string = '';
  selectedSafeBalance: number = 0;

  columns = [
    { header: 'Safe', accessor: 'safeName' },
    { header: 'Credit', accessor: 'credit' },
    { header: 'Debit', accessor: 'debit' },
    { header: 'User', accessor: 'adminName' },
    { header: 'Note', accessor: 'note' },
    { header: 'Date', accessor: 'date' }
  ];

  // Modal state
  showDepositWithdrawModal = false;
  showSafeToBankModal = false;
  showSafeToSafeModal = false;


  // Deposit/Withdraw form
  selectedSafeId: number = 0;
  withdrawAmount: number | null = null;
  depositAmount: number | null = null;
  note: string = '';

  // Transfer DTOs
  safeToBank: SaveFinancialTransfer = {
    sourceSafeId: undefined,
    destinationBankId: undefined,
    amount: 0,
    note: ''
  };
  safeToSafe: SaveFinancialTransfer = {
    sourceSafeId: undefined,
    destinationSafeId: undefined,
    amount: 0,
    note: ''
  };

  constructor(
    private safeService: SaveServiceService,
    private safeServices: SaveService,
    private bankService: BankService
  ) { }

  ngOnInit(): void {
    this.loadSafes();
    this.loadBanks();
    this.fetchReports();
  }

  loadSafes(): void {
    this.safeService.getAllSaves().subscribe({
      next: data => this.safes = data,
      error: err => console.error('Error loading safes', err)
    });
  }

  loadBanks(): void {
    this.bankService.getAllBanks().subscribe({
      next: data => this.banks = data,
      error: err => console.error('Error loading banks', err)
    });
  }

  fetchReports(): void {
    this.safeServices.getReports(this.selectedSafeName, this.startDate, this.endDate).subscribe({
      next: data => this.reports = data,
      error: err => console.error('Error fetching reports', err)
    });
  }

  onSearch(): void {
    this.fetchReports();
  }

  openDepositWithdrawModal(): void {
    this.showDepositWithdrawModal = true;
  }

  openSafeToBankModal(): void {
    this.showSafeToBankModal = true;
  }

  onSafeChange(): void {
    this.safeService.getSaveById(this.selectedSafeId).subscribe({
      next: data => {
        this.selectedSafeBalance = data.balance;
        if (this.withdrawAmount && this.withdrawAmount > this.selectedSafeBalance) {
          alert('Withdraw amount exceeds safe balance!');
        }
      },
      error: err => {
        console.error('Error fetching safe details:', err);
        this.selectedSafeBalance = 0;
      }
    });
  }

  submitDepositWithdraw(): void {
    if (!this.selectedSafeId) {
      alert('Please select a safe.');
      return;
    }

    const isWithdraw = !!this.withdrawAmount;
    const isDeposit = !!this.depositAmount;

    if (!isWithdraw && !isDeposit) {
      alert('Please enter an amount for either Withdraw or Deposit.');
      return;
    }
    if (isWithdraw && isDeposit) {
      alert('Please enter an amount for either Withdraw or Deposit.');
      return;
    }

    const amount = isWithdraw ? this.withdrawAmount! : this.depositAmount!;
    if (amount <= 0) {
      alert('Amount must be greater than zero.');
      return;
    }

    if (this.withdrawAmount && this.withdrawAmount > this.selectedSafeBalance) {
      alert("Withdrawal amount exceeds the current safe balance!");
      return;
    }

    const dto: SaveFinancialTransfer = {
      amount,
      sourceSafeId: isWithdraw ? this.selectedSafeId : undefined,
      destinationSafeId: isDeposit ? this.selectedSafeId : undefined,
      note: this.note
    };

    this.safeServices.addTransfer(dto).subscribe({
      next: () => {
        this.closeModal();
        alert('Transaction successful');
      },
      error: err => console.error('Transfer error:', err)
    });
  }

  submitSafeToBank(): void {
    if (!this.safeToBank.sourceSafeId || !this.safeToBank.destinationBankId) {
      alert("Please select both safe and bank.");
      return;
    }

    if (!this.safeToBank.amount || this.safeToBank.amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    this.safeService.getSaveById(this.safeToBank.sourceSafeId).subscribe({
      next: (safe) => {
        if (this.safeToBank.amount! > safe.balance) {
          alert("Insufficient balance in safe.");
          return;
        }

        this.safeServices.addTransfer(this.safeToBank).subscribe({
          next: () => {
            this.closeModal();
            alert("Transfer successful");
          },
          error: err => console.error('Transfer error:', err)
        });
      },
      error: err => {
        console.error('Error fetching safe balance:', err);
        alert("Failed to verify safe balance.");
      }
    });
  }

  openSafeToSafeModal(): void {
    this.showSafeToSafeModal = true;
  }
  submitSafeToSafe(): void {
    if (!this.safeToSafe.sourceSafeId || !this.safeToSafe.destinationSafeId) {
      alert("Please select both source and destination safes.");
      return;
    }

    if (this.safeToSafe.sourceSafeId === this.safeToSafe.destinationSafeId) {
      alert("Source and destination safes must be different.");
      return;
    }

    if (!this.safeToSafe.amount || this.safeToSafe.amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    this.safeService.getSaveById(this.safeToSafe.sourceSafeId).subscribe({
      next: (safe) => {
        if (this.safeToSafe.amount! > safe.balance) {
          alert("Insufficient balance in source safe.");
          return;
        }

        this.safeServices.addTransfer(this.safeToSafe).subscribe({
          next: () => {
            this.closeModal();
            alert("Transfer successful");
          },
          error: err => console.error('Transfer error:', err)
        });
      },
      error: err => {
        console.error('Error fetching safe balance:', err);
        alert("Failed to verify safe balance.");
      }
    });
  }

  closeModal(): void {
    this.showDepositWithdrawModal = false;
    this.showSafeToBankModal = false;
    this.showSafeToSafeModal = false;
    this.resetForm();
    this.fetchReports();
  }

  resetForm(): void {
    this.selectedSafeId = 0;
    this.withdrawAmount = null;
    this.depositAmount = null;
    this.note = '';
    this.safeToBank = { sourceSafeId: undefined, destinationBankId: undefined, amount: 0, note: '' };
    this.safeToSafe = { sourceSafeId: undefined, destinationSafeId: undefined, amount: 0, note: '' };
  }

}
