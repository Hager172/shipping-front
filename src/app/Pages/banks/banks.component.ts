import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank services/bank.service';
import { Bank } from '../../models/Banks/bank.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  imports: [CommonModule , RouterModule]
})
export class BanksComponent implements OnInit {
  banks: Bank[] = [];

  constructor(private bankService: BankService) {}

  ngOnInit(): void {
    this.bankService.getAllBanks().subscribe({
      next: (data) => {
        this.banks = data;
      },
      error: (err) => {
        console.error('Error loading banks:', err);
      }
    });
  }
}
