import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraVillagePriceComponent } from './extra-village-price.component';

describe('ExtraVillagePriceComponent', () => {
  let component: ExtraVillagePriceComponent;
  let fixture: ComponentFixture<ExtraVillagePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraVillagePriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraVillagePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
