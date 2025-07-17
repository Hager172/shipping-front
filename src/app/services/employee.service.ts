import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterEmployeeDTO,EmployeeWithPermissions, PermissionDTO, CheckPermissionDto  } from '../models/employee/employeedto';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  regesteremployee(employeedto: RegisterEmployeeDTO): Observable<any> {
    const token = this.authService.gettoken();

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.post(`${baseUrl}Auth/register-employee`, employeedto, { headers });
  }
   getAllEmployees(): Observable<EmployeeWithPermissions[]> {
    return this.http.get<EmployeeWithPermissions[]>(`${baseUrl}Auth`);
  }

  getEmployeeById(userId: string): Observable<EmployeeWithPermissions> {
    return this.http.get<EmployeeWithPermissions>(`${baseUrl}Auth/employee/${userId}/permissions`);
  }

  toggleEmployeeStatus(userId: string, isActive: boolean): Observable<any> {
  return this.http.put(`${baseUrl}Auth/toggle-status/${userId}?isActive=${isActive}`, {});
  }

  updateEmployee(data: any): Observable<any> {
  return this.http.put(`${baseUrl}Auth/update-employee`, data);
}

 getAllPermissions(): Observable<PermissionDTO[]> {
    return this.http.get<any[]>(`${baseUrl}Permission/permissions`);
  }

  getAllPermissionActions(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}Permission/actions`);
  }

  checkPermission(dto: CheckPermissionDto): Observable<{ hasPermission: boolean }> {
  return this.http.post<{ hasPermission: boolean }>(`${baseUrl}Permission/check`, dto);
}
updateEmployeePermissions(dto: { userId: string, permissionIds: number[] }): Observable<any> {
  return this.http.put(`${baseUrl}Auth/update-employee-permissions`, dto);
}
}
