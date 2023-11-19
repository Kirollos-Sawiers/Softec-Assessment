import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { Iorder } from 'src/app/core/models/iorder';
import { Iproduct } from 'src/app/core/models/iproduct';
import { Iuser } from 'src/app/core/models/iuser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  orderId: string;
  order: Iorder;
  products: Iproduct[];
  users: Iuser[];
  userID: number;
  userData: Iuser[];
  productData: Iproduct[];
  private productsSubscription!: Subscription;
  private ordersSubscription!: Subscription;
  private usersSubscription!: Subscription;
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.orderId = '';
    this.order = {
      OrderId: 0,
      OrderDate: '',
      UserId: '',
      Products: [],
      PaymentType: '',
    };
    this.products = [];
    this.users = [];
    this.userID = 0;
    this.userData = [];
    this.productData = [];
  }

  ngOnInit(): void {
    // get the order id from params
    const orderIdParam = this.route.snapshot.paramMap.get('orderid');
    if (orderIdParam !== null) {
      this.orderId = orderIdParam;
    } else {
      throw new Error('orderId = null');
    }

    //get order object from json file using orderId parameter
    this.order = this.ordersSubscription = this.orderService.findOrderById(
      Number(this.orderId)
    );
    console.log(this.order);

    this.productsSubscription = this.productService
      .getProductsData()
      .subscribe((data: any) => {
        this.products = data;
        this.getProduct(this.order.Products[0].ProductId);
      });

    this.usersSubscription = this.userService
      .getUsersData()
      .subscribe((data: any) => {
        this.users = data;
        console.log(this.order.UserId);
        this.findUserById(this.order.UserId);
      });
  }

  //this function return product name
  getProduct(productId: number): string {
    const product = this.findProductById(productId);
    console.log(product);
    return product;
  }
  //this function compare products by id and return matched ones
  private findProductById(productId: number): any {
    this.productData = this.products.filter(
      (product) => product.ProductId === productId
    );
    return this.productData;
  }

  //this function compare users by id and return matched ones
  private findUserById(userId: string | any): any {
    this.userData = this.users.filter((user) => user.Id == userId);
    return this.userData;
  }

  // unsubscribe from observable
  ngOnDestroy(): void {
    // this.ordersSubscription.unsubscribe();
    // this.productsSubscription.unsubscribe();
    // this.usersSubscription.unsubscribe();
  }
}
