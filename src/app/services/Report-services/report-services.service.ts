import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ReportServicesService {

  constructor(private _httpClient: HttpClient) {}

  getAllReportServicesPayment(filters: any) {
    let params = new HttpParams();

    // Ensure pagination defaults
    filters.PageNumber ??= 1;
    filters.PageSize ??= 10;

    Object.keys(filters).forEach((key) => {
      let value = filters[key];

      // Format date fields to yyyy-MM-dd
      if (value && key.toLowerCase().includes('date')) {
        const parsedDate = new Date(value);
        if (!isNaN(parsedDate.getTime())) {
          value = parsedDate.toISOString().split('T')[0]; // yyyy-MM-dd
        }
      }

      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value);
      }
    });

    return this._httpClient.get(`${baseUrl}Reports/report`, { params });
  }

  getTraderNames(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${baseUrl}Trader`);
  }

  getCourierNames(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${baseUrl}Courier/getcouriers`);
  }

  getBranchNames(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${baseUrl}Branch/names`);
  }

  getCityNames(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${baseUrl}Cities`);
  }

  getGovernorateNames(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${baseUrl}Governrates/names`);
  }

  getPaymentTypes(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${baseUrl}PaymentTypes`);
  }

  getOrderStatuses(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${baseUrl}OrderStatuses`);
  }
}
