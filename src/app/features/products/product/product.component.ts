import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/core/services/product.service';
import { Iproduct } from 'src/app/core/models/iproduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Iproduct[];
  constructor(private productService: ProductService) {
    this.products = [];
  }
  ngOnInit(): void {
    this.productService.getProductsData().subscribe((data: any) => {
      this.products = data;
      console.log(this.products);
    });
  }
  isLowStock(availablePieces: number): boolean {
    return availablePieces <= 10;
  }
}
