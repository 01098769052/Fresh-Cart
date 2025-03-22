import { CartService } from './../../../core/services/e-comme/cart/cart.service';
import { WishListService } from './../../../core/services/e-comme/wishList/wish-list.service';
import { Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { Iproduct } from '../../interfaces/product/product';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-wish-product',
  imports: [TitleCasePipe,CurrencyPipe],
  templateUrl: './wish-product.component.html',
  styleUrl: './wish-product.component.scss'
})
export class WishProductComponent implements OnDestroy{
  // Inject WishListService, CartService and ToastrService.
  wishListService:WishListService = inject(WishListService);
  cartService:CartService = inject(CartService);
  toastrService:ToastrService = inject(ToastrService);

  // Required wishProduct input coming from wishList component.
  @Input({required:true}) wishProduct!:Iproduct;
  @Input({required:true}) wishProductIndex!:number;

  // Output boolean data to parent component to DoCheck about any cartProduct change (Item Emitter)
  @Output() removeWishProductIndex:EventEmitter<number>=new EventEmitter();
  @Output() removeWishProductEmitter:EventEmitter<boolean>=new EventEmitter();

  addToCartLoading:boolean=false;
  removeWishProductLoading:boolean = false;
  subscription:Subscription = new Subscription();

  // Remove from wishList method.
  removeFromWishList(pId:string){
    this.removeWishProductLoading = true;
    const removeWishListSub = this.wishListService.removeFromUserWishList(pId).subscribe({
      next:(res)=>{
        if(res.status==='success'){
          this.removeWishProductIndex.emit(this.wishProductIndex);
          this.removeWishProductEmitter.emit(true);
          this.removeWishProductLoading = false;
          this.toastrService.success(`${this.wishProduct.title} is removed from your wish list`,'Cart Operations');
        }
      },
      error:(err)=>{
        this.removeWishProductLoading = false;
        this.toastrService.error(`There is a problem , try again`,'Cart Operations');
      }
    });
    this.subscription.add(removeWishListSub);
  }
  // Add to cart method
  addToCart(pId:string){
    this.addToCartLoading = true;
    const addTocartSub = this.cartService.addToUserCart(pId).subscribe({
      next:(res)=>{
        if(res.status==='success'){
          this.addToCartLoading = false;
          this.toastrService.success(`${this.wishProduct.title} added successfully to your cart`,'Cart Operations');
          this.cartService.userCartCount.next(res.numOfCartItems);
          this.removeFromWishList(pId);
        }
      },
      error:(err)=>{
        this.addToCartLoading = false;
        this.toastrService.error(`There is a problem , try again`,'Cart Operations');
      }
    });
    this.subscription.add(addTocartSub)
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}
