import { AuthService } from './../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Iproduct } from '../../../shared/interfaces/product/product';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Ibrand } from '../../../shared/interfaces/brand/brand';
import { FormsModule } from '@angular/forms';
import { ProductSearchPipe } from '../../../shared/pipes/productSearch/product-search.pipe';
import { Icategory } from '../../../shared/interfaces/category/category';
import { ForkJoinApiService } from '../../../core/services/e-comme/forkJoinApi/fork-join-api.service';
import { WishListService } from '../../../core/services/e-comme/wishList/wish-list.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
@Component({
  selector: 'app-home',
  imports: [ProductCardComponent,CarouselModule,FormsModule,ProductSearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy{
  // Inject ForkJoinApiService(service call 3 forkJoin api end points (products,brands,categories), wishListService , AuthService , ToastrService  and Router.
  forkJoinApiService:ForkJoinApiService = inject(ForkJoinApiService);
  wishListService:WishListService = inject(WishListService);
  authService:AuthService = inject(AuthService);
  toastrService:ToastrService = inject(ToastrService);
  router:Router = inject(Router);

  // Properties for owl carousel.
  customOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
  }
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    autoHeight:true
  }

  search:string='';
  products!:Iproduct[];
  brands!:Ibrand[];
  categories!:Icategory[];
  wishList!:Iproduct[];
  subscription:Subscription = new Subscription();

  // Get All Home Data by using forkJoin and shareReply observable operations on (products , brands , categories).
  getHomePageAllData(){
    const homeSub = this.forkJoinApiService.homeForkJoinApi().subscribe({
      next:res=>{
        this.products = res.products.data;
        this.brands = res.brands;
        this.categories = res.categories;
      }
    });
    this.subscription.add(homeSub);
  }

  // Special api method for getWishList not with forkJoinApiService because forkJoinApiService is sharedReply unLike getWishList.
  getWishList(){
    if(this.authService.checkAuthorizedUser()){
      const WishListSub = this.wishListService.getUserWishList().subscribe({
      next:res=>this.wishList=res.data,
     });
      this.subscription.add(WishListSub)
    }
  }

  ngOnInit(): void {
    this.getHomePageAllData();
    this.getWishList();
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}