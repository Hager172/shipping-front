import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeTransactionReport } from '../../../models/Financial-transfer/SaveFinancialtransfer';
import { Observable } from 'rxjs';
import { SaveFinancialTransfer } from '../SaveFinancialtransfer';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
 private baseUrl = `${environment.baseUrl}FinancialTransfer/safes`;

  constructor(private http: HttpClient) { }

  getReports(safeName?: string, startDate?: string, endDate?: string): Observable<SafeTransactionReport[]> {
    let params = new HttpParams();
    if (safeName) params = params.set('safeName', safeName);
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<SafeTransactionReport[]>(this.baseUrl, { params });
  }
  getAllSafes(): Observable<{ id: number, name: string }[]> {
    return this.http.get<{ id: number, name: string }[]>(`${environment.baseUrl}Saves`);
  }
  // services/Financial-transferServices/Bank/bankFinancial.service.ts
  addTransfer(data: SaveFinancialTransfer): Observable<any> {
    return this.http.post(`${environment.baseUrl}FinancialTransfer'`, data);
  }

}
