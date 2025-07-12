import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableWithouActionComponent } from './custom-table-without-action.component';

describe('CustomTableWithouActionComponent', () => {
  let component: CustomTableWithouActionComponent;
  let fixture: ComponentFixture<CustomTableWithouActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTableWithouActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTableWithouActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
