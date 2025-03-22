import { Subscription } from 'rxjs';
import { CategoryService } from './../../../core/services/e-comme/category/category.service';
import { Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-subcategories',
  imports: [TitleCasePipe],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent implements OnChanges,OnDestroy{
  // Inject CategoryService
  categoryService:CategoryService = inject(CategoryService);

  // Input categoryId come from parent component (categories)
  @Input() categoryId!:string;

  subCategories!:string[];
  getSubCategoriesSubscription!:Subscription;

  getSubCategories(){
    this.getSubCategoriesSubscription = this.categoryService.getSubCategoriesOfCategory(this.categoryId).subscribe({
      next:(res)=>{
        this.subCategories = res;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getSubCategories();
  }

  ngOnDestroy(): void {
    // unsubscribe getSubCategoriesSubscription.
    this.getSubCategoriesSubscription.unsubscribe();
  }
}
