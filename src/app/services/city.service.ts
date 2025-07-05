import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/order/city/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
 private baseurl = 'https://localhost:7206/api/Cities';
  constructor(private http:HttpClient) {}

    getallcites(): Observable<City[]>{
      return this.http.get<City[]>(this.baseurl);
    }
}

