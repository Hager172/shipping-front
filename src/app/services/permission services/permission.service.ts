import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActionTypeDto } from '../../models/permission/action-type-dto';
import { PermissionDto } from '../../models/permission/permission-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private baseUrl = 'https://localhost:7206/api/Permission';
  constructor(private http: HttpClient) { }

 deletePermission(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove/${id}`);
  }

  updatePermission(id: number, updatedPermission: PermissionDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit?id=${id}`, updatedPermission);
  }

  getActionTypes() {
    return this.http.get<ActionTypeDto[]>(`${this.baseUrl}/actions`);
  }

  getPermissions() {
    return this.http.get<PermissionDto[]>(`${this.baseUrl}/permissions`);
  }

  createPermission(dto: PermissionDto) {
    return this.http.post(`${this.baseUrl}/create-permission`, dto);
  }

  getActionsByPermissionId(permissionId: number) {
    return this.http.get<any>(`${this.baseUrl}/${permissionId}/actions`);
  }

  assignPermissions(assignment: any) {
    return this.http.post(`${this.baseUrl}/create-permission-action`, assignment);
  }
  removePermissionAction(dto: { permissionId: number; actionTypeIds: number[] }): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/remove-permission-actions`, {
      body: dto,
      responseType: 'text' 
    });
  }
}
