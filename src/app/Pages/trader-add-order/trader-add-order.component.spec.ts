import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderAddOrderComponent } from './trader-add-order.component';

describe('TraderAddOrderComponent', () => {
  let component: TraderAddOrderComponent;
  let fixture: ComponentFixture<TraderAddOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraderAddOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraderAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
