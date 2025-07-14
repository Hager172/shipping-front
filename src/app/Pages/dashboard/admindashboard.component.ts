import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/Dashboard Services/admindashboard.service';
import { AdminDashboardStats } from '../../models/DashBoard/AdminDashboardStats';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
  imports : [CommonModule]
})
export class AdminDashboardComponent implements OnInit {

  stats: AdminDashboardStats | null = null;

  constructor(private admindashboardService: AdminDashboardService) { }

  ngOnInit(): void {
    this.admindashboardService.getDashboardStats().subscribe(data => {
      this.stats = data;
    });
  }
}
