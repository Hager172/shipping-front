import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourierDTO, DisplayCourier } from '../models/courier/courier.model';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private baseUrl = 'https://localhost:7206/api/Courier';

  constructor(private http:HttpClient) { }
    getAllCouriers(): Observable<DisplayCourier[]> {
    return this.http.get<DisplayCourier[]>(`${this.baseUrl}/getcouriers`);
  }
selectedCourier: DisplayCourier | null = null;
  addCourier(courier: CourierDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, courier);
  }

  updateCourier(courier: CourierDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}`, courier);
  }

  getCourierByName(name: string): Observable<CourierDTO> {
    return this.http.get<CourierDTO>(`${this.baseUrl}/getcourierbyname/${name}`);
  }

  getCourierById(id: string): Observable<CourierDTO> {
    return this.http.get<CourierDTO>(`${this.baseUrl}/getcourierbyid/${id}`);
  }

deleteCourier(userId: string): Observable<any> {
  return this.http.delete(`https://localhost:7206/api/Courier/delete/${userId}`);
}


getOrdersByCourierId(courierId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/courier-orders-display/${courierId}`);
}


  // الطلبات المرفوضة فقط
  getRejectedOrders(courierId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rejected-orders/${courierId}`);
  }

  // أسباب الرفض
  getRejectionReasons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/rejection-reasons`);
  }

  // تغيير حالة الأوردر
updateOrderStatus(orderId: number, newStatus: number, rejectionReasonId?: number) {
  const body = {
    orderId: orderId,
    newStatus: newStatus,
    rejectionReasonId: rejectionReasonId ?? null
  };

  return this.http.put(`${this.baseUrl}/update-order-status`, body);
}





}
