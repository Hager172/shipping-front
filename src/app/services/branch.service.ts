import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch, BranchDTO } from '../models/branch/branch';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
private baseUrl = `${environment.baseUrl}Branch`;
  constructor(private http:HttpClient) { }
   getAllBranches(): Observable<BranchDTO[]> {
    return this.http.get<BranchDTO[]>(this.baseUrl);
  }
selectedBranch: BranchDTO | null = null;

  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.baseUrl}/${id}`);
  }

  getnames(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/names`)
  }
  getBranchByName(name: string): Observable<Branch> {
    return this.http.get<Branch>(`${this.baseUrl}/getbranchbyname/${name}`);
  }

  addBranch(branch: Branch): Observable<any> {
    return this.http.post(this.baseUrl, branch);
  }

  updateBranch(branch: BranchDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}`, branch);
  }

  deleteBranch(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
