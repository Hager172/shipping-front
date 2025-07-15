import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../models/order/login.dto';
import { UserProfileDTO } from '../models/order/user-profile.dto';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../models/order/register.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL= `${environment.baseUrl}Auth`;
  constructor(private http: HttpClient) { }
  login(model: LoginDTO): Observable<UserProfileDTO> {
    return this.http.post<UserProfileDTO>(`${this.apiURL}/login`, model);
  }
  regester(model: RegisterDTO): Observable<UserProfileDTO> {
    return this.http.post<UserProfileDTO>(`${this.apiURL}/register`, model);
  }
  savetoken(token: string): void {
    localStorage.setItem('token', token);
  }

  gettoken(): string | null {
    return localStorage.getItem('token');
  }

  // getroles(): Observable<string[]> {
  //   return this.http.get<string[]>(`${this.apiURL}/rols`);
  // }
  isLoggedIn(): boolean {
    return !!this.gettoken();
  }
  logout(): Observable<any> {
  return this.http.post(`${this.apiURL}/logout`, {});
}
  saveUserRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }
getUserIdFromToken(): string | null {
  const token = this.gettoken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.nameid || payload.sub || payload.id || payload.UserId || null;
  } catch (error) {
    return null;
  }
}

}
