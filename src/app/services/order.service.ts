import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

  getAllOrders() {
    return this.httpClient.get(`${baseUrl}/order/getAllOrders`);
  }
  getOrderById(id: number) {
    return this.httpClient.get(`${baseUrl}/order/${id}`);
  }
  addOrder(order: any) {
    return this.httpClient.post(`${baseUrl}/order`, order);
  }
  updateOrder(id: number, order: any) {
    return this.httpClient.put(`${baseUrl}/order/${id}`, order);
  }
  deleteOrder(id: number) {
    return this.httpClient.delete(`${baseUrl}/order/${id}`);
  }
  getOrdersByTraderId(traderId: string) {
    return this.httpClient.get(`${baseUrl}/Order/getByTrader/${traderId}`);
  }
  getOrdersByCourierId(courierId: string) {
    return this.httpClient.get(`${baseUrl}/Order/getByCourier/${courierId}`);
  }
  getOrdersByStatus(status: string) {
    return this.httpClient.get(`${baseUrl}/order/status/${status}`);
  }
  getOrdersByDateRange(startDate: string, endDate: string) {
    return this.httpClient.get(`${baseUrl}/orders/date-range`, {
      params: { startDate, endDate }
    });
  }
  getOrdersByBranchId(branchId: number) {
    return this.httpClient.get(`${baseUrl}/order/getByBranchId/${branchId}`);
  }
  getOrdersByGovId(govId: number) {
    return this.httpClient.get(`${baseUrl}/order/getByGovId/${govId}`);
  }
  getOrdersByCityId(cityId: number) {
    return this.httpClient.get(`${baseUrl}/order/getByCityId/${cityId}`);
  }
}
