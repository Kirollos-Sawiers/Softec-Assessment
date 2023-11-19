import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iorder } from 'src/app/core/models/iorder';
import { Iproduct } from 'src/app/core/models/iproduct';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  orders: Iorder[];
  products: Iproduct[];
  private ordersSubscription!: Subscription;
  private productsSubscription!: Subscription;
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private router: Router
  ) {
    this.orders = [];
    this.products = [];
  }

  ngOnInit(): void {
    this.ordersSubscription = this.orderService
      .getOrdersData()
      .subscribe((data: any) => {
        this.orders = data;
      });
    this.productsSubscription = this.productService
      .getProductsData()
      .subscribe((data: any) => {
        this.products = data;
      });
  }

  //this function return product name
  getProduct(productId: number): string {
    const product = this.findProductById(productId);
    return product ? product.ProductName : 'Product Not Found';
  }

  //this function return calculate the total price of all order items
  calculateTotalPrice(order: Iorder): number {
    let totalPrice = 0;
    for (const product of order.Products) {
      const productPrice = this.getProductPrice(product.ProductId);
      totalPrice += product.Quantity * productPrice;
    }
    return totalPrice;
  }

  //this function return the price of each item in the order
  private getProductPrice(productId: number): number {
    const product = this.findProductById(productId);

    return product ? product.ProductPrice : 0;
  }

  //this function compare products by id and return matched ones
  private findProductById(productId: number): any {
    return this.products.find((product) => product.ProductId === productId);
  }

  // this function Navigate to the OrderDetails page with the orderId as a parameter
  navigateToOrderDetails(orderId: number): void {
    console.log(orderId);
    this.router.navigate(['/orders', orderId]);
  }
  // unsubscribe from observable
  ngOnDestroy(): void {
    // this.ordersSubscription.unsubscribe();
    // this.productsSubscription.unsubscribe();
  }
}
