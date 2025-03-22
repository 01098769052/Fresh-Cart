import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishProductComponent } from './wish-product.component';

describe('WishProductComponent', () => {
  let component: WishProductComponent;
  let fixture: ComponentFixture<WishProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
