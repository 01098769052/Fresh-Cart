import { CategoryService } from './../../../core/services/e-comme/category/category.service';
import { Component,inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryCardComponent } from '../../../shared/components/category-card/category-card.component';
import { SubcategoriesComponent } from "../../../shared/components/subcategories/subcategories.component";
import { FormsModule } from '@angular/forms';
import { CategorySearchPipe } from '../../../shared/pipes/categorySearch/category-search.pipe';
import { Icategory } from '../../../shared/interfaces/category/category';
@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent, SubcategoriesComponent,FormsModule,CategorySearchPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy{
  // Inject CategoryService.
  categoryService:CategoryService = inject(CategoryService);

  search:string='';
  deferFlag:boolean = false; // this value is default false but will change to true , coming from child (category card) component. 
  categoryId!:string // come form child (category card) component.
  categories!:Icategory[];
  subscription:Subscription = new Subscription();
  
  //Get All categories
  getcategories(){
    const categoriesSub = this.categoryService.getAllCategories().subscribe({
        next:(res)=>{
          this.categories = res;
        }
    });
    this.subscription.add(categoriesSub)
  }

  ngOnInit(): void {
    this.getcategories();
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}
