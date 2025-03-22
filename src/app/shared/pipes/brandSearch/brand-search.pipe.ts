import { Pipe, PipeTransform } from '@angular/core';
import { Ibrand } from '../../interfaces/brand/brand';

@Pipe({
  name: 'brandSearch'
})
export class BrandSearchPipe implements PipeTransform {
  // pipe for search (filter) based search word.
  transform(brands:Ibrand[],search:string):Ibrand[]{
    if(!brands){
      return [];
    }
    return brands.filter(brand=>brand.name.toLowerCase().includes(search.toLowerCase()));;
  }
}
