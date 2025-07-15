import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TraderDashboardStats } from '../../models/DashBoard/TraderDashboardStats';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TraderdashboardService {
 private baseUrl = `${environment.baseUrl}SellerDashboard`; 
  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<TraderDashboardStats> {
    return this.http.get<TraderDashboardStats>(`${this.baseUrl}/stats`);
  }
}
