import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../../core/services/e-comme/cart/cart.service';
import { Component, inject,OnDestroy, OnInit} from '@angular/core';
import { CartProductComponent } from "../../../shared/components/cart-product/cart-product.component";
import { Subscription } from 'rxjs';
import { ICartProduct } from '../../../shared/interfaces/cartProduct/cart-product';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartProductComponent,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,OnDestroy{
  // Inject CartService , ToastrService and Router.
  cartService:CartService = inject(CartService);
  toastrService:ToastrService = inject(ToastrService);
  router:Router = inject(Router);

  totalCartPrice!:number;
  numOfCartItems!:number;
  cId!:string;
  clearLoading:boolean = false;
  cartProducts!:ICartProduct[];
  subscription:Subscription = new Subscription();

  // Get User Cart.
  getCart(){
    const CartSub = this.cartService.getUserCart().subscribe({
      next:(res)=>{
        this.totalCartPrice = res.data.totalCartPrice;
        this.cartProducts = res.data.products;
        this.numOfCartItems = res.numOfCartItems;
        this.cId = res.cartId;
      }
    });
    this.subscription.add(CartSub);
  }

  // Clear all cart.
  clearCart(){
    if(this.cartProducts.length!=0){
      this.clearLoading = true;
      const clearCartSub = this.cartService.clearUserCart().subscribe({
        next:(res)=>{
          if(res.message==="success"){
            this.cartProducts = [];
            this.numOfCartItems = 0;
            this.totalCartPrice = 0
            this.clearLoading = false;
            this.toastrService.success('All cart is clear','Cart Operations');
            this.cartService.userCartCount.next(0);
          }
        },
        error:()=>{   
          this.clearLoading = false; 
          this.toastrService.error('There is a problem , try again !','Cart Operations');
        }
      });
      this.subscription.add(clearCartSub);
    }
    else{
      this.toastrService.error('The cart is arledy cleared !');
    }
  }

  // Route to order page.
  routeToOrder(){
    if(this.cartProducts.length!=0){
      this.router.navigate(['/order',this.cId]);
    }
    else{
      this.toastrService.error('The cart is empty!');
    }
  }

  ngOnInit(): void {
    this.getCart();
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}
