import {Subscription } from 'rxjs';
import { ProductsService } from './../../../core/services/e-comme/products/products.service';
import { Component,inject, OnDestroy, OnInit } from '@angular/core';
import { Iproduct } from '../../../shared/interfaces/product/product';
import { WishListService } from '../../../core/services/e-comme/wishList/wish-list.service';
import { FormsModule } from '@angular/forms';
import { ProductSearchPipe } from '../../../shared/pipes/productSearch/product-search.pipe';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent,FormsModule,ProductSearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy{
  //Inject productsService , WishListService , AuthService.
  productsService:ProductsService = inject(ProductsService);
  wishListService:WishListService=inject(WishListService);
  authService:AuthService = inject(AuthService);

  search:string='';
  products!:Iproduct[];
  wishList!:Iproduct[];
  subscription:Subscription = new Subscription();

  // get all products.
  getProducts(){
    const getProductsSub =this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products=res.data;
      }
    });
    this.subscription.add(getProductsSub);
  }

  // get wishList
  getWishList(){
    if(this.authService.checkAuthorizedUser()){
      const wishListSub = this.wishListService.getUserWishList().subscribe({
        next:(res)=>{
          if(res.status==='success'){
            this.wishList = res.data;
          }
        }
      });
      this.subscription.add(wishListSub)
    }
  }

  ngOnInit(): void {
    this.getProducts();
    this.getWishList();
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}
