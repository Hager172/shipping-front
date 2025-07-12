import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankTransactionReport } from '../../../models/Financial-transfer/BankFinancialtransfer';
import { SaveFinancialTransfer } from '../SaveFinancialtransfer';

@Injectable({
  providedIn: 'root'
})
export class BankFinancialTransferService {

  private baseUrl = 'https://localhost:7206/api/FinancialTransfer/banks';

  constructor(private http: HttpClient) { }

  getReports(bankName?: string, startDate?: string, endDate?: string): Observable<BankTransactionReport[]> {
    let params = new HttpParams();
    if (bankName) params = params.set('bankName', bankName);
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<BankTransactionReport[]>(this.baseUrl, { params });
  }
  getAllBanks(): Observable<{ id: number, name: string }[]> {
    return this.http.get<{ id: number, name: string }[]>('https://localhost:7206/api/Banks');
  }
  // services/Financial-transferServices/Bank/bankFinancial.service.ts
  addTransfer(data: SaveFinancialTransfer): Observable<any> {
    return this.http.post('https://localhost:7206/api/FinancialTransfer', data);
  }

}
