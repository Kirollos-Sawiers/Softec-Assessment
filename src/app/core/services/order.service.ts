import { Iorder } from 'src/app/core/models/iorder';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Iorder[];

  constructor(private http: HttpClient) {
    this.orders = [];
  }
  getOrdersData(): Observable<Iorder[]> {
    return this.http.get<Iorder[]>('assets/db/orders.json');
  }
  findOrderById(orderId: number): any {
    this.getOrdersData().subscribe((data: any) => {
      this.orders = data;
    });
    return this.orders.find((orders) => orders.OrderId === orderId);
  }
}
