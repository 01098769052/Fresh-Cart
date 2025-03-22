import { BrandsService } from './../../../core/services/e-comme/brands/brands.service';
import { Component,inject, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BrandCardComponent } from '../../../shared/components/brand-card/brand-card.component';
import { Ibrand } from '../../../shared/interfaces/brand/brand';
import { BrandSearchPipe } from '../../../shared/pipes/brandSearch/brand-search.pipe';
@Component({
  selector: 'app-brands',
  imports: [BrandCardComponent,FormsModule,BrandSearchPipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy{
  // Inject BrandsService
  brandsService:BrandsService = inject(BrandsService);
  
  search:string = '';
  brandImg!:string; // brand image come from child component.
  modal:boolean = false; // Modal Flag (default false);
  brands!:Ibrand[];
  subscription:Subscription = new Subscription();

  //Get All Brands
  getBrands(){
    const getBrandsSub = this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brands = res;
      }
    });
    this.subscription.add(getBrandsSub);
  }

  // close modal.
  closeModal(){
    this.modal = false;
    this.brandImg = "";
  }

  ngOnInit(): void {
    this.getBrands();
  }

  ngOnDestroy(): void {
    // unsubscribe subscription
    this.subscription.unsubscribe();
  }
}