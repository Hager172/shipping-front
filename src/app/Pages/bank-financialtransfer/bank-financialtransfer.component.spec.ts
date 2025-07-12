import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFinancialtransferComponent } from './bank-financialtransfer.component';

describe('BankFinancialtransferComponent', () => {
  let component: BankFinancialtransferComponent;
  let fixture: ComponentFixture<BankFinancialtransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankFinancialtransferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankFinancialtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
