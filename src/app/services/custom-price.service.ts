import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class CustomPriceService {

  constructor(private http:HttpClient) { }
  getCustomPriceById(id: string) {
    return this.http.get(baseUrl + `CustomPrice/${id}`);
  }
  getCustomPrices(): Observable <any[]>  {
    return this.http.get<any[]> (baseUrl + 'CustomPrice');
  }
  createCustomPrice(customPrice: any) {
    return this.http.post(baseUrl + 'CustomPrice', customPrice);
  }
  updateCustomPrice(id: string, customPrice: any) {
    return this.http.put(baseUrl + `CustomPrice/${id}`, customPrice);
  }
  deleteCustomPrice(id: string) {
    return this.http.delete(baseUrl + `CustomPrice/${id}`);
  }
  getCustomPriceByTraderId(traderId: string) {
    return this.http.get(baseUrl + `CustomPrice/GetCustomPriceByTraderId/${traderId}`);
  }
  createBulkCustomPrices(prices: any[]) {
  return this.http.post(baseUrl + 'CustomPrice/Bulk', prices);
}


}
