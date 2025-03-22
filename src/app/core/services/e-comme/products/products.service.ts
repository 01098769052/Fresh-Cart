import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { env } from '../../../../shared/environment/env';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // Inject HttpClient service.
  httpClient:HttpClient = inject(HttpClient);

  // observable variable store the last share reply of getAllProducts response.
  $shareReply:Observable<any>|null=null;

  // getAllProducts api request.
  getAllProducts():Observable<any>{
    if(!this.$shareReply){
      this.$shareReply = this.httpClient.get(`${env.baseUrl}/api/v1/products?limit=56`).pipe(shareReplay(1));
    }
    return this.$shareReply;
  }

  // getSpecificProduct api request
  getSpecificProduct(pId:string|null):Observable<any>{
    return this.httpClient.get(`${env.baseUrl}/api/v1/products/${pId}`);
  }
}
