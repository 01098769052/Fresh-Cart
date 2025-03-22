import { Subscription } from 'rxjs';
import { AuthService } from './../../../core/services/auth/auth.service';
import { OrderService } from './../../../core/services/e-comme/order/order.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Iorder } from '../../../shared/interfaces/order/order';
import { OrderCartComponent } from "../../../shared/components/order-cart/order-cart.component";

@Component({
  selector: 'app-all-orders',
  imports: [OrderCartComponent],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit,OnDestroy{
  //Inject AuthService,OrderService
  authService:AuthService = inject(AuthService);
  orderService:OrderService = inject(OrderService);

  private userId!:string;
  userName!:string;
  allOrders!:Iorder[];
  subscription:Subscription = new Subscription();

  // Get user information
  getUserInformation(){
    this.userId = this.authService.userData.value.id;
    this.userName = this.authService.userData.value.name;
  }
  
  // Get user orders.
  getOrders(){
    const getOrderSub = this.orderService.getUserOrders(this.userId).subscribe({
      next:(res)=>{
        this.allOrders = res;
      }
    });
    this.subscription.add(getOrderSub);
  }

  ngOnInit(): void {
    this.getUserInformation();
    this.getOrders();
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}
