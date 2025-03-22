import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Ibrand } from '../../interfaces/brand/brand';

@Component({
  selector: 'app-brand-card',
  imports: [UpperCasePipe],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.scss'
})
export class BrandCardComponent {
  // Required brand input.
  @Input({required:true}) brand!:Ibrand;

  // Output modal , bId emitter.
  @Output() modal:EventEmitter<boolean> = new EventEmitter();
  @Output() brandImg:EventEmitter<string> = new EventEmitter();
  
  openModal(){
    this.modal.emit(true);
    this.brandImg.emit(this.brand.image);
  }
}
