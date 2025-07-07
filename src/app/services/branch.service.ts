import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Branch, BranchDTO } from '../models/branch/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
private baseUrl = 'https://localhost:7206/api/Branch';
  constructor(private http:HttpClient) { }
   getAllBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.baseUrl);
  }

  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.baseUrl}/${id}`);
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
    return this.http.delete(`${this.baseUrl}?id=${id}`);
  }
}
