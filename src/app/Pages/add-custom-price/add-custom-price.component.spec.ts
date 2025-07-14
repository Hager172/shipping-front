import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomPriceComponent } from './add-custom-price.component';

describe('AddCustomPriceComponent', () => {
  let component: AddCustomPriceComponent;
  let fixture: ComponentFixture<AddCustomPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
