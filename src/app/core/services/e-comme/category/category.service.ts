import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { env } from '../../../../shared/environment/env';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // Inject HttpClient srvice.
  httpClient:HttpClient = inject(HttpClient);

  // observable variable store the last share reply of getAllCategories response.
  $shareReply:Observable<any>|null=null;

  // Get all categories
  getAllCategories():Observable<any>{
    if(!this.$shareReply){
      this.$shareReply = this.httpClient.get<any>(`${env.baseUrl}/api/v1/categories`).pipe(map(categories=>categories.data.map((category:any) =>{let mappedCategory:any = {};mappedCategory._id = category._id;mappedCategory.name = category.name;mappedCategory.image = category.image;return mappedCategory;}))
    ).pipe(shareReplay(1));
    }
    return this.$shareReply;
  }
  // Get All subcategories of specific category.
  getSubCategoriesOfCategory(cId:string):Observable<any>{
    return this.httpClient.get<any>(`${env.baseUrl}/api/v1/categories/${cId}/subcategories`).pipe(map(subCategories=>subCategories.data.map((subCategory:any)=>{let name!:string ; name = subCategory.name; return name})));
  }
}
