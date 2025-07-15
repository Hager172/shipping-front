import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedorderComponent } from './rejectedorder.component';

describe('RejectedorderComponent', () => {
  let component: RejectedorderComponent;
  let fixture: ComponentFixture<RejectedorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
