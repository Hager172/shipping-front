import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTraderComponent } from './edit-trader.component';

describe('EditTraderComponent', () => {
  let component: EditTraderComponent;
  let fixture: ComponentFixture<EditTraderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTraderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
