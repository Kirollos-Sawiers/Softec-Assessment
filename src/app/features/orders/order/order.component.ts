import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
constructor(private orderService: OrderService){
  
  
}
  ngOnInit(): void {
    this.orderService.sayHello()
  }
}
