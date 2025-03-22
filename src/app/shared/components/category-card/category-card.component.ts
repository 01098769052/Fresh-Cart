import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Icategory } from '../../interfaces/category/category';

@Component({
  selector: 'app-category-card',
  imports: [TitleCasePipe],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  // Required category input property.
  @Input({required:true}) category!:Icategory;

  // Output boolean deferFlag and specific id category.
  @Output() deferFlag:EventEmitter<boolean> = new EventEmitter();
  @Output() categoryId:EventEmitter<string> = new EventEmitter();

  loadSubCtegories(){
    this.categoryId.emit(this.category._id);
    this.deferFlag.emit(true);
  }
}
