import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderStatusLog } from '../../models/Reports/order-report-dto';
import { ReportServicesService } from '../../services/Report-services/report-services.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-order-status-history',
   imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './order-status-history.component.html',
  styleUrls: ['./order-status-history.component.css']
})
export class OrderStatusHistoryComponent {
  columns = [
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Old Status', accessor: 'oldStatus' },
    { header: 'New Status', accessor: 'newStatus' },
    { header: 'Changed By', accessor: 'changedBy' },
    { header: 'Notes', accessor: 'notes' },
    { header: 'Changed At', accessor: 'changedAt' }
  ];

  statusLogs: OrderStatusLog[] = [];
  orderIdInput: number | null = null;

  constructor(private reportService: ReportServicesService) {}

 getCellValue(row: any, accessor: string): string {
  if (accessor === 'changedAt') {
    return new Date(row[accessor]).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  return row[accessor];
}

  fetchLogs(): void {
    if (!this.orderIdInput) {
      alert('Please enter a valid Order ID.');
      return;
    }

    this.reportService.getOrderStatusHistory(this.orderIdInput).subscribe({
      next: (logs) => {
        this.statusLogs = logs;
      },
      error: (err) => {
        console.error('Error fetching logs:', err);
        this.statusLogs = [];
      }
    });
  }
}