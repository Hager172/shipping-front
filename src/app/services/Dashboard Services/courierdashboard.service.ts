import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourierDashboardStats } from '../../models/DashBoard/CourierDashboardStats';

@Injectable({
  providedIn: 'root'
})
export class CourierdashboardService {
 private baseUrl = 'https://localhost:7206/api/RepresentativeDashboard'; 
  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<CourierDashboardStats> {
    return this.http.get<CourierDashboardStats>(`${this.baseUrl}/stats`);
  }
}
