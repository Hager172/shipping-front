import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ShippingTypesService {

  constructor(private http: HttpClient) { }

  getAllShippingTypes(){
    return this.http.get<any>(baseUrl +'ShippingType'); 
  }
  getShippingTypeById(id: number): Observable<any> {
    return this.http.get<any>(baseUrl+`ShippingType/${id}`);
  }
  addShippingType(data: any): Observable<any> {
    return this.http.post<any>(baseUrl + 'ShippingType', data);
  }
  updateShippingType(id: number, data: any): Observable<any> {
    return this.http.put<any>(baseUrl+`ShippingType/${id}`, data);
  }
  deleteShippingType(id: number): Observable<any> {
    return this.http.delete<any>(baseUrl+`ShippingType/${id}`);
  }
  getShippingTypeByName(name: string): Observable<any> {
    return this.http.get<any>(baseUrl+`ShippingType/name/${name}`);
  }
}
