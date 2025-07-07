import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Governorate, GovernorateDTO } from '../models/governrate/governrate';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GovernrateService {
  private baseUrl = 'https://localhost:7206/api/Governrates';

  constructor(private http:HttpClient) { }
  getAll(): Observable<GovernorateDTO[]> {
    return this.http.get<GovernorateDTO[]>(this.baseUrl);
  }

  getById(id: number): Observable<GovernorateDTO> {
    return this.http.get<GovernorateDTO>(`${this.baseUrl}/${id}`);
  }

  getByName(name: string): Observable<GovernorateDTO> {
    return this.http.get<GovernorateDTO>(`${this.baseUrl}/getgovernratebyname/${name}`);
  }

  add(governorate: Governorate): Observable<any> {
    return this.http.post(this.baseUrl, governorate);
  }

  update(governorate: GovernorateDTO): Observable<any> {
    return this.http.put(this.baseUrl, governorate);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
