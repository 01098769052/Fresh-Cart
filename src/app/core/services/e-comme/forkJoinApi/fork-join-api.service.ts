import { Ibrand } from './../../../../shared/interfaces/brand/brand';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, shareReplay } from 'rxjs';
import { env } from '../../../../shared/environment/env';
import { Icategory } from '../../../../shared/interfaces/category/category';

@Injectable({
  providedIn: 'root'
})
export class ForkJoinApiService {
  // Inject HttpClient service
  httpClient:HttpClient = inject(HttpClient);

  // observable variable store the last share reply of homeForkJoinApi response.
  $shareReply:Observable<any>|null=null;
  
  // apply forkJoin operation on set of get requests APIs (products , brands , categories) for home page
  homeForkJoinApi():Observable<any>{
    if(!this.$shareReply){
      this.$shareReply=forkJoin(
        {products:this.httpClient.get(`${env.baseUrl}/api/v1/products?limit=56`),
        categories:this.httpClient.get<any>(`${env.baseUrl}/api/v1/categories`).pipe(map(categories=>categories.data.map((category:any)=>{let mappedCategory:Icategory={_id:category._id,name:category.name,image:category.image};return mappedCategory}))),
        brands:this.httpClient.get<any>(`${env.baseUrl}/api/v1/brands?limit=54`).pipe(map(res=> res.data.map((brand:any)=>{let mappedBrand:Ibrand={name:brand.name,image:brand.image};return mappedBrand;})))}
      ).pipe(shareReplay(1))
    }
  return this.$shareReply}
}
