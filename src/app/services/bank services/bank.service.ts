import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../../models/Banks/bank.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BankService {
  
  private baseUrl = `${environment.baseUrl}Banks`; 
  constructor(private http: HttpClient) {}

  // Get all banks
  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.baseUrl);
  }

  // Get bank by ID
  getBankById(id: number): Observable<Bank> {
    return this.http.get<Bank>(`${this.baseUrl}/${id}`);
  }

  // Add a new bank
  addBank(bank: Bank): Observable<Bank> {
    return this.http.post<Bank>(this.baseUrl, bank);
  }

  // Update a bank
  updateBank(id: number, bank: Bank): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, bank);
  }

  // Delete a bank
  deleteBank(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Activate bank
  activateBank(id: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/${id}/active`, null, { responseType: 'text' });
  }

  // Deactivate bank
  disactivateBank(id: number): Observable<string> {
    return this.http.post(`${this.baseUrl}/${id}/disactive`, null, { responseType: 'text' });
  }

  // Search banks by name
  searchBanks(name: string): Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.baseUrl}/search?name=${name}`);
  }
}
