import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderdashboardComponent } from './traderdashboard.component';

describe('TraderdashboardComponent', () => {
  let component: TraderdashboardComponent;
  let fixture: ComponentFixture<TraderdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraderdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraderdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
