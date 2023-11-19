import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Iproduct[];
  constructor(private http: HttpClient) {
    this.products = [];
  }
  getProductsData(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>('assets/db/products.json');
  }

  findProductById(order: any): any {
    this.getProductsData().subscribe((data: any) => {
      this.products = data;
    });
    return this.products.find((products) => products.ProductId === order.ProductId);
  }
}
