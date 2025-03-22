import { Component, EventEmitter, inject, Input, OnDestroy, Output} from '@angular/core';
import { ICartProduct } from '../../interfaces/cartProduct/cart-product';
import { CartService } from '../../../core/services/e-comme/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-cart-product',
  imports: [TitleCasePipe,CurrencyPipe],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.scss'
})
export class CartProductComponent implements OnDestroy{
  // Inject CartService , ToastrService and Router.
  cartService:CartService = inject(CartService);
  toastrService:ToastrService = inject(ToastrService);

  // Required cartProduct input coming from cart component.
  @Input({required:true}) cartProduct!:ICartProduct;

  // emmit the updated data to the parent cart component. 
  @Output()updateCartProduct:EventEmitter<ICartProduct[]> = new EventEmitter();
  @Output()newNumOfCartItems:EventEmitter<number> = new EventEmitter();
  @Output()newTotalCartPrice:EventEmitter<number> = new EventEmitter();

  removeItemLoading:boolean = false;
  updateItemLoading:boolean = false;
  subscription:Subscription = new Subscription();

  // Update cart method fired after success response on (removeItem or updateItemCount) by send result to parent component (cart)
  updateCart(updateCartProduct:ICartProduct[],newNumOfCartItems:number,newTotalCartPrice:number){
    this.updateCartProduct.emit(updateCartProduct);
    this.newNumOfCartItems.emit(newNumOfCartItems);
    this.newTotalCartPrice.emit(newTotalCartPrice);
  }

  // Remove specific item.
  removeItem(pId:string){
    this.removeItemLoading =true;
    const removeItemSub = this.cartService.removeItemUserCart(pId).subscribe({
      next:(res)=>{
        if(res.status==='success'){
          this.updateCart(res.data.products,res.numOfCartItems,res.data.totalCartPrice);
          this.removeItemLoading =false;
          this.cartService.userCartCount.next(res.numOfCartItems);
          if(res.data.products.length===0){
            this.toastrService.success('All cart is clear','Cart Operations');
          }
          else{
            this.toastrService.success(`${this.cartProduct.product.title} is removed`,'Cart Operations');
          }
        }
      },
      error:(err)=>{
        this.removeItemLoading =false;
        this.toastrService.error(`There is a problem , try again !`,'Cart Operations');
      }
    });
    this.subscription.add(removeItemSub);
  }

  // update Product Count.
  updateItemCount(pId:string,pCount:number){
    this.updateItemLoading = true;
    const updateItemSub = this.cartService.updateToUserCart(pId,pCount).subscribe({
      next:(res)=>{
        this.updateItemLoading = false;
        this.cartService.userCartCount.next(res.numOfCartItems);
        if(res.status==='success'){
          this.updateCart(res.data.products,res.numOfCartItems,res.data.totalCartPrice);
            if(res.data.products.length===0){
              this.toastrService.success('All cart is clear','Cart Operations');
            }
            else if(pCount===0){
              this.toastrService.success(`${this.cartProduct.product.title} is removed`,`Cart Operations`);
            }
            else{
              this.toastrService.success(`${this.cartProduct.product.title} is updated to ${pCount} count`,`Cart Operations`);
            }
        }
      },
      error:(err)=>{
        this.updateItemLoading = false;
        this.toastrService.error(`There is a problem , try again !`,'Cart Operations');
      }
    });
    this.subscription.add(updateItemSub);
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}