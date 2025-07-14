import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(private http : HttpClient) { }

  getOrderItems(orderId: number):Observable<any> {
    return this.http.get(baseUrl+ `OrderItem/byOrderId/${orderId}`);
  }
  addOrderItem(orderItem: any): Observable<any> {
    return this.http.post(baseUrl +'OrderItem', orderItem);
  }
  updateOrderItem(orderItem: any , id:number) {
    return this.http.put(`${baseUrl}/OrderItem/${orderItem.id}`, orderItem);
  }
  getOrderItemById(id: number) {
    return this.http.get(`${baseUrl}/OrderItem/${id}`);
  }
  getAllOrderItems(): Observable<any> {
    return this.http.get(`${baseUrl}/OrderItem`);
  }
  bulkInsertItems(items: any[]) {
  return this.http.post(`${baseUrl}/OrderItem/bulkItems`, items);
}

}
