import { Component } from '@angular/core';
import { TraderService } from '../../services/trader.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilterPipe } from '../../shared/filter.pipe';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { ButtonStyleComponent } from '../../components/button-style/button-style.component';

@Component({
  selector: 'app-traders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterPipe,
    CustomTableComponent,
    ButtonStyleComponent
  ],
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.css']
})
export class TradersComponent {
  traders: any[] = [];
  searchTerm: string = '';

  columns = [
    { header: 'Name', accessor: 'fullName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Branch', accessor: 'branchName' },
    { header: 'store Name', accessor: 'storeName' },
    { header: 'Status', accessor: 'isActive', type: 'toggle' }
  ];

  constructor(private traderService: TraderService, private router: Router) {
    this.loadTraders();
  }

  loadTraders() {
    this.traderService.getTraders().subscribe({
      next: (data: any[]) => {
        this.traders = data.map(t => ({
          ...t,
          id: t.userId
        }));
        console.log('Traders loaded:', this.traders);
      },
      error: (err) => console.error('Error loading traders', err)
    });
  }

  navigateToAddTrader() {
    this.router.navigate(['/addTrader']);
  }

  openEditTrader(trader: any) {
    this.router.navigate(['/edit-trader', trader.id]);
  }

  deleteTrader(trader: any) {
    if (confirm(`Are you sure you want to delete ${trader.fullName}?`)) {
      this.traderService.deleteTrader(trader.id).subscribe({
        next: () => this.loadTraders(),
        error: (err) => alert("can't delete trader"),
          // console.error('Error deleting trader', err)
      });
    }
  }

  onToggleStatus(trader: any) {
    const updatedTrader = { ...trader, isActive: !trader.isActive };

    this.traderService.updateTrader(trader.id, updatedTrader).subscribe({
      next: () => this.loadTraders(),
      error: err => console.error('Error updating status', err)
    });
  }
}
