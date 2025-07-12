import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class TraderService {

  constructor(private http: HttpClient) { }

  getTraderById(id: string): Observable<any> {
    return this.http.get(baseUrl+`Trader/getById/${id}`);
  }

  getTraders(): Observable<any[]>  {
    return this.http.get<any[]>(baseUrl+'Trader');
  }

  createTrader(trader: any) {
    return this.http.post<any>(baseUrl+ 'Trader/RegisterTrader', trader);
  }
  updateTrader(id: string, trader: any): Observable<any> {
    return this.http.put(baseUrl+`Trader/${id}`, trader);
  }
  deleteTrader(id: string) {
    return this.http.delete(baseUrl +`Trader/${id}`);
  }
}
