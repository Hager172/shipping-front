import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ExtraVillagePriceService {

  constructor(private http:HttpClient) { }
  getExtraVillagePriceById(id: number) {
    return this.http.get(baseUrl + `ExtraVillagePrice/${id}`);
  }
  getExtraVillagePrices():Observable <any[]> {
    return this.http.get<any[]>(baseUrl + 'ExtraVillagePrice');
  }
  createExtraVillagePrice(extraVillagePrice: any) {
    return this.http.post(baseUrl + 'ExtraVillagePrice', extraVillagePrice);
  }
  updateExtraVillagePrice(id: number, extraVillagePrice: any) {
    return this.http.put(baseUrl + `ExtraVillagePrice/${id}`, extraVillagePrice);
  }
  deleteExtraVillagePrice(id: number) {
    return this.http.delete(baseUrl + `ExtraVillagePrice/${id}`);
  }
}
