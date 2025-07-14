import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TraderDashboardStats } from '../../models/DashBoard/TraderDashboardStats';

@Injectable({
  providedIn: 'root'
})
export class TraderdashboardService {
 private baseUrl = 'https://localhost:7206/api/SellerDashboard'; 
  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<TraderDashboardStats> {
    return this.http.get<TraderDashboardStats>(`${this.baseUrl}/stats`);
  }
}
