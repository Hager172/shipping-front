import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Governorate, GovernorateDTO } from '../models/governrate/governrate';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GovernrateService {
  private baseUrl = `${environment.baseUrl}Governrates`;

  constructor(private http:HttpClient) { }
  getAll(): Observable<GovernorateDTO[]> {
    return this.http.get<GovernorateDTO[]>(this.baseUrl);
  }
selectedGovernorate: GovernorateDTO | null = null;
  getById(id: number): Observable<GovernorateDTO> {
    return this.http.get<GovernorateDTO>(`${this.baseUrl}/${id}`);
  }

  getByName(name: string): Observable<GovernorateDTO> {
    return this.http.get<GovernorateDTO>(`${this.baseUrl}/getgovernratebyname/${name}`);
  }

  add(governorate: Governorate): Observable<any> {
    return this.http.post(this.baseUrl, governorate);
  }
  getnames(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/names`)
  }
  update(governorate: GovernorateDTO): Observable<any> {
    return this.http.put(this.baseUrl, governorate);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
