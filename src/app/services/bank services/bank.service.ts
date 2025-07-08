import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../../models/Banks/bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private baseUrl = 'https://localhost:7206/api/Banks'; // ← غيّري ده حسب رابط API عندك

  constructor(private http: HttpClient) {}

  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.baseUrl);
  }
}
