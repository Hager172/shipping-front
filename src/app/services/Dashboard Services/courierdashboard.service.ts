import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourierDashboardStats } from '../../models/DashBoard/CourierDashboardStats';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourierdashboardService {
private baseUrl = `${environment.baseUrl}RepresentativeDashboard`; 
  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<CourierDashboardStats> {
    return this.http.get<CourierDashboardStats>(`${this.baseUrl}/stats`);
  }
}
