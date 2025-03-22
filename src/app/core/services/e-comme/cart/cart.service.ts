import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { env } from '../../../../shared/environment/env';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Inject HttpClient service.
  private httpClient:HttpClient=inject(HttpClient);

  userCartCount:BehaviorSubject<number> = new BehaviorSubject(0);

  // Add to user cart api
  addToUserCart(pId:string):Observable<any>{
    return this.httpClient.post(`${env.baseUrl}/api/v1/cart`,{productId:pId});
  }

  // Update to user cart api
  updateToUserCart(pId:string,pCount:number):Observable<any>{
    return this.httpClient.put(`${env.baseUrl}/api/v1/cart/${pId}`,{count:pCount});
  }
  
  // get user cart api
  getUserCart():Observable<any>{
    return this.httpClient.get(`${env.baseUrl}/api/v1/cart`);
  }

  // Get CartCount
  getUserCartCount():Observable<any>{
    return this.httpClient.get<any>(`${env.baseUrl}/api/v1/cart`).pipe(
      map(
        cart=> cart.numOfCartItems
      )
    )
  }

  // Remove item from user cart api.
  removeItemUserCart(pId:string):Observable<any>{
    return this.httpClient.delete(`${env.baseUrl}/api/v1/cart/${pId}`);
  }

  // Clear user cart api.
  clearUserCart():Observable<any>{
    return this.httpClient.delete(`${env.baseUrl}/api/v1/cart`);
  }
}
