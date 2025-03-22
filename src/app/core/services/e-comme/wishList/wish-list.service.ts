import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../../shared/environment/env';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  // Inject HttpClient service.
  httpClient:HttpClient = inject(HttpClient);

  // Add to user wishList.
  addToUserWishList(pId:string):Observable<any>{
    return this.httpClient.post(`${env.baseUrl}/api/v1/wishlist`,{productId:pId});
  }
  // Get user wishList.
  getUserWishList():Observable<any>{
    return this.httpClient.get(`${env.baseUrl}/api/v1/wishlist`);
  }
  // Remove from user wishList
  removeFromUserWishList(pId:string):Observable<any>{
    return this.httpClient.delete(`${env.baseUrl}/api/v1/wishlist/${pId}`);
  }
}
