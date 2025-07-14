import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

  getAllOrders():Observable<any> {
    return this.httpClient.get(baseUrl+'Order/getAllOrders');
  }
  getOrderById(id: number) {
    return this.httpClient.get(baseUrl+`Order/${id}`);
  }
  addOrder(order: any): Observable<any> {
    return this.httpClient.post(baseUrl+`Order`, order);
  }
  updateOrder(id: number, order: any) {
    return this.httpClient.put(baseUrl+`Order/${id}`, order);
  }
  deleteOrder(id: number) {
    return this.httpClient.delete(baseUrl+`Order/${id}`);
  }
  getOrdersByTraderId(traderId: string) {
    return this.httpClient.get(baseUrl+`Order/getByTrader/${traderId}`);
  }
  getOrdersByCourierId(courierId: string) {
    return this.httpClient.get(baseUrl+`Order/getByCourier/${courierId}`);
  }
  getOrdersByStatus(status: number) {
    return this.httpClient.get(baseUrl+`Order/getByStatus/${status}`);
  }
  getOrdersByDateRange(fromDate: string, toDate: string) {
  return this.httpClient.get(baseUrl + `Order/ByDate`, {
    params: { fromDate, toDate }
  });
}
  getOrdersByBranchId(branchId: number) {
    return this.httpClient.get(baseUrl+`Order/getByBranchId/${branchId}`);
  }
  getOrdersByGovId(govId: number) {
    return this.httpClient.get(baseUrl+`Order/getByGovId/${govId}`);
  }
  getOrdersByCityId(cityId: number) {
    return this.httpClient.get(baseUrl+`Order/getByCityId/${cityId}`);
  }
}
