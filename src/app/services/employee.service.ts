import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterEmployeeDTO } from '../models/employee/employeedto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  regesteremployee (employeedto:RegisterEmployeeDTO):Observable<any>{
    return this.http.post(`https://localhost:7206/api/Auth/register-employee`,employeedto)

  }
}
