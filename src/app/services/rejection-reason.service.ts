import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class RejectionReasonService {

  constructor(private http: HttpClient) { }

  getAllRejectionReasons() {
    return this.http.get<any>(baseUrl + 'RejectionReason');
  }
  getRejectionReasonById(id: number) {
    return this.http.get<any>(baseUrl + `RejectionReason/${id}`);
  }
  addRejectionReason(data: any) {
    return this.http.post<any>(baseUrl + 'RejectionReason', data);
  }
  updateRejectionReason(id: number, data: any) {
    return this.http.put<any>(baseUrl + `RejectionReason/${id}`, data);
  }
  deleteRejectionReason(id: number) {
    return this.http.delete<any>(baseUrl + `RejectionReason/${id}`);
  }
}
