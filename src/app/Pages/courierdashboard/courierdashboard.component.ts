import { Component } from '@angular/core';
import { CourierdashboardService } from '../../services/Dashboard Services/courierdashboard.service';
import { CourierDashboardStats } from '../../models/DashBoard/CourierDashboardStats';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courierdashboard',
  imports: [CommonModule],
  templateUrl: './courierdashboard.component.html',
  styleUrl: './courierdashboard.component.css'
})
export class CourierdashboardComponent {
 stats: CourierDashboardStats | null = null;

  constructor(private courierdashboardService: CourierdashboardService) { }

  ngOnInit(): void {
    this.courierdashboardService.getDashboardStats().subscribe(data => {
      this.stats = data;
    });
  }
}
