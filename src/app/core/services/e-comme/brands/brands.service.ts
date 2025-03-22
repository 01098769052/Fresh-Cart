import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { env } from '../../../../shared/environment/env';
import { Ibrand } from '../../../../shared/interfaces/brand/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  // Inject HttpClient service.
  httpClient:HttpClient = inject(HttpClient);

  // observable variable store the last share reply of getAllBrands response.
  $shareReply:Observable<any>|null=null;
  
  // Get all brands.
  getAllBrands():Observable<any>{
    if(!this.$shareReply){
      this.$shareReply = this.httpClient.get<any>(`${env.baseUrl}/api/v1/brands?limit=54`).pipe(
        map(res=>res.data.map((Brand:any)=>{let brand:Ibrand = {name:Brand.name,image:Brand.image};return brand;}))
      ).pipe(shareReplay(1)); 
    }
    return this.$shareReply;
  }
}
