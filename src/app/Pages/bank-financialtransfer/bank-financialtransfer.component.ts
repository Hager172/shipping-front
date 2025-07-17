import { Component, OnInit } from '@angular/core';
import { BankFinancialTransferService } from '../../services/Financial-transferServices/Bank/bankFinancial.service';
import { BankTransactionReport } from '../../models/Financial-transfer/BankFinancialtransfer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModalComponent } from '../../components/shared-modal/shared-modal.component';
import { SaveFinancialTransfer } from '../../services/Financial-transferServices/SaveFinancialtransfer';
import { ButtonStyleComponent } from "../../components/button-style/button-style.component";
import { CustomTableWithoutActionComponent } from "../../components/custom-table-without-action/custom-table-without-action.component";
import { BankService } from '../../services/bank services/bank.service';
import { SaveServiceService } from '../../services/save services/save.service';

@Component({
  selector: 'app-bank-financialtransfer',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModalComponent, ButtonStyleComponent, CustomTableWithoutActionComponent],
  templateUrl: './bank-financialtransfer.component.html',
  styleUrls: ['./bank-financialtransfer.component.css']
})
export class BankFinancialtransferComponent implements OnInit {

  reports: BankTransactionReport[] = [];
  banks: { id: number, name: string }[] = [];
  safes: { id: number, name: string }[] = [];

  selectedBankName: string = '';
  startDate: string = '';
  endDate: string = '';

  columns = [
    { header: 'Bank', accessor: 'bankName' },
    { header: 'Credit', accessor: 'credit' },
    { header: 'Debit', accessor: 'debit' },
    { header: 'User', accessor: 'adminName' },
    { header: 'Note', accessor: 'note' },
    { header: 'Date', accessor: 'date' }
  ];

  selectedBankBalance: number = 0;
  showDepositWithdrawModal = false;
  showBankToBankModal = false;
  showBankToSafeModal = false;
  selectedBankId: number = 0;
  withdrawAmount: number | null = null;
  depositAmount: number | null = null;
  note: string = '';
  bankToBank: SaveFinancialTransfer = {
    sourceBankId: undefined,
    destinationBankId: undefined,
    amount: 0,
    note: ''
  };

  bankToSafe: SaveFinancialTransfer = {
    sourceBankId: undefined,
    destinationSafeId: undefined,
    amount: 0,
    note: ''
  };

  constructor(
    private bankService: BankFinancialTransferService,
    private bankServices: BankService,
    private safeService: SaveServiceService
  ) { }

  ngOnInit(): void {
    this.loadBanks();
    this.loadSafes();
    this.fetchReports();
  }

  loadBanks(): void {
    this.bankService.getAllBanks().subscribe({
      next: data => this.banks = data,
      error: err => console.error('Error loading banks', err)
    });
  }

  loadSafes(): void {
    this.safeService.getAllSaves().subscribe({
      next: data => this.safes = data,
      error: err => console.error('Error loading safes', err)
    });
  }

  fetchReports(): void {
    this.bankService.getReports(this.selectedBankName, this.startDate, this.endDate).subscribe({
      next: (data) => this.reports = data,
      error: (err) => console.error('Error fetching reports:', err)
    });
  }

  onSearch(): void {
    this.fetchReports();
    }

  openDepositWithdrawModal(): void {
    this.showDepositWithdrawModal = true;
  }

  openBankToBankModal(): void {
    this.showBankToBankModal = true;
  }

  openBankToSafeModal(): void {
    this.showBankToSafeModal = true;
  }

  submitDepositWithdraw(): void {
    if (!this.selectedBankId) {
      alert('Please select a bank.');
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

    if (this.withdrawAmount && this.withdrawAmount > this.selectedBankBalance) {
      alert("Withdrawal amount exceeds the current bank balance!");
      return;
    }

    const dto: SaveFinancialTransfer = {
      amount,
      sourceBankId: isWithdraw ? this.selectedBankId : undefined,
      destinationBankId: isDeposit ? this.selectedBankId : undefined,
      note: this.note
    };

    this.bankService.addTransfer(dto).subscribe({
      next: () => {
        this.closeModal();
        alert('Transfer successful');
      },
      error: err => console.error('Transfer error:', err)
    });
  }

  submitBankToBank(): void {
    if (!this.bankToBank.sourceBankId || !this.bankToBank.destinationBankId) {
      alert("Please select both source and destination banks.");
      return;
    }

    if (this.bankToBank.sourceBankId === this.bankToBank.destinationBankId) {
      alert("Source and destination banks must be different.");
      return;
    }

    if (!this.bankToBank.amount || this.bankToBank.amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    this.bankServices.getBankById(this.bankToBank.sourceBankId).subscribe({
      next: (bank) => {
        if (this.bankToBank.amount! > bank.balance) {
          alert("Insufficient balance in source bank.");
          return;
        }

        this.bankService.addTransfer(this.bankToBank).subscribe({
          next: () => {
            this.closeModal();
            alert("Transfer successful");
          },
          error: err => console.error('Transfer error:', err)
        });
      },
      error: err => {
        console.error('Error fetching bank balance:', err);
        alert("Failed to verify source bank balance.");
      }
    });
  }

  submitBankToSafe(): void {
    if (!this.bankToSafe.sourceBankId || !this.bankToSafe.destinationSafeId) {
      alert("Please select both bank and safe.");
      return;
    }

    if (!this.bankToSafe.amount || this.bankToSafe.amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    this.bankServices.getBankById(this.bankToSafe.sourceBankId).subscribe({
      next: (bank) => {
        if (this.bankToSafe.amount! > bank.balance) {
          alert("Insufficient balance in bank.");
          return;
        }

        this.bankService.addTransfer(this.bankToSafe).subscribe({
          next: () => {
            this.closeModal();
            alert("Transfer successful");
          },
          error: err => console.error('Transfer error:', err)
        });
      },
      error: err => {
        console.error('Error fetching bank balance:', err);
        alert("Failed to verify bank balance.");
      }
    });
  }

  onBankChange(): void {
    this.bankServices.getBankById(this.selectedBankId).subscribe({
      next: (data) => {
        this.selectedBankBalance = data.balance;
        if (this.withdrawAmount && this.withdrawAmount > this.selectedBankBalance) {
          alert('Withdraw amount exceeds current balance!');
        }
      },
      error: (err) => {
        console.error('Error fetching bank details:', err);
        this.selectedBankBalance = 0;
      }
    });
  }

  closeModal(): void {
    this.showBankToBankModal = false;
    this.showBankToSafeModal = false;
    this.showDepositWithdrawModal = false;
    this.resetForm();
    this.fetchReports();
  }

  resetForm(): void {
    this.selectedBankId = 0;
    this.withdrawAmount = null;
    this.depositAmount = null;
    this.note = '';
    this.bankToBank = { sourceBankId: undefined, destinationBankId: undefined, amount: 0, note: '' };
    this.bankToSafe = { sourceBankId: undefined, destinationSafeId: undefined, amount: 0, note: '' };
  }
}
