import { WishListService } from './../../../core/services/e-comme/wishList/wish-list.service';
import { Component, DoCheck, inject, OnDestroy, OnInit } from '@angular/core';
import { WishProductComponent } from "../../../shared/components/wish-product/wish-product.component";
import { Subscription } from 'rxjs';
import { Iproduct } from '../../../shared/interfaces/product/product';

@Component({
  selector: 'app-wish-list',
  imports: [WishProductComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit,DoCheck,OnDestroy{
  // Inject WishListService.
  wishListService:WishListService = inject(WishListService);

  removeWishProductEmitter!:boolean;//come from child component
  removeWishProductIndex!:number; //come from child component
  wishListCount!:number;
  wishList!:Iproduct[];
  subscription:Subscription = new Subscription();

  //Get wishList
  getWishList(){
    const getWishListSub = this.wishListService.getUserWishList().subscribe({
      next:(res)=>{
        this.wishListCount = res.count;
        this.wishList = res.data;
      }
    });
    this.subscription.add(getWishListSub);
  }

  //Remove product from wishList (locally but the request method in child component).
  removeProductFromWishList(){
    if(this.removeWishProductEmitter===true){
      this.removeWishProductEmitter = false;// to stop looping at DoCheck hook. 
      this.wishList.splice(this.removeWishProductIndex,1)
      this.wishListCount--;
    }
  }

  ngOnInit(): void {
    this.getWishList();
  }

  ngDoCheck(): void {
    this.removeProductFromWishList();
  }

  ngOnDestroy(): void {
    // unsubscribe subscription.
    this.subscription.unsubscribe();
  }
}
