import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City, CityDTO } from '../models/city/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {


 private baseurl = 'https://localhost:7206/api/Cities';

  constructor(private http: HttpClient) {}

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.baseurl);
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`${this.baseurl}/${id}`);
  }

  getCityByName(name: string): Observable<City> {
    return this.http.get<City>(`${this.baseurl}/getcitybyname/${name}`);
  }

  addCity(city: City): Observable<any> {
    return this.http.post(`${this.baseurl}`, city);
  }

  updateCity(city: CityDTO): Observable<any> {
    return this.http.put(`${this.baseurl}`, city);
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/${id}`);
  }

}

