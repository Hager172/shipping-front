import { Component } from '@angular/core';
import { TraderDashboardStats } from '../../models/DashBoard/TraderDashboardStats';
import { TraderdashboardService } from '../../services/Dashboard Services/traderdashboard.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-traderdashboard',
  imports: [CommonModule],
  templateUrl: './traderdashboard.component.html',
  styleUrl: './traderdashboard.component.css'
})
export class TraderdashboardComponent {
 stats: TraderDashboardStats | null = null;

  constructor(private traderdashboardService: TraderdashboardService) { }

  ngOnInit(): void {
    this.traderdashboardService.getDashboardStats().subscribe(data => {
      this.stats = data;
    });
  }
}
