import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernListComponent } from './govern-list.component';

describe('GovernListComponent', () => {
  let component: GovernListComponent;
  let fixture: ComponentFixture<GovernListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovernListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
