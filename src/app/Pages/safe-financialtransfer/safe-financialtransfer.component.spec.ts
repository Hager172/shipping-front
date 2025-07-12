import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeFinancialtransferComponent } from './safe-financialtransfer.component';

describe('SafeFinancialtransferComponent', () => {
  let component: SafeFinancialtransferComponent;
  let fixture: ComponentFixture<SafeFinancialtransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeFinancialtransferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafeFinancialtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
