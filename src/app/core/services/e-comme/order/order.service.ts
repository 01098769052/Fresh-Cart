import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '../../../../shared/environment/env';
import { Observable } from 'rxjs';
import { IshippingAddress } from '../../../../shared/interfaces/ShippingAddress/shipping-address';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //  Inject HttpClient.
  private readonly httpClient:HttpClient = inject(HttpClient);
  // Pay Online function.
  onlineCheckOut(cId:string,checkOutInformation:IshippingAddress):Observable<any>{
    return this.httpClient.post(`${env.baseUrl}/api/v1/orders/checkout-session/${cId}?url=${env.hosting}`,{shippingAddress:checkOutInformation});
  }
  // Cash Order function.
  cashCheckOut(cId:string,checkOutInformation:IshippingAddress):Observable<any>{
    return this.httpClient.post(`${env.baseUrl}/api/v1/orders/${cId}`,{shippingAddress:checkOutInformation});
  }
  // Get User orders
  getUserOrders(userId:string):Observable<any>{
    return this.httpClient.get(`${env.baseUrl}/api/v1/orders/user/${userId}`);
  }
}
