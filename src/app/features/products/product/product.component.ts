import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/core/services/product.service';
import { Iproduct } from 'src/app/core/models/iproduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnChanges {
  products: Iproduct[];
  constructor(private productService: ProductService) {
    this.products = [];
    this.productService.getProductsData().subscribe((data: any) => {
      this.products = data;
      console.log(this.products);
    });
  }
  ngOnInit(): void {}
  ngOnChanges(): void {}
  isLowStock(availablePieces: number): boolean {
    return availablePieces <= 10;
  }
}
