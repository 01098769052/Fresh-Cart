import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../../interfaces/product/product';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {
  // pipe for search (filter) based search word. 
  transform(products:Iproduct[],search:string):Iproduct[]{
    if(!products){
      return [];
    }
    return products.filter(product=>product.title.toLowerCase().includes(search.toLowerCase()));
  }
}
