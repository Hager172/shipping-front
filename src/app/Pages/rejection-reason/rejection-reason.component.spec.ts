import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionReasonComponent } from './rejection-reason.component';

describe('RejectionReasonComponent', () => {
  let component: RejectionReasonComponent;
  let fixture: ComponentFixture<RejectionReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectionReasonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectionReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
