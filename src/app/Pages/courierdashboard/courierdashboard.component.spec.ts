import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierdashboardComponent } from './courierdashboard.component';

describe('CourierdashboardComponent', () => {
  let component: CourierdashboardComponent;
  let fixture: ComponentFixture<CourierdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourierdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
