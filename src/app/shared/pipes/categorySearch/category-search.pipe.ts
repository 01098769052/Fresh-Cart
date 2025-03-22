import { Pipe, PipeTransform } from '@angular/core';
import { Icategory } from '../../interfaces/category/category';

@Pipe({
  name: 'categorySearch'
})
export class CategorySearchPipe implements PipeTransform {
  // pipe for search (filter) based search word.
  transform(categories:Icategory[],search:string):Icategory[]{
    if(!categories){
      return [];
    }
    return categories.filter(category=>category.name.toLowerCase().includes(search.toLowerCase()));
  }
}
