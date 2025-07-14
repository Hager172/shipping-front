import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReportPaymentComponent } from './order-report-payment.component';

describe('OrderReportPaymentComponent', () => {
  let component: OrderReportPaymentComponent;
  let fixture: ComponentFixture<OrderReportPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderReportPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReportPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
