import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterEmployeeDTO } from '../models/employee/employeedto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  regesteremployee (employeedto:RegisterEmployeeDTO):Observable<any>{
    return this.http.post(`${environment.baseUrl}Auth/register-employee`,employeedto)

  }
}
