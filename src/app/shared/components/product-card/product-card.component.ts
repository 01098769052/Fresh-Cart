import { AuthService } from './../../../core/services/auth/auth.service';
import { WishListService } from './../../../core/services/e-comme/wishList/wish-list.service';
import { Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import { Iproduct } from '../../interfaces/product/product';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/e-comme/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CurrencyPipe, LowerCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink,LowerCasePipe,TitleCasePipe,CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent  implements OnInit,OnDestroy{
    // Inject cartService , wishListService , authService , Router , toastrService.
    cartService:CartService=inject(CartService);
    wishListService:WishListService=inject(WishListService);
    authService:AuthService=inject(AuthService);
    router:Router=inject(Router);
    toastrService :ToastrService =inject(ToastrService);
    
    // required input of each product.
    @Input({required:true}) product!:Iproduct;
    // input of wishList.
    @Input() wishList!:Iproduct[];
    
    imgCover!:string;
    heartwishFlag:boolean = false;
    updateToWishProductLoading:boolean = false;
    addToCartLoading:boolean=false;
    subscription:Subscription = new Subscription();
  
    //methode to check if the product at wish list or not (Fired at onInit hook).
    checkWishList(){
      if(this.authService.checkAuthorizedUser()){
        this.wishList.forEach(element => {
          if(element._id===this.product._id){
            this.heartwishFlag = true;
          }
        });
      }
    }
  
    // methode for change image cover
    changeImageCover(imgCover:string){
      this.imgCover = imgCover
    }
  
    // Add to cart
    addToCart(pId:string){
      if(this.authService.checkAuthorizedUser()){
        this.addToCartLoading=true;
        const addToCartSub = this.cartService.addToUserCart(pId).subscribe({
          next:(res)=>{
            if(res.status==='success'){
              this.toastrService.success(`${this.product.title} added successfully to your cart`,'Cart Operations');
              this.addToCartLoading=false;
              if(this.heartwishFlag){
                this.removeFromWishList(pId);
              };
              this.cartService.userCartCount.next(res.numOfCartItems);
            }
          },
          error:()=>{
            this.toastrService.error('There is a problem , try again','Cart Operations');
            this.addToCartLoading=false;
          }
        });
        this.subscription.add(addToCartSub);
      }
      else{
        this.router.navigate(['/logIn']);
        this.toastrService.error('You are not authorized , please LogIn','Authentication');
      }
    };
  
    // Add to wishlist
    addToWishList(pId:string){
      if(this.authService.checkAuthorizedUser()){
        this.updateToWishProductLoading = true;
        const addToWishListSub = this.wishListService.addToUserWishList(pId).subscribe({
          next:(res)=>{
            if(res.status==='success'){
              this.updateToWishProductLoading = false;
              this.heartwishFlag = true;
              this.toastrService.success(`${this.product.title} is added to your wish list`,'Cart Operations');
            }
          },
          error:(err)=>{
            this.updateToWishProductLoading = false;
            this.toastrService.error(`There is a problem , try again`,'Cart Operations');
          }
        });
        this.subscription.add(addToWishListSub);
      }
      else{
        this.router.navigate(['/logIn']);
        this.toastrService.error('You are not authorized , please LogIn','Authentication');
      } 
    }
  
    // Remove from wishList method.
    removeFromWishList(pId:string){
      if(this.authService.checkAuthorizedUser()){
        this.updateToWishProductLoading = true;
        const removeWishListSub = this.wishListService.removeFromUserWishList(pId).subscribe({
          next:(res)=>{
            if(res.status==='success'){
              this.updateToWishProductLoading = false;
              this.heartwishFlag = false;
              this.toastrService.success(`${this.product.title} is removed from your wish list`,'Cart Operations');
            }
          },
          error:(err)=>{
            this.updateToWishProductLoading = false;
            this.toastrService.error(`There is a problem , try again`,'Cart Operations');
          }
        });
        this.subscription.add(removeWishListSub); 
      } 
      else{
        this.router.navigate(['/logIn']);
        this.toastrService.error('You are not authorized , please LogIn','Authentication');
      }
    }  
  
    ngOnInit(): void {
      this.checkWishList(); 
      this.imgCover = this.product.imageCover;
    }
  
    ngOnDestroy(): void {
      // unsubcribe subscription
      this.subscription.unsubscribe();
    }
}