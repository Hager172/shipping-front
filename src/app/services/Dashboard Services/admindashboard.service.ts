import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminDashboardStats } from '../../models/DashBoard/AdminDashboardStats';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private baseUrl = 'https://localhost:7206/api/AdminDashboard'; 
  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<AdminDashboardStats> {
    return this.http.get<AdminDashboardStats>(`${this.baseUrl}/stats`);
  }
}
