import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class WeightService {

  constructor(private http : HttpClient) { }
  getWeightById(id: string) {
    return this.http.get(baseUrl + `Weight/${id}`);
  }
  getWeights() {
    return this.http.get(baseUrl + 'Weight');
  }
  createWeight(weight: any) {
    return this.http.post(baseUrl + 'Weight', weight);
  }
  updateWeight(id: string, weight: any) {
    return this.http.put(baseUrl + `Weight/${id}`, weight);
  }
  deleteWeight(id: string) {
    return this.http.delete(baseUrl + `Weight/${id}`);
  }

}
