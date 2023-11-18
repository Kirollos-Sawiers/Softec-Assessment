import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent {
  isMenuOpen: boolean = false;
constructor(private router: Router){

}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  routingToAllOrders(){
    this.router.navigate(["/orders"], )
  }
  routingToAllProducts(){
    this.router.navigate(["/products"], )
  }

}
