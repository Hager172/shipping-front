import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Save } from '../../models/Saves/save.model';
import { environment } from '../../../environments/environment';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SaveServiceService {

  constructor( private http: HttpClient ) { }
  // Get all saves
    getAllSaves(): Observable<Save[]> {
      return this.http.get<Save[]>(`${baseUrl}Saves`);
    }
  
  // Get save by ID
  getSaveById(id: number) : Observable<Save>{
    return this.http.get<Save>(`${baseUrl}/${id}`);
  }

  // Add a new save
  addSave(save: Save): Observable<Save> {
    return this.http.post<Save>(baseUrl, save);
  }
  // Update a save
  updateSave(id: number, save: Save): Observable<void> {
    return this.http.put<void>(`${baseUrl}${id}`, save);
  }

    // Delete a save
    deleteSave(id: number): Observable<void> {
      return this.http.delete<void>(`${baseUrl}${id}`);
    }

    // Activate save
    activateSave(id: number): Observable<string> {
      return this.http.post(`${baseUrl}${id}/active`, null, { responseType: 'text' });
    }

    // Deactivate save
    disactivateSave (id: number): Observable<string> {
      return this.http.post(`${baseUrl}${id}/disactive`, null, { responseType: 'text' });
    }

    // Search saves by name
    searchSaves(name: string): Observable<Save[]> {
      return this.http.get<Save[]>(`${baseUrl}search?name=${name}`);
    }
}
