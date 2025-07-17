import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableWithoutActionComponent } from './custom-table-without-action.component';

describe('CustomTableWithouActionComponent', () => {
  let component: CustomTableWithoutActionComponent;
  let fixture: ComponentFixture<CustomTableWithoutActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTableWithoutActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTableWithoutActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
