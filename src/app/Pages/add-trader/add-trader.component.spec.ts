import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTraderComponent } from './add-trader.component';

describe('AddTraderComponent', () => {
  let component: AddTraderComponent;
  let fixture: ComponentFixture<AddTraderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTraderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
