import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.baseUrl; // Replace with your actual base URL
@Injectable({
  providedIn: 'root'
})
export class ExtraVillagePriceService {

  constructor(private http:HttpClient) { }
  getExtraVillagePriceById(id: string) {
    return this.http.get(baseUrl + `ExtraVillagePrice/${id}`);
  }
  getExtraVillagePrices() {
    return this.http.get(baseUrl + 'ExtraVillagePrice');
  }
  createExtraVillagePrice(extraVillagePrice: any) {
    return this.http.post(baseUrl + 'ExtraVillagePrice', extraVillagePrice);
  }
  updateExtraVillagePrice(id: string, extraVillagePrice: any) {
    return this.http.put(baseUrl + `ExtraVillagePrice/${id}`, extraVillagePrice);
  }
  deleteExtraVillagePrice(id: string) {
    return this.http.delete(baseUrl + `ExtraVillagePrice/${id}`);
  }
}
