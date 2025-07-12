import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class WeightService {

  constructor(private http : HttpClient) { }
  getWeightById(id: number) {
    return this.http.get(baseUrl + `Weight/${id}`);
  }
  getWeights(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + 'Weight');
  }
  createWeight(weight: any) {
    return this.http.post(baseUrl + 'Weight', weight);
  }
  updateWeight(id: number, weight: any) {
    return this.http.put(baseUrl + `Weight/${id}`, weight);
  }
  deleteWeight(id: number) {
    return this.http.delete(baseUrl + `Weight/${id}`);
  }

}
