import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGovernorateComponent } from './edit-governorate.component';

describe('EditGovernorateComponent', () => {
  let component: EditGovernorateComponent;
  let fixture: ComponentFixture<EditGovernorateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGovernorateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGovernorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
