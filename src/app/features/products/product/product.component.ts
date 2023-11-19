import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Iproduct } from 'src/app/core/models/iproduct';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Iproduct[];
  private productsSubscription!: Subscription;

  constructor(private productService: ProductService) {
    this.products = [];
  }

  ngOnInit(): void {
    this.productsSubscription = this.productService
      .getProductsData()
      .subscribe((data: any) => {
        this.products = data;
        console.log(this.products);
      });
  }

  //this function checks if product availablity less than 10
  isLowStock(availablePieces: number): boolean {
    return availablePieces <= 10;
  }

  // unsubscribe from observable
  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
