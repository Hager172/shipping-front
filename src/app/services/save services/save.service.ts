import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Save } from '../../models/Saves/save.model';

@Injectable({
  providedIn: 'root'
})
export class SaveServiceService {

  private baseUrl = 'https://localhost:7206/api/Saves';
  constructor( private http: HttpClient ) { }
  // Get all saves
    getAllSaves(): Observable<Save[]> {
      return this.http.get<Save[]>(this.baseUrl);
    }
  
  // Get save by ID
  getSaveById(id: number) : Observable<Save>{
    return this.http.get<Save>(`${this.baseUrl}/${id}`);
  }

  // Add a new save
  addSave(save: Save): Observable<Save> {
    return this.http.post<Save>(this.baseUrl, save);
  }
  // Update a save
  updateSave(id: number, save: Save): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, save);
  }

    // Delete a save
    deleteSave(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    // Activate save
    activateSave(id: number): Observable<string> {
      return this.http.post(`${this.baseUrl}/${id}/active`, null, { responseType: 'text' });
    }

    // Deactivate save
    disactivateSave (id: number): Observable<string> {
      return this.http.post(`${this.baseUrl}/${id}/disactive`, null, { responseType: 'text' });
    }

    // Search saves by name
    searchSaves(name: string): Observable<Save[]> {
      return this.http.get<Save[]>(`${this.baseUrl}/search?name=${name}`);
    }
}
